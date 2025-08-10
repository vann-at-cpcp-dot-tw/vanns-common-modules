import { twMerge } from 'tailwind-merge';
export default function RatioArea(props) {
    return (<div className={twMerge('ratioArea relative w-full', props?.className)}>
      <div className="fill pointer-events-none relative" style={{
            width: '100%',
            paddingBottom: `${props.ratio}%`
        }}></div>
      {props.children}
    </div>);
}
