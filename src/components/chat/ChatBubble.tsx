interface Props {
  text: string
  type: 'sent' | 'received'
  time: string
  highlighted?: boolean
  senderLabel?: string
}

export function ChatBubble({ text, type, time, highlighted, senderLabel }: Props) {
  const isSent = type === 'sent'
  return (
    <div className={`max-w-[78%] ${isSent ? 'ml-auto pr-[8px]' : 'mr-auto pl-[8px]'} py-[2px]`}>
      {senderLabel && !isSent && (
        <div className="text-[12px] font-medium ml-[14px] mb-[2px]" style={{ color: 'rgba(255,255,255,.5)', fontFamily: '"SF Pro Text", system-ui, sans-serif' }}>{senderLabel}</div>
      )}
      <div
        className={`inline-block max-w-full text-left px-[14px] py-[8px] ${
          isSent
            ? 'bg-[#075E54] rounded-[20px] rounded-br-[4px]'
            : 'bg-[#1C1C1E] rounded-[20px] rounded-bl-[4px]'
        } ${highlighted ? 'scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.15)] ring-1 ring-white/[0.07]' : ''} transition-all`}
      >
        <p className="text-[15px] leading-[1.3] tracking-[-.01em] text-white break-words" style={{ fontFamily: '"SF Pro Text", system-ui, sans-serif' }}>
          {text}
        </p>
        <p className="text-[12px] mt-[2px] -mb-[1px]" style={{ color: 'rgba(142,142,147,0.65)' }}>
          {time}
        </p>
      </div>
    </div>
  )
}
