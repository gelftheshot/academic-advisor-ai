import { CSSProperties } from 'react'
import { MdClose } from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

import { IconButton } from '../Buttons/IconButton'

interface SidebarHeaderProps {
  onClose(): void
  title?: string
  logo?: string
  reverse?: boolean
}

const header = tv({
  base: 'flex items-center justify-between gap-4 p-4 pb-0',
  variants: {
    reverse: {
      true: 'flex-row-reverse',
      false: ''
    }
  }
})

export function SidebarHeader({ onClose, title, logo, reverse = false }: SidebarHeaderProps) {
  const style: CSSProperties = { borderRadius: '0.25rem', opacity: 0.8 }

  return (
    <div className={header({ reverse })}>
      <Link href="/" className="flex items-center gap-3">
        {logo && <Image src={logo} alt="logo" width={35} height={35} style={style} />}
        <span className="text-dark dark:text-light font-serif text-2xl font-normal">{title}</span>
      </Link>
      <div className="h-full">
        <IconButton icon={MdClose} onClick={onClose} />
      </div>
    </div>
  )
}
