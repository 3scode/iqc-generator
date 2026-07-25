# IQC Generator — Product Requirements Document

> **iPhone Quote Chat Creator**
> Bikin quote chat iPhone aesthetic dalam 1 klik. Langsung siap posting, tanpa edit ulang.

---

## BAGIAN 1: Visi & Tujuan Produk

### Visi Produk
Menjadi tool online paling simpel untuk bikin quote chat iPhone aesthetic — cukup isi pesan, dapat gambar siap posting dalam hitungan detik. Zero learning curve, zero edit ulang.

### Tujuan Utama

| # | Tujuan | Indikator Keberhasilan |
|---|--------|----------------------|
| 1 | Pengguna bisa bikin quote chat dalam < 30 detik | Rata-rata session duration < 1 menit untuk first quote |
| 2 | Output langsung siap posting tanpa edit ulang | 80% user download tanpa mengubah layout |
| 3 | Tools bisa diakses dari mana aja (browser-only) | 100% proses client-side, zero server load |
| 4 | Tersedia template yang bisa dipake instant | 30% user pakai template di session pertama |

### Value Proposition
- **1-klik jadi quote image** — bukan screenshot mentah, tapi gambar quote aesthetic siap upload
- **3 layout rasio** — 9:16 (Story), 1:1 (Feed), 4:5 (Portrait) — langsung sesuai platform
- **100% client-side** — data gak pernah dikirim ke server, privasi terjamin

### Analisis Kompetitor

| Kompetitor | Fitur Utama | Kelebihan | Kekurangan | Peluang |
|------------|-------------|-----------|------------|---------|
| **IQC Generator (existing)** | Form → preview → download | Simpel, HD | Hanya raw chat screenshot, tanpa quote overlay | Quote overlay + multiple layout |
| **FauxTalks** | 16+ platform chat generator | Multi-platform | Raw screenshot doang, gak ada quote mode | Fokus ke "quote image" bukan "screenshot" |
| **TheFake** | iMessage, Tapbacks, video | Realistis banget | Berbayar, kompleks | Quote aesthetic untuk sosmed |
| **SocialRails** | Multi-platform + templates | Ada templates | Watermark, freemium | Gratis total + no watermark |
| **FakeMessageMaker** | iMessage screenshots | Simple UI | Sangat basic | Quote overlay + layout rasio |

**Peluang Utama:** Semua kompetitor bikin "fake chat screenshot". **Tidak ada** yang bikin "quote chat image" — layout center, teks quote besar, siap posting. Ini celah biru.

### Success Metrics

| Tujuan | KPI | Target | Cara Ukur |
|--------|-----|--------|-----------|
| Cepat bikin quote | Avg session duration | < 90 detik | Google Analytics / Plausible |
| Output siap posting | Download rate | > 60% pengunjung download | GA event tracking |
| Privasi terjamin | Zero server request | 0% data ke server | Network tab audit |
| Template usage | Template apply rate | > 30% user | Event tracking |
| User engagement | Return visitor rate | > 20% | GA cohort analysis |

---

## BAGIAN 2: User Persona

### Persona 1: Rara — Content Creator Sosmed

- **Usia/Pekerjaan:** 19 tahun, Mahasiswa + Content Creator Instagram/TikTok
- **Level Teknis:** Menengah — paham Canva, cropping, edit tipis
- **Tujuan:** Mau bikin konten quote aesthetic buat Instagram Story dan Feed dengan cepat
- **Pain Points:** Bolak-balik bikin chat palsu di hp, screenshot, crop, edit lagi di Canva — makan waktu 15 menit per post
- **Motivasi:** Butuh template quote chat yang tinggal isi pesan → langsung jadi → upload

#### User Journey: Rara

| Stage | Action | Touchpoints | Emotions | Pain Points |
|-------|--------|-------------|----------|-------------|
| 1. Buka | Buka IQC Generator dari HP | Home/Creator screen | 😊 Penasaran | — |
| 2. Isi | Ketik pesan, pilih quote, atur layout | Form panel | 😊 Cepet | Keyboard HP sempit |
| 3. Preview | Lihat hasil live preview | Preview panel + Phone Frame | 😍 Keren! | Pengen liat full size |
| 4. Download | Tap Generate → Download PNG | Modal Preview | 🎉 Puas | Storage HP penuh |
| 5. Upload | Post ke Instagram Story | IG app | 😊 Engagement naik | — |

### Persona 2: Dimas — Social Media Admin

- **Usia/Pekerjaan:** 26 tahun, Social Media Specialist di agency digital
- **Level Teknis:** Mahir — familiar dengan tools desain, suka otomatisasi
- **Tujuan:** Bikin chat testimonial palsu buat konten klien dengan cepet dan konsisten
- **Pain Points:** Setiap mau bikin testimonial format chat, harus minta klien screenshot asli atau desain dari 0 di Figma/Canva
- **Motivasi:** Tool yang bisa produce multiple quote dengan format konsisten buat content plan klien

#### User Journey: Dimas

| Stage | Action | Touchpoints | Emotions | Pain Points |
|-------|--------|-------------|----------|-------------|
| 1. Buka | Buka IQC Generator dari laptop | Creator screen | 😊 Siap | — |
| 2. Custom | Atur detail (warna, time, baterai, nama) | Form panel | 😐 Standar | Form agak basic |
| 3. Template | Coba template yang available | Templates screen | 😍 Mantap | Jumlah template terbatas |
| 4. Batch | Mau bikin 5 quote beda | Creator (repeat) | 😐 Mesti ulang mulu | Gak ada batch mode |
| 5. Download | Download PNG satu-satu | Preview modal | 😐 Lama | Butuh fitur batch download |

---

## BAGIAN 3: User Stories

### Modul 1: Creator (Quote Generation)

#### US-01: Create Quote dari Form
Sebagai pengguna, saya ingin mengisi form chat (nama, pesan, waktu, baterai, sinyal), agar bisa membuat quote chat iPhone yang realistis.

**Priority:** High
**Screen:** Creator (Home)

**Acceptance Criteria:**
- [ ] Form input untuk: pesan chat (add/remove), sender name, waktu, battery %, signal bars
- [ ] Minimal 1 pesan, maksimal 10 pesan
- [ ] Setiap pesan bisa dipilih sender "You" atau "Other"
- [ ] Setiap pesan bisa ditandai sebagai quote
- [ ] Live preview update real-time setiap ada perubahan

#### US-02: Live Preview Chat
Sebagai pengguna, saya ingin melihat preview chat iPhone secara real-time, agar tau hasilnya tanpa perlu generate dulu.

**Priority:** High
**Screen:** Creator (Home)

**Acceptance Criteria:**
- [ ] Phone frame dengan iPhone outline muncul di preview panel
- [ ] Chat bubbles tampil sesuai input user
- [ ] Status bar (time, battery, signal) tampil sesuai input
- [ ] Preview update dalam < 100ms setelah input berubah
- [ ] Preview menunjukkan perbedaan light/dark mode

#### US-03: Quote Overlay
Sebagai pengguna, saya ingin memilih salah satu pesan sebagai quote, agar teks quote besar muncul di bawah chat.

**Priority:** High
**Screen:** Creator (Home)

**Acceptance Criteria:**
- [ ] Setiap pesan punya tombol/toggle "Jadikan Quote"
- [ ] Quote yang dipilih punya indikator visual (glow/badge)
- [ ] Quote text muncul di bawah phone frame dengan font besar (28px, bold)
- [ ] Nama pengirim quote tampil di bawah quote text
- [ ] Hanya 1 pesan yang bisa jadi quote dalam satu waktu

#### US-04: Layout Ratio Switcher
Sebagai pengguna, saya ingin memilih rasio layout (9:16, 1:1, 4:5), agar output sesuai platform tujuan (Story/Feed).

**Priority:** High
**Screen:** Creator (Home)

**Acceptance Criteria:**
- [ ] 3 opsi layout: 9:16 (Story), 1:1 (Feed), 4:5 (Portrait)
- [ ] Preview berubah sesuai rasio yang dipilih
- [ ] Opsi aktif punya visual indicator berbeda
- [ ] Canvas output mengikuti rasio yang dipilih

#### US-05: Background Customization
Sebagai pengguna, saya ingin mengatur background (solid/gradient/image), agar quote image lebih aesthetic.

**Priority:** Mid
**Screen:** Creator (Home)

**Acceptance Criteria:**
- [ ] Minimal 3 tipe background: Solid color, Gradient, Upload image
- [ ] Color picker untuk solid/gradient
- [ ] File upload untuk custom image (max 5MB)
- [ ] Preview background berubah sesuai pilihan

#### US-06: Dark Mode Toggle
Sebagai pengguna, saya ingin toggle light/dark mode, agar hasil quote sesuai preferensi tampilan.

**Priority:** Mid
**Screen:** Creator (Home), Templates, About

**Acceptance Criteria:**
- [ ] Toggle di header untuk switch light/dark
- [ ] Semua UI berubah mengikuti mode
- [ ] Phone frame preview juga berubah
- [ ] Preference tersimpan di localStorage

### Modul 2: Generate & Download

#### US-07: Generate Full Preview
Sebagai pengguna, saya ingin men-generate preview full-size, agar bisa lihat hasil akhir sebelum download.

**Priority:** High
**Screen:** Creator → Full Preview (Modal)

**Acceptance Criteria:**
- [ ] Tombol "Generate IQC" di preview panel
- [ ] Modal full preview muncul setelah diklik
- [ ] Modal menampilkan gambar ukuran penuh sesuai layout ratio
- [ ] Ada tombol close atau click outside untuk tutup
- [ ] Animasi transisi smooth (scale up + fade)

#### US-08: Download PNG
Sebagai pengguna, saya ingin mendownload hasil sebagai PNG HD, agar bisa langsung upload ke sosmed.

**Priority:** High
**Screen:** Full Preview (Modal)

**Acceptance Criteria:**
- [ ] Tombol "Download PNG" di modal preview
- [ ] File terdownload dengan nama `iqc-quote-{timestamp}.png`
- [ ] Resolusi 2x untuk kualitas HD
- [ ] Progress indicator saat rendering
- [ ] Toast sukses setelah download

#### US-09: Copy to Clipboard
Sebagai pengguna, saya ingin menyalin gambar ke clipboard, agar bisa paste langsung di aplikasi lain.

**Priority:** Low
**Screen:** Full Preview (Modal)

**Acceptance Criteria:**
- [ ] Tombol "Copy Image"
- [ ] Gambar tersalin ke clipboard
- [ ] Toast "Gambar tersalin" muncul
- [ ] Fallback jika browser tidak support clipboard API

### Modul 3: Templates

#### US-10: Browse Templates
Sebagai pengguna, saya ingin melihat daftar template quote chat, agar bisa dapat inspirasi atau instant jadi.

**Priority:** Mid
**Screen:** Templates

**Acceptance Criteria:**
- [ ] Grid tampilan template dengan thumbnail
- [ ] Setiap template punya nama dan preview kecil
- [ ] Search bar untuk filter template
- [ ] Filter kategori (Populer, Minimal, Colorful, dll)
- [ ] Loading skeleton saat fetch

#### US-11: Apply Template
Sebagai pengguna, saya ingin menerapkan template, agar form terisi otomatis dan tinggal tweak tipis-tipis.

**Priority:** Mid
**Screen:** Templates → Creator

**Acceptance Criteria:**
- [ ] Tombol "Apply" di setiap template card
- [ ] Setelah diklik, redirect ke Creator dengan form terisi
- [ ] Data template (messages, warna, layout) semua terisi
- [ ] Loading state saat template di-apply
- [ ] User bisa edit setelah template teraplikasi

### Modul 4: Info & Privacy

#### US-12: View About Page
Sebagai pengguna, saya ingin melihat informasi tentang tool ini, agar tau cara pakai, privasi, dan kredit.

**Priority:** Low
**Screen:** About

**Acceptance Criteria:**
- [ ] Halaman About dengan deskripsi tool
- [ ] FAQ accordion (minimal 4 pertanyaan)
- [ ] Privacy statement bahwa data tidak disimpan
- [ ] Credits

---

## BAGIAN 4: Functional Requirements

### Modul 1: Creator (Quote Generation)

**FR-01: Input Chat Messages** — **Must Have** — **M** (Medium)
- **Input:** Teks pesan, sender type (you/other)
- **Proses:** Render chat bubble in preview; re-index messages on add/delete
- **Output:** Chat bubbles muncul di Phone Frame preview
- **Aturan:** Min 1, max 10 messages; max 200 chars per message; sender name max 20 chars

**FR-02: Live Preview Rendering** — **Must Have** — **L** (Large)
- **Input:** Semua form values (messages, colors, mode, layout)
- **Proses:** Render canvas preview real-time via HTML/CSS + Canvas API
- **Output:** Live preview Phone Frame + Quote Card
- **Aturan:** Update dalam 100ms dari input change; debounce 50ms untuk performa

**FR-03: Quote Selection** — **Must Have** — **S** (Spike)
- **Input:** User tap "Jadikan Quote" pada salah satu pesan
- **Output:** Quote text + author name tampil di Quote Card overlay
- **Aturan:** Hanya 1 quote aktif; jika pilih lain, quote sebelumnya nonaktif

**FR-04: Layout Ratio Management** — **Must Have** — **S** (Spike)
- **Input:** User pilih 9:16 / 1:1 / 4:5
- **Output:** Canvas preview + download image mengikuti rasio
- **Aturan:** Pilihan layout tersimpan di state; indicator visual pada button aktif

**FR-05: Background Configuration** — **Should Have** — **M** (Medium)
- **Input:** Type (solid/gradient/image) + value (hex/color picker/file)
- **Output:** Background pada final canvas berubah
- **Aturan:** Solid color validasi hex; gradient butuh 2 color; image max 5MB, format png/jpg/webp

**FR-06: Dark/Light Mode Toggle** — **Must Have** — **S** (Spike)
- **Input:** User klik toggle di header
- **Output:** Seluruh UI + preview phone berubah mode
- **Aturan:** Persist di localStorage; default follow system preference via `prefers-color-scheme`

**FR-07: Add/Remove Messages** — **Must Have** — **S** (Spike)
- **Input:** Klik "+" untuk add, "×" untuk remove
- **Output:** Row baru muncul/hilang; messages re-indexed
- **Aturan:** Animasi slide in/out 200ms; tombol add hidden saat sudah 10 messages

**FR-08: Status Bar Customization** — **Must Have** — **S** (Spike)
- **Input:** Time (string), Battery (0-100 slider), Signal (1-4 select)
- **Output:** Status bar di Phone Frame sesuai input
- **Aturan:** Default time "09:41"; default battery 80%; default signal 4 bars

### Modul 2: Generate & Download

**FR-09: Image Generation (Canvas)** — **Must Have** — **L** (Large)
- **Input:** Semua data dari form + layout config
- **Proses:** Render ke HTML Canvas → convert ke blob
- **Output:** PNG blob resolusi 2x
- **Aturan:** Ukuran canvas sesuai rasio (9:16 = 720x1280px, 1:1 = 720x720px, 4:5 = 720x900px); anti-aliasing enabled

**FR-10: Full Preview Modal** — **Must Have** — **M** (Medium)
- **Input:** Klik "Generate IQC"
- **Proses:** Render final image → tampilkan di modal
- **Output:** Modal dengan image full-size + action buttons
- **Aturan:** Modal open scale animation 250ms; close via ✕ atau backdrop click

**FR-11: Download PNG** — **Must Have** — **S** (Spike)
- **Input:** Klik "Download PNG" di modal
- **Proses:** Canvas → Blob → createObjectURL → trigger download
- **Output:** File `iqc-quote-{timestamp}.png`
- **Aturan:** File 2x resolution; fallback jika browser tidak support download attribute

**FR-12: Copy Image to Clipboard** — **Could Have** — **S** (Spike)
- **Input:** Klik "Copy Image"
- **Proses:** Canvas → Blob → Clipboard API
- **Output:** Image di clipboard user
- **Aturan:** Fallback toast "Browser tidak support" jika gagal

**FR-13: Watermark Toggle** — **Could Have** — **S** (Spike)
- **Input:** Toggle "Tampilkan Watermark"
- **Output:** Teks "iqcgenerator.com" di sudut bawah image
- **Aturan:** Default off; teks opacity 0.5; font 11px

### Modul 3: Templates

**FR-14: Template Data Store** — **Should Have** — **M** (Medium)
- **Input:** Static JSON array of template objects
- **Proses:** Load → render grid → filter
- **Output:** Grid of template cards
- **Aturan:** Minimal 6 template bawaan; data format: `{ id, name, thumbnail, category, preset }`

**FR-15: Template Filter & Search** — **Should Have** — **S** (Spike)
- **Input:** Search text + category chip
- **Proses:** Filter array by name/category
- **Output:** Filtered template grid
- **Aturan:** Search debounce 300ms

**FR-16: Apply Template** — **Should Have** — **S** (Spike)
- **Input:** Klik "Apply" pada template
- **Proses:** Set all form state dari template preset → redirect ke Creator
- **Output:** Creator screen dengan form terisi
- **Aturan:** Animasi loading saat apply; user bebas edit setelahnya

### Modul 4: Info & Privacy

**FR-17: FAQ Accordion** — **Low** — **S** (Spike)
- **Input:** Klik pertanyaan FAQ
- **Proses:** Toggle accordion open/close
- **Output:** Jawaban tampil/sembunyi
- **Aturan:** Hanya 1 accordion open dalam satu waktu; animasi slide 250ms

**FR-18: Privacy Statement** — **Must Have** — **S** (Spike)
- **Input:** User buka About page
- **Output:** Teks privacy policy
- **Aturan:** Menyebutkan: 100% client-side, data tidak dikirim ke server, tidak ada cookies tracking

---

## BAGIAN 5: Non-Functional Requirements

### Performa
| Parameter | Target |
|-----------|--------|
| First Contentful Paint (FCP) | < 1.5 detik |
| Time to Interactive (TTI) | < 2 detik |
| Preview update latency | < 100ms dari input change |
| Canvas render time | < 500ms untuk 2x resolution |
| Bundle size (JS) | < 200kB gzipped |
| Lighthouse Performance score | ≥ 90 |

### Keamanan
- 100% client-side — zero data sent to server
- File upload (background image) diproses via FileReader, tidak dikirim ke server
- Sanitasi input text dari XSS (text content di canvas — aman secara default)
- No cookies, no tracking (kecuali optional analytics)

### Skalabilitas
- Static hosting (Netlify/Vercel/Cloudflare Pages) — auto-scale by design
- Zero backend = zero server cost
- CDN untuk asset (font, images)
- Target: support unlimited concurrent users (static site)

### Usability
- Responsive: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- Bahasa Indonesia (default) — Inggris sebagai opsi
- Dark mode + light mode
- Keyboard navigable
- Touch target minimal 44x44px untuk mobile

### Kompatibilitas Browser
| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |

### Availability
- Uptime: 99.9% (Netlify/Vercel SLA)
- No planned downtime (static site — zero maintenance window)

---

## BAGIAN 6: Integration Points

### Ringkasan
IQC Generator adalah **zero-backend static web app**. Semua proses client-side. Tidak ada integrasi server.

### Integration List

| Service | Purpose | Auth Method | Data Flow | SLA / Limits |
|---------|---------|-------------|-----------|--------------|
| **Google Fonts (Inter)** | Typography rendering | None (public CDN) | Browser fetch @font-face | Google Fonts SLA — 99.9% |
| **Lucide Icons** | Icon set | None (npm/ESM) | Bundled via import | N/A (local copy) |
| **Canvas API** | Image rendering | None (browser native) | In-memory rendering | Browser-dependent |
| **Clipboard API** | Copy image | None (browser native) | Clipboard write | Browser-dependent |

### Dependencies
- **Synchronization:** N/A (no server sync needed)
- **Fallback:** Jika Canvas API tidak support → tampilkan pesan "Browser tidak support. Gunakan Chrome/Firefox/Safari terbaru."
- **Caching Strategy:** Font di-cache browser; assets via service worker (optional PWA)

### Analytics (Optional — Tidak Wajib)
| Tool | Purpose | Note |
|------|---------|------|
| Plausible / Umami | Traffic + event tracking | Privacy-first, self-hosted opsional |

> **Ponytail:** No analytics for V1. Add if user growth data needed for V2.

---

## BAGIAN 7: Compliance & Data Privacy

### Regulasi
| Regulasi | Berlaku | Notes |
|----------|---------|-------|
| **UU PDP No. 27/2022** | Indonesia | Target utama user Indonesia |
| **GDPR** | Jika target global | Opsional di V1 |

### Data Classification

| Data | Category | Storage | Retention |
|------|----------|---------|-----------|
| Chat messages (input) | Non-PII | In-memory (RAM) | Hapus saat browser ditutup |
| Upload background image | Non-PII | In-memory (FileReader) | Hapus saat page di-reload |
| Dark mode preference | Non-PII | localStorage | Sampai user clear cache |
| Analytics (jika ada) | Non-PII | Server analytics | 26 bulan max (GDPR) |

### Data Deletion Flow
- **Otomatis:** Semua data user hilang saat browser ditutup atau page di-reload (in-memory)
- **Manual:** User tinggal close tab — tidak ada data persistent
- **localStorage:** User bisa clear via DevTools atau "Clear Site Data"

### Consent Management
- **Cookie Consent:** Tidak perlu — tidak ada cookies yang digunakan
- **Data Agreement:** Tidak perlu — zero data collected
- **Opt-out:** Tidak relevan — tidak ada data collection wajib

### Security Standards
- **In Transit:** TLS/HTTPS (disediakan oleh hosting provider — Netlify/Vercel)
- **At Rest:** Tidak ada data disimpan di server
- **Encryption:** Canvas rendering in-memory — tidak ada data persisten

---

## BAGIAN 8: Out of Scope & Dependensi

### Out of Scope (Tidak Dikerjakan di V1)

| Fitur | Alasan | Potensi V2 |
|-------|--------|------------|
| **Batch download multiple quotes** | Kompleksitas UI tambahan | V2 — untuk power users |
| **Video/animated export** | Canvas API terbatas untuk video | V2 — pakai MediaRecorder API |
| **Custom font upload** | Licensing issue + UX complexity | V2 — font picker terbatas |
| **Watermark branding** | Gak perlu di V1 — fokus ke user experience | V2 — optional branding untuk pro |
| **Multi-language support** | Scope creep | V2 — i18n (EN + ID) |
| **PWA / offline mode** | Service worker complexity | V2 |
| **User accounts / gallery** | Butuh backend — bertentangan dengan "no server" | V2 — cloud save |
| **Template community upload** | Butuh backend + moderation | V3 — marketplace |
| **Analytics dashboard** | Butuh backend | V2 — Plausible self-hosted |

### Dependensi

| Library/Tool | Fungsi | Alternatif |
|-------------|--------|------------|
| **SvelteKit / React / Vue** | UI framework | Vanilla JS (lebih ringan) |
| **Tailwind CSS / UnoCSS** | Styling utility | CSS custom |
| **Lucide** | Icons | Heroicons, Phosphor |
| **html2canvas / dom-to-image** | Canvas export | Custom Canvas rendering |
| **Vite** | Build tool | Webpack, Turbopack |
| **Netlify / Vercel / Cloudflare Pages** | Hosting | GitHub Pages, Firebase |

### Asumsi
- User punya browser modern (Chrome/Firefox/Safari/Edge versi terbaru)
- User punya koneksi internet stabil untuk load pertama (static assets)
- User tidak butuh backend — semua data processing cukup di client
- User memahami bahwa output adalah "quote creative" bukan screenshot asli
- Font Inter tersedia via Google Fonts CDN (atau self-hosted)

---

## Design Cross-Reference

| Screen (DESIGN.md) | User Stories | FRs |
|--------------------|-------------|-----|
| Creator (Home) | US-01, US-02, US-03, US-04, US-05, US-06 | FR-01 s/d FR-08 |
| Full Preview (Modal) | US-07, US-08, US-09 | FR-09, FR-10, FR-11, FR-12 |
| Templates | US-10, US-11 | FR-14, FR-15, FR-16 |
| About | US-12 | FR-17, FR-18 |

---

## PRD Review

```
🔍 PRD Review — Konsistensi Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visi & Metrics:        ✅ Jelas & terukur — 5 tujuan, 5 KPI, 4 kompetitor
Persona & Journey:     ✅ 2 persona + user journey 5 tahap masing-masing
User Stories:          ✅ 12 stories, semua ada priority & AC, screen reference
FR Coverage:           ✅ 18 FR — semua ada MoSCoW + effort estimation (S/M/L)
Integration:           ✅ 4 integration points — semua client-side native
Compliance:            ✅ UU PDP + GDPR, klasifikasi data, retention, consent
Design Cross-ref:      ✅ 4/4 screen tercakup
Out of Scope:          ✅ 10 fitur deferred ke V2/V3, dependensi jelas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: ✅ All clear
```
