// import { twMerge } from 'tailwind-merge'
import { cn } from "~/lib/utils"
interface TypeProps {
  ratio: number | string
  children: React.ReactNode
  className?: string
}

export default function RatioArea(props:TypeProps){
  return (
    <div className={cn('ratioArea relative w-full', props?.className)}>
      <div className="fill pointer-events-none relative"
      style={{
        width: '100%',
        paddingBottom: `${props.ratio}%`
      }}></div>
      { props.children }
    </div>
  )
}
