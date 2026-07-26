import * as screenshotone from 'screenshotone-api-sdk'

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
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

    const client = new screenshotone.Client(accessKey, secretKey)

    const options = screenshotone.TakeOptions.url(exportUrl)
      .delay(2)
      .viewportWidth(width)
      .viewportHeight(height)
      .deviceScaleFactor(scale)
      .fullPage(false)
      .headers('ngrok-skip-browser-warning: true')

    const imageBlob = await client.take(options)
    const buffer = Buffer.from(await imageBlob.arrayBuffer())

    res.setHeader('Content-Type', `image/${format === 'jpeg' ? 'jpeg' : 'png'}`)
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600')
    res.status(200).send(buffer)
  } catch (err: unknown) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const config = {
  maxDuration: 120,
  memory: 1024,
}