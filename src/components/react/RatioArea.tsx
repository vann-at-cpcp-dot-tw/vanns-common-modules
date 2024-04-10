import { twMerge } from 'tailwind-merge'
interface TypeProps {
  ratio: number | string
  children: React.ReactNode
  className?: string
}

export default function RatioArea(props:TypeProps){
  return (
    <div className={twMerge('ratioArea relative w-full', props?.className)}>
      <div className="fill pointer-events-none relative"
      style={{
        width: '100%',
        paddingBottom: `${props.ratio}%`
      }}></div>
      { props.children }
    </div>
  )
}
