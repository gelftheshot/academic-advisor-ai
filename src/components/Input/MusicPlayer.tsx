'use client'

import { useRef, useState } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'

import { IconButton } from '../Buttons/IconButton'

interface MusicPlayerProps {
  src: string
  label?: string
}

export function MusicPlayer({ src, label }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {label && <p className="font-mono">{label}</p>}
      {isPlaying ? (
        <IconButton icon={MdPause} size={30} onClick={togglePlay} />
      ) : (
        <IconButton icon={MdPlayArrow} size={30} onClick={togglePlay} />
      )}
      <audio ref={audioRef} src={src} />
    </div>
  )
}
