import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

function apiExportPlugin() {
  return {
    name: 'api-export',
    apply: 'serve' as const,
    configureServer(server: any) {
      server.middlewares.use('/api/export', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk: string) => (body += chunk))
        req.on('end', async () => {
          try {
            const { state, origin, width = 440, height = 956, format = 'png', scale = 3 } = JSON.parse(body)

            if (!state || !origin) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'state and origin are required' }))
              return
            }

            const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
            const secretKey = process.env.SCREENSHOTONE_SECRET_KEY
            if (!accessKey || !secretKey) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'ScreenshotOne API keys not configured' }))
              return
            }

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

            res.setHeader('Content-Type', `image/${format === 'jpeg' ? 'jpeg' : 'png'}`)
            res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600')
            res.statusCode = 200
            res.end(buffer)
          } catch (err: any) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  base: '/iqc/',
  plugins: [react(), tailwindcss(), apiExportPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: { allowedHosts: true },
  build: { target: 'es2020', outDir: 'dist/iqc' },
})
