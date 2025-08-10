import { twMerge } from 'tailwind-merge';
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        className: {
            type: String,
            default: '',
        },
        class: {
            type: String,
            default: '',
        },
        ratio: {
            type: [Number, String],
            required: true,
        }
    },
    setup(props, { emit, slots }) {
        return () => <div className={twMerge('ratioArea relative w-full', props?.class || props?.className)}>
    <div className="fill pointer-events-none relative" style={{
                width: '100%',
                paddingBottom: `${props.ratio}%`
            }}></div>
    {slots?.default?.()}
  </div>;
    }
});
