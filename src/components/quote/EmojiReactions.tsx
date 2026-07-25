const emojis = ['👍', '❤️', '😂', '😮', '😢', '🙏']

function appleEmojiUrl(emoji: string): string {
  const codes = [...emoji].map(c => c.codePointAt(0)!.toString(16)).join('-')
  return `https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/${codes}.png`
}

interface Props {
  align?: 'left' | 'right'
}

export function EmojiReactions({ align = 'left' }: Props) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end pr-[8px]' : 'justify-start pl-[8px]'}`}>
      <div
        className="flex items-center gap-[12px] px-[18px] h-[64px] rounded-[32px] relative"
        style={{
          backgroundColor: 'rgba(36,36,38,.85)',
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0,0,0,.2)',
          border: '.5px solid rgba(255,255,255,.1)',
        }}
      >
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
        {emojis.map((emoji, i) => (
          <img
            key={i}
            src={appleEmojiUrl(emoji)}
            alt={emoji}
            className="relative select-none pointer-events-none"
            style={{ width: '34px', height: '34px' }}
          />
        ))}
      </div>
    </div>
  )
}
