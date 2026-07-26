import { createHmac } from 'node:crypto'

const API_BASE = 'https://api.screenshotone.com/take'

function sign(query: string, secret: string): string {
  return createHmac('sha256', secret).update(query).digest('hex')
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
    res.status(500).json({ error: 'SCREENSHOTONE_ACCESS_KEY / SCREENSHOTONE_SECRET_KEY belum diset di Vercel dashboard' })
    return
  }

  try {
    const encoded = Buffer.from(JSON.stringify(state)).toString('base64')
    const exportUrl = `${origin}/export#${encoded}`

    const viewportWidth = width + 40
    const viewportHeight = height + 40

    const params = new URLSearchParams({
      access_key: accessKey,
      url: exportUrl,
      delay: '1',
      viewport_width: String(viewportWidth),
      viewport_height: String(viewportHeight),
      device_scale_factor: String(scale),
      full_page: 'false',
      wait_until: 'network_idle_0',
      block_cookie_banners: 'true',
      block_chats: 'true',
      block_ads: 'true',
    })

    const qs = params.toString()
    const sig = sign(qs, secretKey)
    const url = `${API_BASE}?${qs}&signature=${sig}`

    const resp = await fetch(url)

    if (!resp.ok) {
      let msg = `ScreenshotOne returned ${resp.status}`
      try { const d = await resp.json(); if (d.error_message) msg = d.error_message } catch {}
      res.status(502).json({ error: msg })
      return
    }

    const buf = Buffer.from(await resp.arrayBuffer())

    res.setHeader('Content-Type', `image/${format === 'jpeg' ? 'jpeg' : 'png'}`)
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600')
    res.status(200).send(buf)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: msg })
  }
}
