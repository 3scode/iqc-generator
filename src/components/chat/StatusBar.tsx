interface Props {
  time: string
  battery: number
  dark: boolean
  carrier?: string
  showWifi?: boolean
  airplaneMode?: boolean
}
const sfDisplay = '"SF Pro Display", system-ui, sans-serif'

const sfText = '"SF Pro Text", system-ui, sans-serif'

function SignalBars() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      <rect x="0" y="9" width="2.5" height="3" rx="0.8" fill="currentColor" opacity="0.3" />
      <rect x="4.5" y="6" width="2.5" height="6" rx="0.8" fill="currentColor" opacity="0.5" />
      <rect x="9" y="3" width="2.5" height="9" rx="0.8" fill="currentColor" opacity="0.75" />
      <rect x="13.5" y="0" width="2.5" height="12" rx="0.8" fill="currentColor" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M7.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
      <path d="M3.5 6.5a6 6 0 0 1 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M1 3.5a10 10 0 0 1 13 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function AirplaneIcon() {
  return (
    <svg width="22" height="17" viewBox="0 0 512 400" fill="currentColor">
      <path d="M407.7 224c-3.4 0-14.8.1-18 .3l-64.9 1.7c-.7 0-1.4-.3-1.7-.9L225.8 79.4c-2.9-4.6-8.1-7.4-13.5-7.4h-23.7c-5.6 0-7.5 5.6-5.5 10.8l50.1 142.8c.5 1.3-.4 2.7-1.8 2.7L109 230.1c-2.6.1-5-1.1-6.6-3.1l-37-45c-3-3.9-7.7-6.1-12.6-6.1H36c-2.8 0-4.7 2.7-3.8 5.3l19.9 68.7c1.5 3.8 1.5 8.1 0 11.9l-19.9 68.7c-.9 2.6 1 5.3 3.8 5.3h16.7c4.9 0 9.6-2.3 12.6-6.1L103 284c1.6-2 4.1-3.2 6.6-3.1l121.7 2.7c1.4.1 2.3 1.4 1.8 2.7L183 429.2c-2 5.2-.1 10.8 5.5 10.8h23.7c5.5 0 10.6-2.8 13.5-7.4L323.1 287c.4-.6 1-.9 1.7-.9l64.9 1.7c3.3.2 14.6.3 18 .3 44.3 0 72.3-14.3 72.3-32S452.1 224 407.7 224z" />
    </svg>
  )
}

function BatteryIcon({ pct }: { pct: number }) {
  const isLow = pct <= 20
  const color = isLow ? '#FFD60A' : '#F2F2F7'
  const w = Math.min(Math.max(pct, 5), 100)
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={color} strokeOpacity={isLow ? 1 : 0.4} fill="none" />
      <rect x="2" y="2" width={w / 100 * 19} height="9" rx="1.5" fill={color} />
      <rect x="24" y="4.5" width="2.5" height="4" rx="1" fill={color} opacity={isLow ? 1 : 0.4} />
    </svg>
  )
}

export function StatusBar({ time, battery: pct, dark, carrier = 'Axis', showWifi = true, airplaneMode = false }: Props) {
  const isLow = pct <= 20
  const color = isLow ? '#FFD60A' : (dark ? '#F2F2F7' : '#000')
  return (
    <div
      className="flex items-center justify-between px-[28px] h-[54px] select-none"
      style={{ color, fontFamily: sfDisplay }}
    >
      <div className="flex items-center gap-[5px]">
        {airplaneMode ? (
          <AirplaneIcon />
        ) : (
          <>
            <span className="text-[17px] font-semibold tracking-[-.03em] leading-none" style={{ fontFamily: sfText }}>{carrier}</span>
            <SignalBars />
            {showWifi && <WifiIcon />}
          </>
        )}
      </div>
      <span
        className="text-[16px] font-semibold tracking-[-.02em] absolute left-1/2 -translate-x-1/2"
        style={{ fontFamily: sfDisplay }}
      >
        {time}
      </span>
      <div className="flex items-center gap-[5px]">
        <BatteryIcon pct={pct} />
      </div>
    </div>
  )
}
