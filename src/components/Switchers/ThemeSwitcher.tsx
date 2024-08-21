'use client'

import { useRef, useState } from 'react'
import { BiSun } from 'react-icons/bi'
import { LuMoonStar } from 'react-icons/lu'
import { TbDeviceDesktop } from 'react-icons/tb'

import { useClickOutsideDocument } from '@/hooks/useClickOutsideDocument'
import { Theme, useTheme } from '@/hooks/useTheme'
import { tv } from 'tailwind-variants'

const themes = [
  {
    theme: 'light',
    text: 'Light',
    Icon: BiSun
  },
  {
    theme: 'dark',
    text: 'Dark',
    Icon: LuMoonStar
  },
  {
    theme: 'system',
    text: 'System',
    Icon: TbDeviceDesktop
  }
]

const selectIcon = tv({
  base: 'text-slate-400 dark:text-slate-500 cursor-pointer',
  variants: {
    theme: {
      light: 'text-sky-500 dark:text-sky-500',
      dark: 'text-sky-500 dark:text-sky-500',
      system: ''
    },
    isSystem: {
      true: 'text-slate-400 dark:text-slate-500'
    }
  }
})

const selectBox = tv({
  base: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-600/5 dark:hover:bg-slate-600/30',
  variants: {
    selected: {
      true: 'text-sky-500'
    }
  }
})

export function ThemeSwitcher() {
  const { theme, isSystem, setTheme } = useTheme()
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const ThemeIcon = theme === 'light' ? BiSun : LuMoonStar

  useClickOutsideDocument({ ref: selectRef, onClickOutside: () => setSelectOpen(false) })

  function toggleSelect() {
    setSelectOpen(prev => !prev)
  }

  function selectTheme(theme: Theme) {
    setTheme(theme)
    setSelectOpen(false)
  }

  return (
    <div ref={selectRef} className="relative">
      <ThemeIcon size={24} className={selectIcon({ theme, isSystem })} onClick={toggleSelect} />
      {selectOpen && (
        <div className="absolute right-0 top-full z-10 mt-8 w-36 select-none overflow-hidden rounded-lg bg-slate-100 py-1 text-sm font-semibold text-slate-700 shadow-lg dark:bg-gray-800 dark:text-slate-300">
          {themes.map(({ theme: t, text, Icon }) => (
            <div
              className={selectBox({ selected: isSystem ? t === 'system' : t === theme })}
              onClick={() => selectTheme(t as Theme)}
              key={text}
            >
              <Icon size={24} className="mr-2" />
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
