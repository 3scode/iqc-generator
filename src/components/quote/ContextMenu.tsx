interface Item {
  label: string
  icon: React.ReactNode
  destructive?: boolean
}

function IconBase({ d, stroke }: { d: string; stroke?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d={d} {...(stroke ? { stroke, strokeWidth: '1.5', strokeLinecap: 'round', fill: 'none' } : {})} />
    </svg>
  )
}

function SfStar() {
  return <IconBase d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
}

function SfArrowUpLeft() {
  return <IconBase d="M20 11H9.8l2.6-2.6a1 1 0 1 0-1.4-1.4l-4.3 4.3a1 1 0 0 0 0 1.4l4.3 4.3a1 1 0 0 0 1.4-1.4L9.8 13H20a1 1 0 0 0 0-2z" />
}

function SfArrowUpRight() {
  return <IconBase d="M4 11h10.2l-2.6-2.6a1 1 0 0 1 1.4-1.4l4.3 4.3a1 1 0 0 1 0 1.4l-4.3 4.3a1 1 0 0 1-1.4-1.4l2.6-2.6H4a1 1 0 0 1 0-2z" />
}

function SfDocOnDoc() {
  return (
    <IconBase d="M19 3H9a2 2 0 0 0-2 2v1h2V5h10v10h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM15 9H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2z" />
  )
}

function SfTriangle() {
  return <IconBase d="M2.6 19.5L12 4l9.4 15.5H2.6zM12 9v5m0 3v1" stroke="currentColor" />
}

function SfTrash() {
  return (
    <IconBase d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zM4 5h16M10 3h4" stroke="currentColor" />
  )
}

function SfMessage() {
  return <IconBase d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14l4 4V4a2 2 0 0 0-2-2z" />
}

const items: Item[] = [
  { label: 'Beri Bintang', icon: <SfStar /> },
  { label: 'Balas', icon: <SfArrowUpLeft /> },
  { label: 'Teruskan', icon: <SfArrowUpRight /> },
  { label: 'Salin', icon: <SfDocOnDoc /> },
  { label: 'Ucapkan', icon: <SfMessage /> },
  { label: 'Laporkan', icon: <SfTriangle /> },
  { label: 'Hapus', icon: <SfTrash />, destructive: true },
]

const noiseSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E`

interface MenuProps {
  align?: 'left' | 'right'
}

export function ContextMenu({ align = 'left' }: MenuProps) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end pr-[8px]' : 'justify-start pl-[8px]'}`}>
      <div className="relative" style={{ width: '350px' }}>
        <div
          className="absolute inset-0 rounded-[22px]"
          style={{
            backgroundColor: 'rgba(38,38,40,0.72)',
            backdropFilter: 'blur(42px) saturate(180%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(42px) saturate(180%) brightness(1.05)',
            border: '.5px solid rgba(255,255,255,.08)',
            boxShadow: '0 10px 30px rgba(0,0,0,.18)',
          }}
        />
        <div
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            backgroundImage: `url("${noiseSvg}")`,
            backgroundSize: '200px 200px',
            opacity: 0.4,
          }}
        />
        <div
          className="relative rounded-[22px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.01) 30%, transparent 60%)',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between h-[40px] cursor-pointer"
              style={{
                paddingLeft: '14px',
                paddingRight: '14px',
                borderBottom: i < items.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span
                className="font-normal tracking-[-0.01em]"
                style={{
                  color: item.destructive ? '#FF453A' : '#fff',
                  fontSize: '16px',
                  lineHeight: '22px',
                  fontFamily: '"SF Pro Text", system-ui, sans-serif',
                }}
              >
                {item.label}
              </span>
              <div
                className="flex items-center"
                style={{
                  color: item.destructive ? '#FF453A' : 'rgba(255,255,255,.55)',
                }}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
