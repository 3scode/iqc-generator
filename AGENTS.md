# IQC Generator — Konteks Proyek

## Proyek
**IQC (iPhone Quote Chat) Generator** — Alat web untuk membuat gambar quote chat iPhone-style yang estetis, siap untuk diunggah ke media sosial.

## Kondisi Saat Ini
**Semua tugas selesai.** Build berhasil, 29 tes lolos, type-check bersih.

## Tumpukan Teknologi
- **Runtime:** Bun | **Frontend:** React 19 + TypeScript | **Bundler:** Vite 8
- **Styling:** Tailwind CSS 4 + sistem desain neumorphic
- **State:** Zustand 5 | **Server-side render:** ScreenshotOne API
- **Icons:** Lucide
- **Routing:** React Router 7 | **Hosting:** Vercel
- **Testing:** Vitest + React Testing Library

## Arsitektur
- SPA dengan ekspor gambar server-side via ScreenshotOne API
- 4 rute: `/` Creator, `/templates`, `/about`, `/export` (target render headless)
- 2 Zustand store: `formStore` (messages, quote, bg, layout) + `uiStore` (dark, modal, toast)
- 4 komponen utama: QuoteCard (canvas), PhoneFrame → ChatBubble + StatusBar, FullPreviewModal

## Pipeline Ekspor
- Frontend POST state form + origin ke `/api/export`
- Server menggunakan ScreenshotOne API SDK dengan URL export + state terenkripsi base64 di URL hash fragment
- React merender QuoteCard dengan semua CSS (Tailwind v4, custom properties, fonts)
- State di-encode ke base64 lalu disisipkan sebagai hash fragment di URL export
- Output: PNG atau JPEG dengan cache per-request (in-memory, key = sha256 dari state + dimensi)
- Dev: Vite dev server; Production: Vercel serverless function (`api/export.ts`)

## Konvensi Utama
- `@/` path alias → `./src/*`
- CSS: Tailwind utility classes + neumorph shadow utilities di `index.css`
- Komponen di bawah `src/components/{chat,quote,ui,layout}/`
- Semua UI menggunakan CSS custom properties (`--color-*`)

## Desain
- iOS 18 WhatsApp screenshot style (ultra-realistis)
- Background gelap dengan backdrop blur, bubble hijau WhatsApp (#005C4B)
- Status bar menampilkan carrier, signal bars (SVG), WiFi icon, battery, waktu di tengah
- Background messages + ContextMenu + EmojiReactions untuk realisme
- QuoteCard merender gambar ekspor lengkap (frame phone di background)
- Background: solid/gradient/image, layout: 9:16 (others mapped to same)

## Data
- Templates di `src/data/templates.ts` — JSON statis dengan preset
- `formStore.applyTemplate()` mengisi semua field
- Tidak ada backend, tidak ada localStorage (kecuali pref dark mode)
- Semua state in-memory, hilang saat halaman di-reload

## Testing (29 tes lolos)
- `src/stores/__tests__/formStore.test.ts` — aksi store
- `src/stores/__tests__/uiStore.test.ts` — state UI
- `src/utils/__tests__/validation.test.ts` — validasi form
- `src/components/ui/__tests__/Button.test.tsx` — komponen
- Direktori e2e/ ada tapi kosong (belum ada tes Playwright)

## CI/CD
- `.github/workflows/ci.yml` — lint → typecheck → test → build di push/PR
- Vercel auto-deploy dari main, SPA rewrites dikonfigurasi di `vercel.json`
- Environment variables: `SCREENSHOTONE_ACCESS_KEY`, `SCREENSHOTONE_SECRET_KEY` di Vercel dashboard

## Perintah
- `bun run dev` — Vite dev server
- `bun run build` — tsc + vite build
- `bun run lint` — `tsc --noEmit`
- `bun run test` — Vitest
- `bun run serve` — Build + server lokal (bun run server.ts)

## Catatan Penting
- **Tidak pakai Playwright** untuk ekspor gambar — kini menggunakan ScreenshotOne API
- ScreenshotOne butuh API key (akses + secret) dari https://screenshotone.com
- State diekspor sebagai base64 di URL hash fragment agar ScreenshotOne bisa render halaman export secara eksternal
- Caching in-memory di `api/export.ts` untuk repeated request yang sama (key = sha256 dari state + dimensi)
