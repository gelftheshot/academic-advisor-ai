import { IconType } from 'react-icons/lib'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

export interface SidebarRouteProps {
  icon: IconType
  title: string
  path: string
  exact?: boolean
}

const sidebarRoute = tv({
  base: 'flex items-center gap-4 rounded-lg p-4 text-lg',
  variants: {
    selected: {
      true: 'bg-dark/20 hover:bg-dark/25 active:bg-dark/30 dark:bg-light/20 dark:hover:bg-light/25 dark:active:bg-light/30',
      false: 'hover:bg-dark/10 active:bg-dark/20 dark:hover:bg-light/10 dark:active:bg-light/20'
    }
  },
  defaultVariants: {
    selected: false
  }
})

export function SidebarRoute({ icon: Icon, title, path, exact }: SidebarRouteProps) {
  const pathname = usePathname()
  const selected = exact ? pathname === path : pathname?.startsWith(path)

  return (
    <Link href={path} className={sidebarRoute({ selected })}>
      <Icon size={24} />
      {title}
    </Link>
  )
}
