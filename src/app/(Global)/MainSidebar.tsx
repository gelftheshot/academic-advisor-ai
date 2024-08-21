'use client'

import { AiOutlineUser } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'
import { RiFilePaper2Line } from 'react-icons/ri'

import { Sidebar } from '@/components/Sidebar'
import { create } from 'zustand'

interface SidebarState {
  isOpen: boolean
  open(): void
  close(): void
}

export const useMainSidebar = create<SidebarState>(set => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false }))
}))

export function MainSidebar() {
  const { isOpen, close } = useMainSidebar()

  return (
    <Sidebar open={isOpen} onClose={close} title="Start Next App" logo="/favicon.ico">
      <Sidebar.Body>
        <Sidebar.Route title="Home" path="/" icon={IoHomeOutline} exact />
        <Sidebar.Route title="Components" path="/components" icon={RiFilePaper2Line} />
        <Sidebar.Route title="Users" path="/users" icon={AiOutlineUser} />
      </Sidebar.Body>
    </Sidebar>
  )
}
