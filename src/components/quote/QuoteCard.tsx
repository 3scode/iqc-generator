import { StatusBar } from '../chat/StatusBar'
import { ChatBubble } from '../chat/ChatBubble'
import { EmojiReactions } from './EmojiReactions'
import { ContextMenu } from './ContextMenu'
import { MessageInput } from '../chat/MessageInput'
import type { LayoutRatio, BgType } from '../../types'
import { getLayoutSize } from '../../utils/canvas'

interface BackgroundMessage {
  text: string
  sender: 'sent' | 'received'
}

interface Props {
  messages: { id: string; text: string; sender: 'you' | 'other' }[]
  senderName: string
  time: string
  battery: number
  carrier?: string
  quoteMessageId: string | null
  bgType: BgType
  bgColor: string
  bgGradientEnd: string
  bgImage: string | null
  layout: LayoutRatio
  showWifi?: boolean
  airplaneMode?: boolean
  showContact?: boolean
  contactAvatar?: string | null
  headerColor?: string
  chatMode?: 'personal' | 'group'
  groupName?: string
  groupAvatar?: string | null
  memberCount?: number
  showSenderName?: boolean
  isMuted?: boolean
  isVerified?: boolean
}

const bgMessages: BackgroundMessage[] = [
  { text: 'Gimana kabarnya?', sender: 'received' },
  { text: 'Baik banget nih', sender: 'sent' },
  { text: 'Syukurlah 😊', sender: 'received' },
  { text: 'Udah makan?', sender: 'received' },
  { text: 'Belom, sibuk', sender: 'sent' },
  { text: 'Yaudah', sender: 'received' },
  { text: 'Nanti aku telpon ya', sender: 'sent' },
  { text: 'Oke siap', sender: 'received' },
  { text: 'Eh iya, aku liat story kamu', sender: 'received' },
  { text: 'Haha iya kemarin', sender: 'sent' },
  { text: 'Keren sih tempatnya', sender: 'received' },
  { text: 'Makasih 😁', sender: 'sent' },
  { text: 'Besok jadi?', sender: 'received' },
  { text: 'Jadi dong, jam 2 ya', sender: 'sent' },
  { text: 'Siap, aku jemput', sender: 'received' },
  { text: 'Oke ditunggu', sender: 'sent' },
  { text: 'Oh iya, jangan lupa bawa', sender: 'received' },
  { text: 'Siap boss', sender: 'sent' },
  { text: 'Udah dulu ya, mandi dulu', sender: 'sent' },
  { text: 'Yoi', sender: 'received' },
  { text: 'Lagi dimana?', sender: 'received' },
  { text: 'Dirumah aja', sender: 'sent' },
  { text: 'Mau mampir?', sender: 'received' },
  { text: 'Boleh, nanti sore', sender: 'sent' },
  { text: 'Oke kabarin ya', sender: 'received' },
  { text: 'Siap 🫡', sender: 'sent' },
  { text: 'Oh iya tugas udah?', sender: 'received' },
  { text: 'Udah kemarin', sender: 'sent' },
  { text: 'Aku baru setengah', sender: 'received' },
  { text: 'Cepet dong', sender: 'sent' },
  { text: 'Iya iya', sender: 'received' },
]

const bgNames = ['Rina', 'Dita', 'Budi', 'Sari', 'Adi', 'Rizky', 'Maya', 'Doni']

export function QuoteCard(props: Props) {
  const {
    messages,
    time,
    battery,
    carrier,
    quoteMessageId,
    bgType,
    bgColor,
    bgGradientEnd,
    bgImage,
    layout,
    senderName,
    showWifi,
    airplaneMode,
    showContact = true,
    contactAvatar,
    chatMode = 'personal',
    groupName = 'Grup',
    groupAvatar,
    memberCount = 0,
    showSenderName = false,
    isMuted = false,
    isVerified = false,
  } = props
  const size = getLayoutSize(layout)

  const bgStyle = bgImage
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
      }
    : bgType === 'gradient'
      ? { background: `linear-gradient(135deg, ${bgColor}, ${bgGradientEnd})` }
      : { backgroundColor: bgColor }

  const quoteMsg = messages.find((m) => m.id === quoteMessageId)

  return (
    <div
      style={{ ...bgStyle, width: size.width, height: size.height }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col justify-start gap-[2px] px-4 pt-[54px]">
        {(() => { let ri = 0; return bgMessages.map((m, i) => {
          const label = showSenderName && m.sender === 'received' ? bgNames[ri++ % bgNames.length] : undefined
          return <ChatBubble key={i} text={m.text} type={m.sender} time={time} senderLabel={label} />
        })})()}
      </div>

      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          backgroundColor: 'rgba(0,0,0,.375)',
        }}
      />

      <div className="relative z-10">
        <StatusBar time={time} battery={battery} dark carrier={carrier ?? 'Axis'} showWifi={showWifi} airplaneMode={airplaneMode} />
      </div>

      {showContact && chatMode === 'personal' && (
      <div className="relative z-10 flex items-center gap-2 px-4 py-[14px]" style={{ backgroundColor: 'rgba(0,0,0,.06)', backdropFilter: 'blur(18px) saturate(180%)', WebkitBackdropFilter: 'blur(18px) saturate(180%)' }}>
        <svg width="22" height="22" viewBox="0 0 33.5 62.7" fill="white"><g transform="scale(1,-1) translate(0,-62.734375)"><path d="M 3.544921875,31.3671875 Q 3.544921875,31.83984375 3.716796875,32.2265625 Q 3.888671875,32.61328125 4.232421875,32.935546875 L 26.318359375,54.18359375 Q 26.94140625,54.806640625 27.84375,54.806640625 Q 28.4453125,54.806640625 28.9287109375,54.52734375 Q 29.412109375,54.248046875 29.7021484375,53.7646484375 Q 29.9921875,53.28125 29.9921875,52.6796875 Q 29.9921875,51.8203125 29.369140625,51.17578125 L 8.787109375,31.3671875 L 29.369140625,11.580078125 Q 29.9921875,10.935546875 29.9921875,10.076171875 Q 29.9921875,9.453125 29.7021484375,8.9697265625 Q 29.412109375,8.486328125 28.9287109375,8.20703125 Q 28.4453125,7.927734375 27.84375,7.927734375 Q 26.94140625,7.927734375 26.318359375,8.55078125 L 4.232421875,29.798828125 Q 3.888671875,30.12109375 3.716796875,30.5185546875 Q 3.544921875,30.916015625 3.544921875,31.3671875 Z" /></g></svg>
        <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden text-white font-bold text-sm" style={{ backgroundColor: '#3A3A3C' }}>
          {contactAvatar ? (
            <img src={contactAvatar} alt="" className="w-full h-full object-cover" />
          ) : (
            senderName.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[18px] font-semibold leading-tight truncate" style={{ fontFamily: '"SF Pro Display", system-ui, sans-serif' }}>{senderName}</div>
          <div className="text-[13px] leading-tight" style={{ color: '#8E8E93', fontFamily: '"SF Pro Text", system-ui, sans-serif' }}>Online</div>
        </div>
        <svg width="22" height="22" viewBox="0 0 84.3 58.8" fill="white"><g transform="scale(1,-1) translate(0,-58.78125)"><path d="M 17.208984375,6.939453125 Q 12.9765625,6.939453125 10.6240234375,9.2490234375 Q 8.271484375,11.55859375 8.271484375,15.76953125 L 8.271484375,43.033203125 Q 8.271484375,47.244140625 10.69921875,49.54296875 Q 13.126953125,51.841796875 17.208984375,51.841796875 L 47.48046875,51.841796875 Q 51.712890625,51.841796875 53.9580078125,49.54296875 Q 56.203125,47.244140625 56.203125,43.033203125 L 56.203125,15.76953125 Q 56.203125,11.55859375 53.8505859375,9.2490234375 Q 51.498046875,6.939453125 47.265625,6.939453125 Z M 59.619140625,21.2265625 L 59.619140625,37.59765625 L 69.673828125,46.10546875 Q 70.404296875,46.728515625 71.1669921875,47.0830078125 Q 71.9296875,47.4375 72.703125,47.4375 Q 74.20703125,47.4375 75.130859375,46.4384765625 Q 76.0546875,45.439453125 76.0546875,43.78515625 L 76.0546875,15.017578125 Q 76.0546875,13.36328125 75.130859375,12.353515625 Q 74.20703125,11.34375 72.703125,11.34375 Q 71.9296875,11.34375 71.1669921875,11.708984375 Q 70.404296875,12.07421875 69.673828125,12.67578125 Z" /></g></svg>
        <svg width="22" height="22" viewBox="0 0 63.85 71.4" fill="white"><g transform="scale(1,-1) translate(0,-71.4140625)"><path d="M 20.388671875,24.341796875 Q 16.392578125,28.359375 13.212890625,32.720703125 Q 10.033203125,37.08203125 8.1962890625,41.4111328125 Q 6.359375,45.740234375 6.359375,49.650390625 Q 6.359375,52.228515625 7.2509765625,54.4736328125 Q 8.142578125,56.71875 9.861328125,58.373046875 Q 11.04296875,59.51171875 12.5791015625,60.4140625 Q 14.115234375,61.31640625 15.490234375,61.31640625 Q 16.607421875,61.31640625 17.4560546875,60.521484375 Q 18.3046875,59.7265625 19.271484375,58.3515625 L 23.869140625,51.90625 Q 24.642578125,50.83203125 24.9541015625,49.951171875 Q 25.265625,49.0703125 25.265625,48.25390625 Q 25.265625,47.544921875 25.0830078125,46.9541015625 Q 24.900390625,46.36328125 24.36328125,45.4609375 L 21.78515625,41.056640625 Q 21.634765625,40.755859375 21.505859375,40.5087890625 Q 21.376953125,40.26171875 21.376953125,40.00390625 Q 21.376953125,39.681640625 21.4736328125,39.380859375 Q 21.5703125,39.080078125 21.677734375,38.865234375 Q 23.33203125,35.53515625 27.349609375,31.517578125 Q 29.3046875,29.5625 31.3564453125,27.97265625 Q 33.408203125,26.3828125 34.998046875,25.630859375 Q 35.384765625,25.48046875 35.685546875,25.39453125 Q 35.986328125,25.30859375 36.373046875,25.30859375 Q 36.65234375,25.30859375 36.888671875,25.373046875 Q 37.125,25.4375 37.51171875,25.630859375 L 41.89453125,28.05859375 Q 42.947265625,28.638671875 43.591796875,28.810546875 Q 44.236328125,28.982421875 44.880859375,28.982421875 Q 45.611328125,28.982421875 46.3203125,28.724609375 Q 47.029296875,28.466796875 48.275390625,27.5859375 L 54.978515625,22.794921875 Q 56.33203125,21.849609375 56.912109375,21.01171875 Q 57.4921875,20.173828125 57.4921875,19.29296875 Q 57.4921875,18.17578125 56.9013671875,16.88671875 Q 56.310546875,15.59765625 54.806640625,13.900390625 Q 53.23828125,12.16015625 50.939453125,11.12890625 Q 48.640625,10.09765625 45.890625,10.09765625 Q 42.990234375,10.09765625 39.7783203125,11.1826171875 Q 36.56640625,12.267578125 33.2578125,14.201171875 Q 29.94921875,16.134765625 26.68359375,18.7236328125 Q 23.41796875,21.3125 20.388671875,24.341796875 Z" /></g></svg>
      </div>
      )}

      {chatMode === 'group' && (
      <div className="relative z-10 flex items-center gap-2 px-4 py-[14px]" style={{ backgroundColor: 'rgba(0,0,0,.06)', backdropFilter: 'blur(18px) saturate(180%)', WebkitBackdropFilter: 'blur(18px) saturate(180%)' }}>
        <svg width="22" height="22" viewBox="0 0 33.5 62.7" fill="white"><g transform="scale(1,-1) translate(0,-62.734375)"><path d="M 3.544921875,31.3671875 Q 3.544921875,31.83984375 3.716796875,32.2265625 Q 3.888671875,32.61328125 4.232421875,32.935546875 L 26.318359375,54.18359375 Q 26.94140625,54.806640625 27.84375,54.806640625 Q 28.4453125,54.806640625 28.9287109375,54.52734375 Q 29.412109375,54.248046875 29.7021484375,53.7646484375 Q 29.9921875,53.28125 29.9921875,52.6796875 Q 29.9921875,51.8203125 29.369140625,51.17578125 L 8.787109375,31.3671875 L 29.369140625,11.580078125 Q 29.9921875,10.935546875 29.9921875,10.076171875 Q 29.9921875,9.453125 29.7021484375,8.9697265625 Q 29.412109375,8.486328125 28.9287109375,8.20703125 Q 28.4453125,7.927734375 27.84375,7.927734375 Q 26.94140625,7.927734375 26.318359375,8.55078125 L 4.232421875,29.798828125 Q 3.888671875,30.12109375 3.716796875,30.5185546875 Q 3.544921875,30.916015625 3.544921875,31.3671875 Z" /></g></svg>
        <div className="relative w-8 h-8 shrink-0">
          <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden text-white font-bold text-xs" style={{ backgroundColor: '#3A3A3C' }}>
            {groupAvatar ? (
              <img src={groupAvatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            )}
          </div>
          {isVerified && (
            <svg className="absolute -bottom-0.5 -right-0.5" width="12" height="12" viewBox="0 0 24 24" fill="#007AFF"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="text-white text-[18px] font-semibold leading-tight truncate" style={{ fontFamily: '"SF Pro Display", system-ui, sans-serif' }}>{groupName}</div>
            {isMuted && <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.4)"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>}
          </div>
          <div className="text-[13px] leading-tight" style={{ color: '#8E8E93', fontFamily: '"SF Pro Text", system-ui, sans-serif' }}>{memberCount} peserta{isVerified ? ' · Terverifikasi' : ''}</div>
        </div>
        <svg width="22" height="22" viewBox="0 0 84.3 58.8" fill="white"><g transform="scale(1,-1) translate(0,-58.78125)"><path d="M 17.208984375,6.939453125 Q 12.9765625,6.939453125 10.6240234375,9.2490234375 Q 8.271484375,11.55859375 8.271484375,15.76953125 L 8.271484375,43.033203125 Q 8.271484375,47.244140625 10.69921875,49.54296875 Q 13.126953125,51.841796875 17.208984375,51.841796875 L 47.48046875,51.841796875 Q 51.712890625,51.841796875 53.9580078125,49.54296875 Q 56.203125,47.244140625 56.203125,43.033203125 L 56.203125,15.76953125 Q 56.203125,11.55859375 53.8505859375,9.2490234375 Q 51.498046875,6.939453125 47.265625,6.939453125 Z M 59.619140625,21.2265625 L 59.619140625,37.59765625 L 69.673828125,46.10546875 Q 70.404296875,46.728515625 71.1669921875,47.0830078125 Q 71.9296875,47.4375 72.703125,47.4375 Q 74.20703125,47.4375 75.130859375,46.4384765625 Q 76.0546875,45.439453125 76.0546875,43.78515625 L 76.0546875,15.017578125 Q 76.0546875,13.36328125 75.130859375,12.353515625 Q 74.20703125,11.34375 72.703125,11.34375 Q 71.9296875,11.34375 71.1669921875,11.708984375 Q 70.404296875,12.07421875 69.673828125,12.67578125 Z" /></g></svg>
        <svg width="22" height="22" viewBox="0 0 63.85 71.4" fill="white"><g transform="scale(1,-1) translate(0,-71.4140625)"><path d="M 20.388671875,24.341796875 Q 16.392578125,28.359375 13.212890625,32.720703125 Q 10.033203125,37.08203125 8.1962890625,41.4111328125 Q 6.359375,45.740234375 6.359375,49.650390625 Q 6.359375,52.228515625 7.2509765625,54.4736328125 Q 8.142578125,56.71875 9.861328125,58.373046875 Q 11.04296875,59.51171875 12.5791015625,60.4140625 Q 14.115234375,61.31640625 15.490234375,61.31640625 Q 16.607421875,61.31640625 17.4560546875,60.521484375 Q 18.3046875,59.7265625 19.271484375,58.3515625 L 23.869140625,51.90625 Q 24.642578125,50.83203125 24.9541015625,49.951171875 Q 25.265625,49.0703125 25.265625,48.25390625 Q 25.265625,47.544921875 25.0830078125,46.9541015625 Q 24.900390625,46.36328125 24.36328125,45.4609375 L 21.78515625,41.056640625 Q 21.634765625,40.755859375 21.505859375,40.5087890625 Q 21.376953125,40.26171875 21.376953125,40.00390625 Q 21.376953125,39.681640625 21.4736328125,39.380859375 Q 21.5703125,39.080078125 21.677734375,38.865234375 Q 23.33203125,35.53515625 27.349609375,31.517578125 Q 29.3046875,29.5625 31.3564453125,27.97265625 Q 33.408203125,26.3828125 34.998046875,25.630859375 Q 35.384765625,25.48046875 35.685546875,25.39453125 Q 35.986328125,25.30859375 36.373046875,25.30859375 Q 36.65234375,25.30859375 36.888671875,25.373046875 Q 37.125,25.4375 37.51171875,25.630859375 L 41.89453125,28.05859375 Q 42.947265625,28.638671875 43.591796875,28.810546875 Q 44.236328125,28.982421875 44.880859375,28.982421875 Q 45.611328125,28.982421875 46.3203125,28.724609375 Q 47.029296875,28.466796875 48.275390625,27.5859375 L 54.978515625,22.794921875 Q 56.33203125,21.849609375 56.912109375,21.01171875 Q 57.4921875,20.173828125 57.4921875,19.29296875 Q 57.4921875,18.17578125 56.9013671875,16.88671875 Q 56.310546875,15.59765625 54.806640625,13.900390625 Q 53.23828125,12.16015625 50.939453125,11.12890625 Q 48.640625,10.09765625 45.890625,10.09765625 Q 42.990234375,10.09765625 39.7783203125,11.1826171875 Q 36.56640625,12.267578125 33.2578125,14.201171875 Q 29.94921875,16.134765625 26.68359375,18.7236328125 Q 23.41796875,21.3125 20.388671875,24.341796875 Z" /></g></svg>
      </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          backgroundColor: 'rgba(0,0,0,.18)',
          borderTop: '0.5px solid rgba(255,255,255,.06)',
        }}
      >
        <MessageInput />
      </div>

      {quoteMsg && (
        <div className="absolute inset-0 flex flex-col justify-center gap-[6px]" style={{ zIndex: 20 }}>
          <EmojiReactions align={quoteMsg.sender === 'you' ? 'right' : 'left'} />
          <ChatBubble text={quoteMsg.text} type={quoteMsg.sender === 'you' ? 'sent' : 'received'} time={time} highlighted senderLabel={showSenderName && quoteMsg.sender !== 'you' ? (quoteMsg as any).senderName || senderName : undefined} />
          <div className="animate-spring-in"><ContextMenu align={quoteMsg.sender === 'you' ? 'right' : 'left'} /></div>
        </div>
      )}

      {!quoteMsg && messages.length > 0 && (
        <div className="absolute inset-0 flex flex-col justify-start gap-[2px] px-4 pt-[120px]" style={{ zIndex: 20 }}>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} text={msg.text || '...'} type={msg.sender === 'you' ? 'sent' : 'received'} time={time} senderLabel={showSenderName && msg.sender !== 'you' ? (msg as any).senderName || senderName : undefined} />
          ))}
        </div>
      )}

      {!quoteMsg && messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 20 }}>
          <p className="text-white/20 text-xs font-mono">Tambah pesan untuk memulai</p>
        </div>
      )}
    </div>
  )
}
