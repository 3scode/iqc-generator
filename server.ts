import { file, serve } from 'bun'
import { join } from 'path'

const DIST = join(import.meta.dir, 'dist')
const PORT = parseInt(process.env.PORT || '8080')

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
}

async function serveStatic(url: string): Promise<Response> {
  let pathname = new URL(url, 'http://localhost').pathname

  // SPA fallback: return index.html for non-file routes
  if (!pathname.includes('.')) {
    pathname = '/index.html'
  }

  const filePath = join(DIST, pathname)
  const f = file(filePath)
  const exists = await f.exists()

  if (!exists) {
    // Fallback to index.html for SPA
    const fallback = file(join(DIST, 'index.html'))
    return new Response(fallback, {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const ext = pathname.substring(pathname.lastIndexOf('.'))
  return new Response(f, {
    headers: { 'Content-Type': MIME[ext] || 'application/octet-stream' },
  })
}

// ── Export API handler ───────────────────────────────────────────────────────
async function handleExport(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { state, origin, width = 440, height = 956, format = 'png', scale = 3 } = body

  if (!state || !origin) {
    return Response.json({ error: 'state and origin are required' }, { status: 400 })
  }

  const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
  const secretKey = process.env.SCREENSHOTONE_SECRET_KEY

  if (!accessKey || !secretKey) {
    return Response.json(
      { error: 'ScreenshotOne API keys not configured — set SCREENSHOTONE_ACCESS_KEY and SCREENSHOTONE_SECRET_KEY env vars' },
      { status: 500 }
    )
  }

  try {
    const encoded = Buffer.from(JSON.stringify(state)).toString('base64')
    const exportUrl = `${origin}/export#${encoded}`

    const { Client, TakeOptions } = await import('screenshotone-api-sdk')
    const client = new Client(accessKey, secretKey)

    const options = TakeOptions.url(exportUrl)
      .delay(2)
      .viewportWidth(width)
      .viewportHeight(height)
      .deviceScaleFactor(scale)
      .fullPage(false)
      .headers('ngrok-skip-browser-warning: true')

            const imageBlob = await client.take(options)
            const buffer = Buffer.from(await imageBlob.arrayBuffer())

            return new Response(buffer, {
      headers: {
        'Content-Type': `image/${format === 'jpeg' ? 'jpeg' : 'png'}`,
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ error: message }, { status: 500 })
  }
}

// ── Server ───────────────────────────────────────────────────────────
const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === '/api/export') {
      return handleExport(req)
    }

    return serveStatic(req.url)
  },
})

console.log(`🚀 IQC Generator running at http://localhost:${PORT}`)
