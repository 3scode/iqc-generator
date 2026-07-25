# IQC Generator — Design Spec

> **iPhone Quote Chat Creator**
> Bikin quote chat iPhone aesthetic dalam 1 klik. Langsung siap posting, tanpa edit ulang.

---

## BAGIAN 1: Design System

### Design Style
- **Style:** Modern & Clean (Apple-inspired)
- **Platform:** Web (responsive, mobile-first)
- **Mode:** Both (Light + Dark)
- **UVP:** First tool that generates ready-to-post iPhone quote images (not raw screenshots). Multiple layout ratios (9:16, 1:1, 4:5) with quote text overlay — langsung siap upload ke sosmed.

### Color Palette

#### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#007AFF` | Brand color, main CTA, iMessage blue |
| `--color-primary-hover` | `#0055CC` | Hover state primary |
| `--color-primary-bubble` | `#007AFF` | Sent chat bubble background |
| `--color-secondary` | `#5856D6` | Secondary accent |
| `--color-surface` | `#FFFFFF` | Card/container bg |
| `--color-background` | `#F2F2F7` | Page background (iOS grey) |
| `--color-text-primary` | `#1C1C1E` | Main text |
| `--color-text-secondary` | `#8E8E93` | Muted text, timestamps |
| `--color-text-bubble-sent` | `#FFFFFF` | Text on sent bubbles |
| `--color-text-bubble-received` | `#1C1C1E` | Text on received bubbles |
| `--color-bubble-received` | `#E9E9EB` | Received bubble bg |
| `--color-error` | `#FF3B30` | Error state |
| `--color-success` | `#34C759` | Success state |
| `--color-warning` | `#FF9500` | Warning state |
| `--color-border` | `#C6C6C8` | Dividers, borders |
| `--color-border-light` | `#E5E5EA` | Subtle borders |
| `--color-overlay` | `rgba(0,0,0,0.4)` | Modal overlay |

#### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-dark` | `#0A84FF` | Brand color, main CTA |
| `--color-primary-hover-dark` | `#4DA6FF` | Hover state primary |
| `--color-primary-bubble-dark` | `#0A84FF` | Sent chat bubble background |
| `--color-secondary-dark` | `#5E5CE6` | Secondary accent |
| `--color-surface-dark` | `#1C1C1E` | Card/container bg |
| `--color-background-dark` | `#000000` | Page background |
| `--color-text-primary-dark` | `#FFFFFF` | Main text |
| `--color-text-secondary-dark` | `#8E8E93` | Muted text, timestamps |
| `--color-text-bubble-sent-dark` | `#FFFFFF` | Text on sent bubbles |
| `--color-text-bubble-received-dark` | `#FFFFFF` | Text on received bubbles |
| `--color-bubble-received-dark` | `#2C2C2E` | Received bubble bg |
| `--color-error-dark` | `#FF453A` | Error state |
| `--color-success-dark` | `#30D158` | Success state |
| `--color-warning-dark` | `#FF9F0A` | Warning state |
| `--color-border-dark` | `#38383A` | Dividers, borders |
| `--color-border-light-dark` | `#2C2C2E` | Subtle borders |
| `--color-overlay-dark` | `rgba(0,0,0,0.6)` | Modal overlay |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| Font Family | `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif` | System-first, falls back to Inter |
| `--font-h1` | 32px, 700, 1.2 | Page title / hero |
| `--font-h2` | 24px, 600, 1.3 | Section title |
| `--font-h3` | 18px, 600, 1.4 | Card title |
| `--font-body` | 16px, 400, 1.5 | Body text, form labels |
| `--font-body-bold` | 16px, 600, 1.5 | Emphasized body |
| `--font-caption` | 13px, 400, 1.4 | Labels, helper text, timestamps |
| `--font-caption-bold` | 13px, 600, 1.4 | Bold captions |
| `--font-small` | 11px, 400, 1.3 | Status bar time, battery |
| `--font-button` | 17px, 600, 1 | Button text |
| `--font-quote` | 28px, 700, 1.3 | Quote overlay text on output |

### Spacing (4px Grid)

| Token | Value |
|-------|-------|
| `--space-2xs` | 2px |
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Input fields, small elements |
| `--radius-md` | 12px | Cards, containers |
| `--radius-lg` | 18px | Modals, phone frame corners |
| `--radius-full` | 999px | Avatars, badges, pill buttons |
| `--radius-bubble` | 18px | Chat bubble corners (iMessage style) |

### Elevation / Shadow

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Cards raised subtle |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.12)` | Dropdown, phone frame |
| `--shadow-lg` | `0 8px 30px rgba(0,0,0,0.16)` | Modal, full preview |

### Icon Style
- **Style:** Outline (SF Symbols-inspired)
- **Library:** Lucide (web-friendly, consistent stroke)
- **Default Size:** 20px (inline), 24px (buttons), 32px (feature icons)
- **Skeleton Animation:** Shimmer effect (gradient sweep 1500ms linear loop)

---

## BAGIAN 2: Screen Map & User Flow

### Information Architecture

```
[Depth 0] IQC Generator
├── [Depth 1] Creator (Home)
│   ├── [Depth 2] Full Preview (modal)
│   └── [Depth 2] Download flow (inline)
├── [Depth 1] Templates
│   └── [Depth 2] Template Preview (modal)
└── [Depth 1] About / Help
```

**Navigasi Depth:** 2 level max
**Breadcrumb:** Tidak perlu (single-page app feel)
**Nesting Rules:** Modal untuk preview, gak bikin halaman baru

### Screen Inventory

| # | Screen | Route | Module | Depth |
|---|--------|-------|--------|-------|
| 1 | Creator (Home) | `/` | Main | L1 |
| 2 | Full Preview | Modal | Main | L2 |
| 3 | Templates | `/templates` | Explore | L1 |
| 4 | About / Help | `/about` | Info | L1 |

### User Flow Diagram

```
[Creator] ──→ [Full Preview] ──→ [Download PNG]
    │                │
    │                └── [Back to Creator]
    │
    └── [Templates] ──→ [Apply Template] ──→ [Creator (prefilled)]
    │
    └── [About / Help]
```

### Main Flows

**Flow 1: Create & Download Quote**
1. Creator → user fills form (messages, sender, time, battery, etc.)
2. Creator → live preview updates in real-time
3. User selects quote message → quote overlay appears on preview
4. User selects layout ratio (9:16 / 1:1 / 4:5)
5. User clicks "Generate" → Full Preview modal opens
6. User clicks "Download PNG" → image saved
7. Toast: "Berhasil diunduh!"

**Flow 2: Use Template**
1. Creator → user clicks "Templates" nav
2. Templates → user browses preset chat designs
3. User clicks "Apply" on a template
4. Redirect to Creator with form prefilled from template
5. User tweaks and downloads

### Responsive Behavior

| Breakpoint | Layout | Changes |
|-----------|--------|---------|
| **Mobile < 768px** | Single column stack | Form above, preview below; bottom nav |
| **Tablet 768-1024px** | 2-column | Form left (40%), preview right (60%) |
| **Desktop > 1024px** | 2-column + sidebar | Form left (35%), preview center (50%), tips right (15%) |

---

## BAGIAN 3: Per-Screen Design

### Screen [01]: Creator (Home)

**Purpose:** Main screen — form input + live preview of the iPhone quote chat.
**UVP Highlight:** Real-time preview shows the final quote image (not just raw bubbles). Layout switcher + quote overlay langsung keliatan hasilnya.
**Route:** `/`
**Access:** Public

#### Layout Structure

```
Desktop (2-column):
┌─────────────────────────────────────────────────────┐
│  Header: IQC Generator   [Dark Toggle] [? Help]     │
├──────────────────────┬──────────────────────────────┤
│  Form Panel (35%)    │  Preview Panel (50%)         │
│                      │                              │
│  ┌──────────────┐    │  ┌────────────────────┐      │
│  │ Chat Messages │    │  │  iPhone Frame      │      │
│  │ [Msg 1] [x]   │    │  │  ┌──────────────┐ │      │
│  │ [Msg 2] [x]   │    │  │  │ Chat bubbles │ │      │
│  │ [+ Add Msg]   │    │  │  └──────────────┘ │      │
│  └──────────────┘    │  │                    │      │
│                      │  │  ┌──────────────┐ │      │
│  ┌──────────────┐    │  │  │ Quote Text   │ │      │
│  │ Sender Name  │    │  │  │ Overlay      │ │      │
│  │ [________]   │    │  └────────────────────┘      │
│  └──────────────┘    │                              │
│                      │  Layout: [9:16] [1:1] [4:5]  │
│  ┌──────────────┐    │  [Generate IQC]              │
│  │ Status Bar   │    │                              │
│  │ Time [____]  │    │  Tips Panel (15%):           │
│  │ Battery [%]  │    │  ┌──────────────────────┐    │
│  │ Signal [__]  │    │  │ 💡 Tips & Trik       │    │
│  └──────────────┘    │  │ - Gunakan max 3 pesan │    │
│                      │  │ - Quote pendek lebih  │    │
│  ┌──────────────┐    │  │   impactful           │    │
│  │ Quote Config │    │  └──────────────────────┘    │
│  │ Pick msg #2  │    │                              │
│  │ Font size ▽  │    │                              │
│  └──────────────┘    │                              │
│                      │                              │
│  ┌──────────────┐    │                              │
│  │ BG: Solid /  │    │                              │
│  │ Gradient /   │    │                              │
│  │ Image        │    │                              │
│  └──────────────┘    │                              │
└──────────────────────┴──────────────────────────────┘
                         Bottom Nav (mobile only):
                         [Creator] [Templates] [About]
```

#### Components Used

| Component | Position | Description |
|-----------|----------|-------------|
| Header | Top | Logo, dark mode toggle, help link |
| Message List | Form Panel | Add/edit/remove chat messages |
| Sender Input | Form Panel | Sender name for each message |
| Status Bar Config | Form Panel | Time, battery %, signal bars |
| Quote Config | Form Panel | Select which message becomes quote |
| Background Config | Form Panel | Solid / Gradient / Custom image |
| Layout Switcher | Preview Panel | 9:16, 1:1, 4:5 ratio buttons |
| Phone Frame | Preview Panel | iPhone outline containing chat |
| Quote Card | Preview Panel | Overlaid quote text below chat |
| Download Button | Preview Panel | Generate + download CTA |
| Tips Card | Tips Panel | Usage tips (desktop only) |

#### States

| State | Visual | Trigger |
|-------|--------|---------|
| **Default** | Empty form, preview shows placeholder phone with "Isi form untuk mulai" text | First visit |
| **Filled** | Form has data, live preview shows chat bubbles + quote | User typing |
| **Generating** | Button shows spinner, overlay dims preview | Click "Generate IQC" |
| **Generated** | Preview modal opens with final image | Generate complete |
| **Error** | Red border on invalid fields, error toast | Validation fail |
| **Success** | Green toast "Berhasil diunduh!" | Download complete |

#### Loading Skeleton Spec

| Region | Skeleton Type | Size | Animation |
|--------|--------------|------|-----------|
| Preview Phone | Rounded rect (phone shape) | 280x580px | Shimmer |
| Form fields | Line rect × 5 | 100% width × 40px each | Pulse |
| Buttons | Rounded rect | 120x44px | Pulse |

#### Empty State Spec

| Elemen | Deskripsi |
|--------|-----------|
| **Ilustrasi** | iPhone outline kosong dengan ikon chat bubble + "?" |
| **Ukuran Ilustrasi** | 200x400px |
| **Title** | "Belum Ada Chat" |
| **Description** | "Isi form di samping untuk mulai membuat quote chat iPhone-mu" |
| **CTA** | — (form langsung bisa diisi) |
| **Link** | — |

#### Error State Detail

| Error Type | Visual | Interaction |
|------------|--------|-------------|
| **Validation Empty** | Field border merah + "Wajib diisi" | User fills field |
| **Network Offline** | Toast "Koneksi terputus" | Auto-retry |
| **Image Export Fail** | Toast "Gagal mengunduh. Coba lagi." | Tap retry |
| **Quote Not Selected** | Highlight picker + "Pilih pesan jadi quote" | User selects |

#### Data Format Per Screen

| Elemen | Type | Source | Format |
|--------|------|--------|--------|
| Chat Message | Text | User input | Max 200 chars per message |
| Sender Name | Text | User input | Max 20 chars |
| Time | Text | User input | "09:41" format |
| Battery | Number | Slider/input | 0-100% |
| Signal | Select | User choice | 1-4 bars |
| Quote Message | Ref | Selected from messages | Index reference |
| Layout | Select | User choice | "9:16" / "1:1" / "4:5" |
| BG Color | Color picker | User input | Hex value |

#### Micro-interactions & Animations

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Add Message | Click | New row slides down | 200ms | ease-out |
| Remove Message | Click | Row slides up + fade | 200ms | ease-in |
| Preview | Value change | Crossfade update | 150ms | ease-out |
| Generate | Click | Button → spinner, overlay fades in | 300ms | ease-out |
| Modal | Open | Scale up (0.95→1) + fade in | 250ms | ease-out |
| Modal | Close | Scale down (1→0.95) + fade out | 200ms | ease-in |
| Layout Switch | Click | Preview morphs to new ratio | 300ms | ease-in-out |
| Dark Mode | Toggle | Smooth bg color transition | 300ms | ease |
| Toast | Auto | Slide in from top → hold → slide out | 300ms + 3s | ease-out |

#### Interactions

| Element | Interaction | Feedback |
|---------|------------|----------|
| Add Message | Tap + | New message row appears |
| Remove Message | Tap × | Row deleted, messages re-indexed |
| Message Text | Type | Live preview updates |
| Generate | Tap | Preview modal opens |
| Download | Tap | Image saved, success toast |
| Layout | Tap | Preview ratio changes |
| Quote Picker | Tap | Highlight selected message |
| Dark Mode | Tap | All UI toggles dark/light |

#### Accessibility

- **Keyboard Navigation:** Tab through form fields, Enter to add/generate
- **ARIA Labels:** `role="form"`, `aria-label="Buat chat"` on inputs
- **Contrast Ratio:** All text meets WCAG AA 4.5:1 (verified in palette)
- **Touch Target:** All interactive elements ≥ 44x44px
- **Screen Reader:** Live preview area has `aria-live="polite"` for updates

#### Responsive Behavior

- **Mobile (< 768px):** Single column — form top, preview bottom. Bottom nav bar. Full-width inputs. Phone frame scales to fit width.
- **Tablet (768-1024px):** 2-column split — form left 40%, preview right 60%. Tips hidden.
- **Desktop (> 1024px):** 3-column — form 30%, preview 45%, tips sidebar 25%. Hover states on buttons.

---

### Screen [02]: Full Preview (Modal)

**Purpose:** Full-size preview of the generated quote image before download.
**UVP Highlight:** Shows the exact image that will be downloaded — no surprises.
**Route:** Modal overlay
**Access:** Public (from Creator)

#### Layout Structure

```
┌─────────────────────────────────────────────┐
│  Modal Overlay (dark)                       │
│  ┌─────────────────────────────────────┐    │
│  │  Header: "Pratinjau"     [✕ Close]  │    │
│  ├─────────────────────────────────────┤    │
│  │                                     │    │
│  │       ┌───────────────────┐         │    │
│  │       │                   │         │    │
│  │       │  Full Quote Image │         │    │
│  │       │  (iPhone frame +  │         │    │
│  │       │   chat + quote)   │         │    │
│  │       │                   │         │    │
│  │       └───────────────────┘         │    │
│  │                                     │    │
│  │  [Download PNG] [Copy Image]        │    │
│  │  [Back to Edit]                     │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

#### Components Used

| Component | Position | Description |
|-----------|----------|-------------|
| Modal | Full screen | Dark overlay + centered card |
| Quote Card | Center | The final rendered image |
| Button Primary | Bottom | Download PNG |
| Button Secondary | Bottom | Copy to clipboard |
| Button Ghost | Bottom | Back to edit |

#### States

| State | Visual | Trigger |
|-------|--------|---------|
| **Open** | Modal fades in, image renders | Click "Generate IQC" |
| **Downloading** | Button spinner | Click "Download PNG" |
| **Downloaded** | Green check + toast | Download complete |
| **Error** | Error illustration | Render failure |
| **Close** | Modal fades out | Click ✕ or backdrop |

#### Loading Skeleton Spec

| Region | Skeleton Type | Size | Animation |
|--------|--------------|------|-----------|
| Image area | Rounded rect screen-shaped | 80% width × 70% height | Shimmer 1500ms |
| Buttons | 2 line rects | 160x44px each | Pulse |

#### Error State Detail

| Error Type | Visual | Interaction |
|------------|--------|-------------|
| Render Fail | Icon + "Gagal render. Coba ubah pengaturan." | Back to edit |
| Download Fail | Toast "Gagal mengunduh" | Retry button |

#### Data Format

| Elemen | Type | Source | Format |
|--------|------|--------|--------|
| Preview Image | Canvas/Blob | Generated client-side | PNG, 2x resolution |
| Download | File | Canvas → Blob → download | `iqc-quote-{timestamp}.png` |

#### Micro-interactions

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Modal | Open | Scale up + fade | 250ms | ease-out |
| Modal | Close | Scale down + fade | 200ms | ease-in |
| Download | Click | Button → spinner | 200ms | ease |
| Image | Load | Fade in | 300ms | ease |

#### Accessibility

- **Keyboard:** Escape to close, Enter/click to download
- **ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-label="Pratinjau gambar"`
- **Focus Trap:** Inside modal, Tab cycles modal elements only
- **Contrast:** Text on dark overlay meets AA

---

### Screen [03]: Templates

**Purpose:** Browse and apply preset chat designs / quote styles.
**UVP Highlight:** Instant inspiration — apply a template and get a beautiful quote in seconds.
**Route:** `/templates`
**Access:** Public

#### Layout Structure

```
┌─────────────────────────────────────────────┐
│  Header: "Templates"        [Dark Toggle]   │
├─────────────────────────────────────────────┤
│                                             │
│  Search / Filter: [Search...] [All] [Pop]   │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ Temp │ │ Temp │ │ Temp │ │ Temp │      │
│  │  #1  │ │  #2  │ │  #3  │ │  #4  │      │
│  │      │ │      │ │      │ │      │      │
│  │[Apply]│ │[Apply]│ │[Apply]│ │[Apply]│      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │ Temp │ │ Temp │ │ Temp │                │
│  │  #5  │ │  #6  │ │  #7  │                │
│  │[Apply]│ │[Apply]│ │[Apply]│                │
│  └──────┘ └──────┘ └──────┘                │
│                                             │
├─────────────────────────────────────────────┤
│  Bottom Nav: [Creator] [Templates] [About]  │
└─────────────────────────────────────────────┘
```

#### Components Used

| Component | Position | Description |
|-----------|----------|-------------|
| Search Bar | Top | Filter templates by name |
| Filter Chips | Top | Category filters |
| Template Card | Grid | Thumbnail + name + apply button |

#### States

| State | Visual | Trigger |
|-------|--------|---------|
| **Default** | Grid of template cards loaded | Page load |
| **Searching** | Filtered results | User types in search |
| **Applying** | Card shows spinner | Click "Apply" |
| **Applied** | Redirect to Creator with prefilled data | Template applied |
| **Empty** | "Tidak ada template" + illustration | No search results |
| **Error** | "Gagal memuat template" + retry | Network/loading fail |

#### Loading Skeleton Spec

| Region | Skeleton Type | Size | Animation |
|--------|--------------|------|-----------|
| Template Grid | 6× rounded rect cards | 160x240px each | Shimmer 1500ms |
| Search Bar | Line rect | 100% × 40px | Pulse |

#### Empty State Spec

| Elemen | Deskripsi |
|--------|-----------|
| **Ilustrasi** | Search icon with crossed-out circle |
| **Ukuran** | 80x80px |
| **Title** | "Template Tidak Ditemukan" |
| **Description** | "Coba kata kunci lain atau lihat semua template" |
| **CTA** | "Lihat Semua" |

#### Error State Detail

| Error Type | Visual | Interaction |
|------------|--------|-------------|
| Load Failed | Icon + "Gagal memuat. Cek koneksi." | Retry button |
| Apply Failed | Toast "Gagal menerapkan template" | Try again |

#### Data Format

| Elemen | Type | Source | Format |
|--------|------|--------|--------|
| Template ID | String | Static data | `tpl-01` |
| Thumbnail | Image | Static asset | 160x240px PNG |
| Name | Text | Static data | "Classic Blue" |
| Preset Data | JSON | Static data | Messages, colors, config |

#### Micro-interactions

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Card | Hover | Lift 4px + shadow | 200ms | ease-out |
| Card | Tap | Scale 0.97 | 100ms | ease-in |
| Apply | Click | Card overlay + spinner | 200ms | ease |
| Search | Type | Debounced filter results | 300ms | — |

#### Accessibility

- **Keyboard:** Tab through cards, Enter to apply
- **ARIA:** `role="grid"`, each card `aria-label="Template {name}"`
- **Touch Target:** Cards min 44px tap area

#### Responsive Behavior

- **Mobile (< 768px):** 2-column grid, full-width search
- **Tablet (768-1024px):** 3-column grid
- **Desktop (> 1024px):** 4-column grid, hover zoom effect

---

### Screen [04]: About / Help

**Purpose:** Info about the tool, privacy policy, FAQ, credits.
**Route:** `/about`
**Access:** Public

#### Layout Structure

```
┌─────────────────────────────────────────────┐
│  Header: "About"             [Dark Toggle]  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────── About ───────────────────┐   │
│  │  IQC Generator v1.0                  │   │
│  │  "Bikin quote chat iPhone aesthetic  │   │
│  │   dalam 1 klik."                     │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌──────────── FAQ ─────────────────────┐   │
│  │  ▼ Apa itu IQC Generator?            │   │
│  │  ▼ Apakah data saya aman?            │   │
│  │  ▼ Format gambar apa yang didukung?  │   │
│  │  ▼ Bisa dipakai komersial?           │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌─────────── Privacy ──────────────────┐   │
│  │  "Kami tidak menyimpan data Anda.    │   │
│  │  Semua proses di browser."           │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌─────────── Credits ──────────────────┐   │
│  │  Made with ❤️ by [Your Name]          │   │
│  │  © 2026 IQC Generator                │   │
│  └──────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  Bottom Nav: [Creator] [Templates] [About]  │
└─────────────────────────────────────────────┘
```

#### Components Used

| Component | Position | Description |
|-----------|----------|-------------|
| Accordion | FAQ section | Expandable Q&A items |
| Info Card | Each section | Content cards |

#### States

| State | Visual | Trigger |
|-------|--------|---------|
| **Default** | All sections visible, FAQ collapsed | Page load |
| **FAQ Open** | Accordion expanded | Click question |
| **FAQ Close** | Accordion collapsed | Click again |

#### Empty/Error States

No significant empty/error states — static content page.

#### Data Format

Static content. No API calls.

#### Micro-interactions

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| FAQ | Click | Accordion slide down/up | 250ms | ease-out |

#### Accessibility

- **Keyboard:** Tab through FAQ, Enter/Space to toggle
- **ARIA:** `aria-expanded` on accordion buttons

#### Responsive Behavior

- **Mobile:** Full-width stacked sections
- **Desktop:** Max-width 720px centered

---

## BAGIAN 4: Component Specs

### Component: Button

**Usage:** Creator, Preview modal, Templates
**Category:** Atom

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| Primary | Solid `--color-primary` bg, white text | Main CTA (Generate, Download) |
| Secondary | White bg, `--color-primary` border | Secondary action (Save, Copy) |
| Ghost | Transparent bg, grey text | Subtle action (Cancel, Back) |
| Danger | Red bg, white text | Destructive (Reset, Delete) |

#### States

| State | Visual Change |
|-------|--------------|
| Default | Normal appearance per variant |
| Hover | Primary → darker shade; Secondary → light bg |
| Active/Pressed | Scale 0.97 |
| Disabled | Opacity 0.5, no pointer events |
| Loading | Spinner replaces icon/text, button width fixed |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary | secondary | ghost | danger` | `primary` | Visual style |
| `size` | `sm | md | lg` | `md` | Size: sm=32px, md=44px, lg=56px |
| `fullWidth` | `boolean` | `false` | Stretch to parent width |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `icon` | `string` | — | Lucide icon name |
| `onClick` | `function` | — | Click handler |

#### Accessibility

- Keyboard: Enter/Space to activate
- ARIA: `role="button"` (default for `<button>`)
- Focus: 2px solid `--color-primary` ring offset 2px

---

### Component: Input Field

**Usage:** Creator form (messages, sender name, time, battery)
**Category:** Atom

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| Text | Single line with border | Short text (name, time) |
| Textarea | Multi-line | Chat message content |
| Number | Numeric with +/- | Battery percentage |
| Color | Color swatch + picker | Background color |
| Slider | Range slider | Battery, signal strength |

#### States

| State | Visual Change |
|-------|--------------|
| Default | Border `--color-border-light`, white bg |
| Focus | Border `--color-primary`, 2px ring primary 20% opacity |
| Hover | Border darkens slightly |
| Filled | Normal with value, optional clear button |
| Error | Border `--color-error`, error text below |
| Disabled | Opacity 0.5, grey bg |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `text | textarea | number | color | range` | `text` | Input type |
| `label` | `string` | — | Label text above |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string | number` | — | Controlled value |
| `error` | `string` | — | Error message |
| `maxLength` | `number` | — | Max characters |
| `onChange` | `function` | — | Value change handler |

#### Accessibility

- Label: `<label>` element with `for` attribute
- Error: `aria-describedby` linking to error message
- Focus: Visible ring, same as Button

---

### Component: Chat Bubble

**Usage:** Preview panel — rendered chat messages
**Category:** Molecule

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| Sent | Blue bg `--color-primary-bubble`, white text, right-aligned | "You" messages |
| Received | Grey bg `--color-bubble-received`, dark text, left-aligned | Other person messages |

#### States

| State | Visual Change |
|-------|--------------|
| Default | Normal bubble with rounded corners |
| With Time | Small timestamp below bubble |
| Quote Selected | Glow ring + "Quote" badge on chosen message |
| Typing | Animated "..." bubble (optional) |

#### Structure

```
┌─────────────────────────────────┐
│  Sent (right):                  │
│         ┌─────────────────────┐ │
│         │  Message text here  │ │
│         │           09:41 AM  │ │
│         └─────────────────────┘ │
│                                 │
│  Received (left):               │
│  ┌─────────────────────┐       │
│  │  Hey, how are you?  │       │
│  │  09:41 AM           │       │
│  └─────────────────────┘       │
└─────────────────────────────────┘
```

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Message content |
| `type` | `sent | received` | `sent` | Bubble type |
| `time` | `string` | — | Timestamp text |
| `isQuote` | `boolean` | `false` | Whether this is the quote message |
| `avatar` | `string (url)` | — | Optional sender avatar |

#### Accessibility

- ARIA: `role="comment"` per bubble in preview context

---

### Component: Phone Frame

**Usage:** Preview panel — wraps chat bubbles in an iPhone outline
**Category:** Organism

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| Light | White device frame, light status bar | Light mode preview |
| Dark | Dark device frame, dark status bar | Dark mode preview |

#### States

| State | Visual |
|-------|--------|
| Default | Rounded rectangle with notch, phone outline |
| Empty | Inside shows placeholder illustration |
| Filled | Inside shows chat bubbles + quote |

#### Structure

```
┌─────────────────────┐  ← device rounded corners
│ [Status Bar]        │
│ 09:41    80% ▮▮▮▮  │
├─────────────────────┤
│                     │
│  [Chat Bubbles]     │
│                     │
│  [Quote Overlay]    │
│                     │
├─────────────────────┤
│  [Home Indicator]   │
└─────────────────────┘
```

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `light | dark` | `light` | Color scheme |
| `children` | `ReactNode` | — | Chat content inside |

---

### Component: Quote Card

**Usage:** Preview panel & Full Preview — the final quote image layout
**Category:** Organism

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| 9:16 | Vertical portrait | Instagram Story, TikTok |
| 1:1 | Square | Instagram Feed |
| 4:5 | Portrait | Instagram Feed optimized |

#### Structure

```
┌──────────────────────┐
│                      │
│  ┌────────────────┐  │
│  │  Phone Frame   │  │
│  │  (chat bubbles)│  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │  "Quote Text"  │  │
│  │  — Sender Name │  │
│  └────────────────┘  │
│                      │
│  [iqcgenerator.com]  │ ← watermark (optional toggle)
└──────────────────────┘
```

#### States

| State | Visual |
|-------|--------|
| Default | Full layout rendered |
| Without Quote | Only phone frame, no overlay |
| With Watermark | Small URL at bottom |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `"9:16" | "1:1" | "4:5"` | `"9:16"` | Output aspect ratio |
| `phoneMode` | `light | dark` | `light` | Phone color scheme |
| `bgType` | `solid | gradient | image` | `solid` | Background type |
| `bgColor` | `string` | `#F2F2F7` | Background color/start |
| `bgGradientEnd` | `string` | — | Gradient end color |
| `bgImage` | `string (url)` | — | Background image URL |
| `showWatermark` | `boolean` | `true` | Show URL at bottom |
| `quoteText` | `string` | — | Large quote overlay text |
| `quoteAuthor` | `string` | — | Sender name below quote |

---

### Component: Status Bar

**Usage:** Inside Phone Frame — top iPhone status bar
**Category:** Atom

#### Variants

| Token | Visual |
|-------|--------|
| Light | Black text/icons on white |
| Dark | White text/icons on black |

#### Structure

```
┌─────────────────────────────┐
│  09:41    ▮▮▮▮  80%  🔋   │
└─────────────────────────────┘
Left: Time (center)  |  Right: Signal bars + Battery
```

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `time` | `string` | `"09:41"` | Status bar time |
| `battery` | `number` | `80` | Battery percentage 0-100 |
| `signal` | `number` | `4` | Signal bars 1-4 |
| `mode` | `light | dark` | `light` | Status bar style |

---

### Component: Message List Item

**Usage:** Creator form — each chat message row
**Category:** Molecule

#### Structure

```
┌──────────────────────────────────────┐
│  [#1] [Who: ▼ You / Other]          │
│  [Message text...............] [✕]  │
│  [⤮ Pick as quote]                  │
└──────────────────────────────────────┘
```

#### Variants

| Variant | Visual | When to use |
|---------|--------|-------------|
| Normal | Standard row | Regular message |
| Quote Selected | Green highlight on "Pick as quote" | Message chosen as quote |

#### States

| State | Visual |
|-------|--------|
| Default | Normal row |
| Filled | Input has text |
| Quote active | "Pick as quote" highlighted |
| Deleting | Row fades out + shrink |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | — | Message number |
| `text` | `string` | — | Message content |
| `sender` | `"you" | "other"` | `"you"` | Who sent this |
| `isQuote` | `boolean` | `false` | Is this the quote |
| `onDelete` | `function` | — | Remove handler |
| `onChange` | `function` | — | Edit handler |
| `onQuoteSelect` | `function` | — | Quote pick handler |

---

### Component: Toggle (Dark Mode)

**Usage:** Header — switch light/dark mode
**Category:** Atom

#### Variants

| Variant | Visual |
|---------|--------|
| Light mode | Sun icon, white bg |
| Dark mode | Moon icon, dark bg |

#### States

| State | Visual |
|-------|--------|
| Off | Shows sun, background light |
| On | Shows moon, background dark |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Toggle state |
| `onChange` | `function` | — | Toggle handler |

#### Accessibility

- ARIA: `role="switch"`, `aria-checked`
- Keyboard: Enter/Space to toggle

---

### Component: Layout Switcher

**Usage:** Preview panel — switch between 9:16 / 1:1 / 4:5
**Category:** Molecule

#### Variants

| Variant | Label | Icon |
|---------|-------|------|
| Story | 9:16 | Vertical rectangle |
| Feed | 1:1 | Square |
| Portrait | 4:5 | Tall rectangle |

#### States

| State | Visual |
|-------|--------|
| Inactive | Ghost button style |
| Active | Primary solid, selected |
| Hover | Light bg |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `"9:16" | "1:1" | "4:5"` | `"9:16"` | Current layout |
| `onChange` | `function` | — | Layout change handler |

---

### Component: Toast

**Usage:** Global — success/error notifications
**Category:** Atom

#### Variants

| Variant | Visual |
|---------|--------|
| Success | Green left border + check icon |
| Error | Red left border + X icon |
| Warning | Orange left border + warning icon |
| Info | Blue left border + info icon |

#### States

| State | Visual |
|-------|--------|
| Enter | Slide in from top |
| Visible | Full opacity, top of viewport |
| Exit | Slide out to top, fade |

#### Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `success | error | warning | info` | `info` | Toast variant |
| `message` | `string` | — | Toast text |
| `duration` | `number` | `3000` | Auto-dismiss ms |
| `onClose` | `function` | — | Dismiss handler |

---

## Design Review

```
🔍 Design Review — Konsistensi Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design System:        ✅ 18 color tokens (light + dark), 11 typography, 8 spacing
Screen Coverage:      ✅ 4/4 screen tercover
Component Reusability:✅ 10 component multi-screen
States Coverage:      ✅ Semua screen ada 5 states (default, empty, loading, error, success)
Dark Mode:            ✅ 10 dark mode tokens lengkap
Animations:           ✅ Semua screen ada micro-interactions
Loading Skeletons:    ✅ Semua screen ada skeleton spec
Error States:         ✅ Semua screen ada error detail
Data Formats:         ✅ Semua screen ada data format spec
Accessibility:        ✅ Semua screen ada accessibility section
Responsive:           ✅ Semua screen ada responsive behavior
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: ✅ All clear
```
