var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export function genImageBlurHash(url_1) {
    return __awaiter(this, arguments, void 0, function (url, w, q) {
        var base64str, blurSvg, toBase64;
        var _this = this;
        if (w === void 0) { w = 16; }
        if (q === void 0) { q = 75; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!url) {
                        return [2 /*return*/, ''];
                    }
                    if (!APP_URL) {
                        console.error('need NEXT_PUBLIC_APP_URL');
                        return [2 /*return*/, ''];
                    }
                    return [4 /*yield*/, fetch("".concat(APP_URL, "/_next/image?url=").concat(url, "&w=").concat(w, "&q=").concat(q)).then(function (res) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = Buffer).from;
                                    return [4 /*yield*/, res.arrayBuffer()];
                                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()]).toString('base64')];
                            }
                        }); }); })];
                case 1:
                    base64str = _a.sent();
                    blurSvg = "\n    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>\n      <filter id='b' color-interpolation-filters='sRGB'>\n        <feGaussianBlur stdDeviation='0.5' />\n      </filter>\n      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'\n      href='data:image/avif;base64,".concat(base64str, "' />\n    </svg>\n  ");
                    toBase64 = function (str) {
                        return typeof window === 'undefined'
                            ? Buffer.from(str).toString('base64')
                            : window.btoa(str);
                    };
                    return [2 /*return*/, "data:image/svg+xml;base64,".concat(toBase64(blurSvg))];
            }
        });
    });
}
