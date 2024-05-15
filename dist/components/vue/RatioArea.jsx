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
    setup: function (props, _a) {
        var emit = _a.emit, slots = _a.slots;
        return function () {
            var _a;
            return <div className={twMerge('ratioArea relative w-full', (props === null || props === void 0 ? void 0 : props.class) || (props === null || props === void 0 ? void 0 : props.className))}>
    <div className="fill pointer-events-none relative" style={{
                    width: '100%',
                    paddingBottom: "".concat(props.ratio, "%")
                }}></div>
    {(_a = slots === null || slots === void 0 ? void 0 : slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)}
  </div>;
        };
    }
});
