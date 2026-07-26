import { createHash } from 'crypto'

const API_BASE = 'https://api.screenshotone.com/take'

function sign(query: string, secret: string): string {
  return createHash('sha256').update(query + secret).digest('hex')
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { state, origin, width = 440, height = 956, format = 'png', scale = 3 } = req.body

  if (!state || !origin) {
    res.status(400).json({ error: 'state and origin are required' })
    return
  }

  const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
  const secretKey = process.env.SCREENSHOTONE_SECRET_KEY

  if (!accessKey || !secretKey) {
    res.status(500).json({ error: 'ScreenshotOne API keys are not configured' })
    return
  }

  try {
    const encoded = Buffer.from(JSON.stringify(state)).toString('base64')
    const exportUrl = `${origin}/export#${encoded}`

    const params = new URLSearchParams({
      access_key: accessKey,
      url: exportUrl,
      delay: '2',
      viewport_width: String(width),
      viewport_height: String(height),
      device_scale_factor: String(scale),
      full_page: 'false',
      headers: 'ngrok-skip-browser-warning: true',
    })

    const queryString = params.toString()
    const signature = sign(queryString, secretKey)

    const response = await fetch(`${API_BASE}?${queryString}&signature=${signature}`)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data?.error_message || `ScreenshotOne returned ${response.status}`)
    }

    const buffer = Buffer.from(await response.arrayBuffer())

    res.setHeader('Content-Type', `image/${format === 'jpeg' ? 'jpeg' : 'png'}`)
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600')
    res.status(200).send(buffer)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: message })
  }
}

export const config = {
  maxDuration: 120,
  memory: 1024,
}
