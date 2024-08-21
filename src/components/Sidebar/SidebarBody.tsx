import { ReactNode } from 'react'

interface SidebarBodyProps {
  children: ReactNode
}

export function SidebarBody({ children }: SidebarBodyProps) {
  return (
    <div className="flex grow flex-col gap-3 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#6b6b6b4b]">
      {children}
    </div>
  )
}
