import { CSSProperties } from 'react'

interface StarsProps {
  bottom: string
}

export function Stars({ bottom }: StarsProps) {
  const style: CSSProperties = { bottom }

  return (
    <div className="absolute inset-x-0 h-full transition-[inset] duration-500" style={style}>
      <Star width="6.15%" height="13.33%" left="50%" bottom="65%" />
      <Star width="3.08%" height="6.66%" left="48%" bottom="40%" />
      <Star width="3.69%" height="8%" left="40%" bottom="22%" />
      <Star width="2.46%" height="5.33%" left="37%" bottom="48%" />
      <Star width="2.46%" height="5.33%" left="41%" bottom="73%" />
      <Star width="2.46%" height="5.33%" left="20%" bottom="15%" />
      <Star width="2.77%" height="6%" left="20%" bottom="52%" />
      <Star width="5.54%" height="12%" left="18%" bottom="75%" />
      <Star width="2.46%" height="5.33%" left="11%" bottom="23%" />
      <Star width="2.46%" height="5.33%" left="15%" bottom="32%" />
      <Star width="3.08%" height="6.66%" left="10%" bottom="66%" />
    </div>
  )
}

interface StarProps {
  width: string
  height: string
  left: string
  bottom: string
}

function Star({ width, height, left, bottom }: StarProps) {
  const style: CSSProperties = { position: 'absolute', left, bottom }

  return (
    <div style={style}>
      <svg viewBox="0 0 122.88 122.88" width={width} height={height}>
        <path
          d="M62.43,122.88h-1.98c0-16.15-6.04-30.27-18.11-42.34C30.27,68.47,16.16,62.43,0,62.43v-1.98 c16.16,0,30.27-6.04,42.34-18.14C54.41,30.21,60.45,16.1,60.45,0h1.98c0,16.15,6.04,30.27,18.11,42.34 c12.07,12.07,26.18,18.11,42.34,18.11v1.98c-16.15,0-30.27,6.04-42.34,18.11C68.47,92.61,62.43,106.72,62.43,122.88L62.43,122.88z"
          fill="white"
        />
      </svg>
    </div>
  )
}
