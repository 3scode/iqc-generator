import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function PhoneFrame({ children }: Props) {
  return (
    <div className="relative w-[280px] min-h-[520px] rounded-[32px] overflow-hidden border-[3.5px] border-[#3A3A3C] bg-black shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[30px] rounded-b-[16px] z-30 bg-black">
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-[#1C1C1E] border-[2.5px] border-[#3A3A3C]" />
      </div>
      <div className="pt-[30px] flex flex-col min-h-[500px]">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-[6px]">
        <div className="w-[120px] h-[4px] rounded-full bg-white/40" />
      </div>
    </div>
  )
}
