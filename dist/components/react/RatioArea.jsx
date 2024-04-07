import { twMerge } from 'tailwind-merge';
function RatioArea(props) {
    return (<div className={twMerge('ratioArea relative w-full', props === null || props === void 0 ? void 0 : props.className)}>
      <div className="fill pointer-events-none relative" style={{
            width: '100%',
            paddingBottom: "".concat(props.ratio, "%")
        }}></div>
      {props.children}
    </div>);
}
export default RatioArea;
