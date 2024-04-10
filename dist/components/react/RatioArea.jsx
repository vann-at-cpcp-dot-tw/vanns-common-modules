// import { twMerge } from 'tailwind-merge'
import { cn } from "../../lib/utils";
export default function RatioArea(props) {
    return (<div className={cn('ratioArea relative w-full', props === null || props === void 0 ? void 0 : props.className)}>
      <div className="fill pointer-events-none relative" style={{
            width: '100%',
            paddingBottom: "".concat(props.ratio, "%")
        }}></div>
      {props.children}
    </div>);
}
