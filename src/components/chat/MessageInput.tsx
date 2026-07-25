export function MessageInput() {
  return (
    <div
      className="flex items-center gap-[6px] px-[10px] pb-[env(safe-area-inset-bottom,5px)]"
      style={{ height: '50px' }}
    >
      <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full" style={{ backgroundColor: 'rgba(255,255,255,.06)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>

      <div
        className="flex-1 flex items-center h-[36px] rounded-[10px] px-[12px]"
        style={{ backgroundColor: 'rgba(255,255,255,.06)' }}
      >
        <span className="text-[15px] text-[rgba(255,255,255,.2)] tracking-[-.01em]" style={{ fontFamily: '"SF Pro Text", system-ui, sans-serif' }}>
          Pesan
        </span>
      </div>

      <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full" style={{ backgroundColor: 'rgba(255,255,255,.06)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        </svg>
      </div>
    </div>
  )
}
