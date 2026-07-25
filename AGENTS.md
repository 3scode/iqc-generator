# IQC Generator — Project Context

## Project
**IQC (iPhone Quote Chat) Generator** — Web tool to create aesthetic iPhone-style quote chat images ready for social media posts.

## Current State
**All tasks complete.** Build passes, 29 tests pass, type-check clean.

## Tech Stack
- **Runtime:** Bun | **Frontend:** React 19 + TypeScript | **Bundler:** Vite 8
- **Styling:** Tailwind CSS 4 + neumorphic design system
- **State:** Zustand 5 | **Server-side render:** Playwright + @sparticuz/chromium
- **Icons:** Lucide
- **Routing:** React Router 7 | **Hosting:** Vercel
- **Testing:** Vitest + React Testing Library + Playwright (e2e dir empty)

## Architecture
- SPA with server-side image export via Playwright
- 4 routes: `/` Creator, `/templates`, `/about`, `/export` (headless render target)
- 2 Zustand stores: `formStore` (messages, quote, bg, layout) + `uiStore` (dark, modal, toast)
- 4 main components: QuoteCard (canvas), PhoneFrame → ChatBubble + StatusBar, FullPreviewModal

## Export Pipeline
- Frontend POSTs form state + origin to `/api/export`
- Server launches headless Chromium, navigates to `<origin>/export` with state injected via `page.addInitScript`
- React renders the real QuoteCard with all CSS (Tailwind v4, custom properties, fonts)
- Steps before screenshot: `document.fonts.ready` → Twemoji DOM replacement → 300ms settle
- Uses full mobile browser context (`isMobile`, `hasTouch`, `colorScheme: dark`, `deviceScaleFactor: 3`)
- Output: PNG or JPEG at 3x retina (1290×2796 for 440×956 logical)
- Dev: Vite plugin middleware; Production: Vercel serverless function (`api/export.ts`)

## Key Conventions
- `@/` path alias → `./src/*`
- CSS: Tailwind utility classes + neumorph shadow utilities in `index.css`
- Components under `src/components/{chat,quote,ui,layout}/`
- All UI uses CSS custom properties (`--color-*`)

## Design
- iOS 18 WhatsApp screenshot style (ultra-realistic)
- Dark background with blurred backdrop, WhatsApp green bubbles (#005C4B)
- Status bar shows carrier, signal bars (SVG), WiFi icon, battery, center time
- Background messages + ContextMenu + EmojiReactions for realism
- QuoteCard renders the full exportable image (phone frame on background)
- Background: solid/gradient/image, layout: 9:16 only (others mapped to same)

## Data
- Templates in `src/data/templates.ts` — static JSON with presets
- `formStore.applyTemplate()` populates all fields
- No backend, no localStorage (except dark mode pref - not yet wired)
- All state is in-memory, gone on page reload

## Testing (29 tests pass)
- `src/stores/__tests__/formStore.test.ts` — store actions
- `src/stores/__tests__/uiStore.test.ts` — UI state
- `src/utils/__tests__/validation.test.ts` — form validation
- `src/components/ui/__tests__/Button.test.tsx` — component
- e2e/ directory exists but is empty (no Playwright tests yet)

## CI/CD
- `.github/workflows/ci.yml` — lint → typecheck → test → build on push/PR
- Vercel auto-deploy from main, SPA rewrites configured in `vercel.json`

## Commands
- `bun run dev` — Vite dev server
- `bun run build` — tsc + vite build
- `bun run lint` — `tsc --noEmit` (needs `bunx tsc --noEmit` or `npx tsc --noEmit` since `tsc` isn't in PATH)
- `bun run test` — Vitest
- `bun run test:e2e` — Playwright (no tests yet)

## Branches
- `main` — primary dev + deploy branch
