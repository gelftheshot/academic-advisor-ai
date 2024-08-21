import { CSSProperties } from 'react'

interface CloudsProps {
  bottom: string
}

export function Clouds({ bottom }: CloudsProps) {
  const style: CSSProperties = { bottom }

  return (
    <div className="absolute inset-x-0 h-full transition-[inset] duration-500" style={style}>
      <Cloud width="38.46%" height="83.33%" right="-19.23%" bottom="-4.16%" />
      <Cloud width="38.46%" height="83.33%" right="-15.38%" bottom="16.66%" color="#bfdbfe" />
      <Cloud width="38.46%" height="83.33%" right="-7.69%" bottom="-33.33%" />
      <Cloud width="38.46%" height="83.33%" right="0" bottom="-16.66%" color="#bfdbfe" />
      <Cloud width="28.85%" height="58.33%" right="19.23%" bottom="-33.33%" />
      <Cloud width="28.85%" height="62.5%" right="23.08%" bottom="-8.33%" color="#bfdbfe" />
      <Cloud width="25%" height="33.33%" right="38.46%" bottom="-16.66%" />
      <Cloud width="23.08%" height="41.66%" right="42.31%" bottom="0" color="#bfdbfe" />
      <Cloud width="28.85%" height="62.5%" right="53.85%" bottom="-41.66%" />
      <Cloud width="28.85%" height="62.5%" right="53.85%" bottom="-20.83%" color="#bfdbfe" />
      <Cloud width="28.85%" height="62.5%" right="67.31%" bottom="-50%" />
      <Cloud width="28.85%" height="62.5%" right="69.23%" bottom="-33.33%" color="#bfdbfe" />
      <Cloud width="15.38%" height="33.33%" right="86.54%" bottom="-20.83%" />
      <Cloud width="15.38%" height="33.33%" right="88.46%" bottom="-8.33%" color="#bfdbfe" />
    </div>
  )
}

interface CloudProps {
  width: string
  height: string
  right: string
  bottom: string
  color?: string
}

function Cloud({ width, height, right, bottom, color = 'white' }: CloudProps) {
  const style: CSSProperties = {
    width,
    height,
    right,
    bottom,
    backgroundColor: color,
    zIndex: color === 'white' ? 1 : 0
  }

  return <span className="absolute rounded-[50%]" style={style}></span>
}
