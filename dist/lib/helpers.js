export var isEmpty = function (value) {
    return value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
    // // test results
    // //---------------
    // // []        true, empty array
    // // {}        true, empty object
    // // null      true
    // // undefined true
    // // ""        true, empty string
    // // ''        true, empty string
    // // 0         false, number
    // // true      false, boolean
    // // false     false, boolean
    // // Date      false
    // // function  false
    // if (value === undefined){
    //     return true
    // }
    // if (typeof (value) == 'function' || typeof (value) == 'number' || typeof (value) == 'boolean' || Object.prototype.toString.call(value) === '[object Date]'){
    //     return false
    // }
    // if (value == null || value.length === 0){
    //     return true
    // }
    // if (typeof (value) == "object") {
    //     // empty object
    //     var r = true
    //     for (var f in value){
    //         r = false
    //     }
    //     return r
    // }
    // return false
};
export var shareFb = function (url) {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
};
export var shareLine = function (url) {
    window.open("http://line.naver.jp/R/msg/text/?".concat(url));
};
export var shareTwitter = function (url) {
    window.open("https://twitter.com/intent/tweet?url=".concat(url));
};
export var shareLinkedin = function (url) {
    window.open("https://www.linkedin.com/sharing/share-offsite/?url=".concat(url));
};
export var numberFormat = function (num, options) {
    if (options === void 0) { options = {}; }
    if (typeof num !== 'number') {
        console.error("numberFormat type error");
        return '';
    }
    if (isNaN(num)) {
        console.error('numberFormat passed NaN');
        return '';
    }
    var formatter = new Intl.NumberFormat((options === null || options === void 0 ? void 0 : options.locale) || 'en-US', options);
    return formatter.format(num);
};
export var numberWithKMB = function (num, args) {
    var si = args.si || [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'K' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'B' },
        // 中文可複寫 si:
        //  { value: 1, symbol: '' },
        //  { value: 10000, symbol: '萬' },
        //  { value: 100000000, symbol: '億' },
    ];
    var formatterOptions = args.formatterOptions || {};
    var calcNum = num < 0 ? num * -1 : num;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (calcNum >= si[i].value) {
            break;
        }
    }
    if (typeof num !== 'number') {
        console.error("numberWithKMB type error");
        return '';
    }
    if (isNaN(num)) {
        console.error('numberWithKMB passed NaN');
        return '';
    }
    return "".concat(numberFormat(parseFloat(String(num / si[i].value)), formatterOptions)).concat(si[i].symbol);
};
// 帶小數的四捨五入，第一參數：整數或浮點數，第二參數：小數位數
export var roundDecimal = function (val, digits) {
    if (digits === void 0) { digits = 0; }
    return Math.round(Math.round(val * Math.pow(10, (digits || 0) + 1)) / 10) / Math.pow(10, (digits || 0));
};
// 取隨機數
export var rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// 創建陣列(可調增幅)
export var arrayGenerate = function (start, end, step) {
    if (step === void 0) { step = 1; }
    return Array.from(Array.from(Array(Math.ceil((end + 1 - start) / step)).keys()), function (x) { return start + x * step; });
};
// 打亂陣列
export var arrayShuffle = function (a) {
    var _a;
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
    }
    return a;
};
// 產生一組不重複隨機數，需要打亂陣列和創建陣列
export var arrayRandom = function (_a) {
    var _b = _a === void 0 ? { min: 0, max: 2, length: 2, step: 1 } : _a, _c = _b.min, min = _c === void 0 ? 0 : _c, _d = _b.max, max = _d === void 0 ? 2 : _d, _e = _b.length, length = _e === void 0 ? 2 : _e, _f = _b.step, step = _f === void 0 ? 1 : _f;
    var array = arrayGenerate(min, max, step);
    arrayShuffle(array);
    return array.slice(0, length);
};
// array chunk
export var arrayChunk = function (myArray, chunkSize) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunkSize) {
        var myChunk = myArray.slice(index, index + chunkSize);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }
    return tempArray;
};
// 取得小數點位數
export var getDecimalPlace = function (num) {
    var numStr = num.toString();
    var decimalIndex = numStr.indexOf('.');
    return decimalIndex !== -1 ? numStr.length - decimalIndex - 1 : 0;
};
// 滾動到特定 el
export var scrollToSection = function (_a) {
    var _b, _c, _d, _e, _f;
    var el = _a.el, _g = _a.speed, speed = _g === void 0 ? 800 : _g, _h = _a.offset, offset = _h === void 0 ? 0 : _h;
    if (el) {
        var targetRect = el.getBoundingClientRect();
        var targetTop = targetRect.top + window.pageYOffset;
        window.scrollTo({
            top: targetTop - Number((((_f = (_e = (_d = (_c = (_b = document === null || document === void 0 ? void 0 : document.body) === null || _b === void 0 ? void 0 : _b.style) === null || _c === void 0 ? void 0 : _c.paddingTop) === null || _d === void 0 ? void 0 : _d.split) === null || _e === void 0 ? void 0 : _e.call(_d, 'px')) === null || _f === void 0 ? void 0 : _f[0]) || 0)) + offset,
            behavior: 'smooth'
        });
    }
};
// 取得 el 在螢幕上的％數
export var getItemPositionInViewport = function (_a) {
    var el = _a.el, _b = _a.based, based = _b === void 0 ? 'top' : _b;
    if (el) {
        switch (based) {
            case 'top':
                return Math.round(((el.offsetTop - window.pageYOffset) * 100) / window.innerHeight);
                break;
            case 'bottom':
                var elBottomPosition = el.offsetTop - el.offsetHeight - window.pageYOffset;
                return Math.round(((elBottomPosition - window.pageYOffset) * 100) /
                    (window.innerHeight + el.offsetHeight));
        }
    }
};
// 補 0
export var padLeft = function (n, width, z) {
    if (z === void 0) { z = '0'; }
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    // how to use
    // pad(10, 4);      // 0010
    // pad(9, 4);       // 0009
    // pad(123, 4);     // 0123
    // pad(10, 4, '-'); // --10
};
export var charBytes = function (str) {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
};
export var strWidth = function (text, fontCssProps) {
    if (text === void 0) { text = ''; }
    if (fontCssProps === void 0) { fontCssProps = '1rem'; }
    var dom = document.createElement('div');
    dom.textContent = text;
    dom.style.position = 'absolute';
    dom.style.whiteSpace = 'nowrap';
    dom.style.visibility = 'hidden';
    dom.style.font = fontCssProps;
    document.body.appendChild(dom);
    var width = dom.offsetWidth;
    document.body.removeChild(dom);
    return width;
};
export var toCamelCase = function (str, breakKey, upperCamelCase) {
    if (str === void 0) { str = ''; }
    if (breakKey === void 0) { breakKey = '-'; }
    if (upperCamelCase === void 0) { upperCamelCase = false; }
    var re = new RegExp("".concat(breakKey, "(\\w)"), 'g');
    str = str.replace(re, function ($0, $1) {
        return $1.toUpperCase();
    });
    if (upperCamelCase) {
        str = "".concat(str[0].toUpperCase()).concat(str.slice(1));
    }
    return str;
};
export var calcSizeByRatio = function (_a) {
    var w = _a.w, h = _a.h, ratio = _a.ratio;
    // 輸入寬(或高) + 比例, return 符合比例的寬高值
    // 比例格式 =  Number((16/9).toFixed(2))
    if (typeof w !== 'number' && typeof h !== 'number') {
        throw new Error("At least one of width or height must be entered.");
    }
    if (typeof ratio !== 'number' || ratio <= 0) {
        throw new Error("The ratio must be a positive number.");
    }
    if (typeof w === 'number' && w > 0) {
        return {
            w: w,
            h: Math.round(w / ratio)
        };
    }
    if (typeof h === 'number' && h > 0) {
        return {
            w: Math.round(h * ratio),
            h: h
        };
    }
};
export var getContainedSize = function (img) {
    // 取得 object-fit: contain 圖片的實際內容寬高
    var ratio = img.naturalWidth / img.naturalHeight;
    var width = img.height * ratio;
    var height = img.height;
    if (width > img.width) {
        width = img.width;
        height = img.width / ratio;
    }
    return [width, height];
};
