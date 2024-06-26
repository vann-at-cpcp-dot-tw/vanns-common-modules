export const isEmpty = function( value:any ){
  return  value === undefined || value === null || ( typeof value === 'object' && Object.keys( value ).length === 0 ) || ( typeof value === 'string' && value.trim().length === 0 )

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
}

export const shareFb = function(url:string){
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url))
}

export const shareLine = function(url:string){
  window.open(`http://line.naver.jp/R/msg/text/?${url}`)
}

export const shareTwitter = function(url:string){
  window.open(`https://twitter.com/intent/tweet?url=${url}`)
}

export const shareLinkedin = function(url:string){
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
}

export const numberFormat = function(num:any, options:Intl.NumberFormatOptions & {locale?:string} = {}){

  if( typeof num !== 'number' ){
    console.error("numberFormat type error")
    return ''
  }

  if( isNaN(num) ){
    console.error('numberFormat passed NaN')
    return ''
  }

  const formatter = new Intl.NumberFormat(options?.locale || 'en-US', options)
  return formatter.format(num)
}

interface ISIUnit {
  value: number;
  symbol: string;
}

interface INumberWithKMBArgs {
  si?: ISIUnit[];
  formatterOptions?: Intl.NumberFormatOptions & {locale?:string}
}

export const numberWithKMB = function(num:any, args:INumberWithKMBArgs) {

  const si = args.si || [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'K' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    // 中文可複寫 si:
    //  { value: 1, symbol: '' },
    //  { value: 10000, symbol: '萬' },
    //  { value: 100000000, symbol: '億' },
  ]

  const formatterOptions = args.formatterOptions || {}
  const calcNum = num < 0 ? num * -1 : num;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (calcNum >= si[i].value) {
      break;
    }
  }

  if( typeof num !== 'number' ){
    console.error("numberWithKMB type error")
    return ''
  }

  if( isNaN(num) ){
    console.error('numberWithKMB passed NaN')
    return ''
  }

  return `${numberFormat(parseFloat(String(num / si[i].value)), formatterOptions)}${si[i].symbol}`
}


// 帶小數的四捨五入，第一參數：整數或浮點數，第二參數：小數位數
export const  roundDecimal = function(val:number, digits=0){
  return Math.round(Math.round(val * Math.pow(10, (digits || 0) + 1)) / 10) / Math.pow(10, (digits || 0))
}

// 取隨機數
export const rand = function(min:number, max:number){
  return Math.floor( Math.random() * (max - min + 1) ) + min
}

// 創建陣列(可調增幅)
export const arrayGenerate = function(start:number, end:number, step=1){
  return Array.from(Array.from(Array(Math.ceil((end+1-start)/step)).keys()), x=>start+ x*step)
}

// 打亂陣列
export const arrayShuffle = function(a:any[]){
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 產生一組不重複隨機數，需要打亂陣列和創建陣列
export const arrayRandom = function({min=0, max=2, length=2, step=1} = {min:0, max:2, length:2, step:1}){
  let array = arrayGenerate(min, max, step)
  arrayShuffle(array)
  return array.slice(0, length)
}

// array chunk
export const arrayChunk = function(myArray:any[], chunkSize:number){
  let index = 0
  let arrayLength = myArray.length
  let tempArray = []

  for (index = 0; index < arrayLength; index += chunkSize){
    let myChunk = myArray.slice(index, index + chunkSize)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }

  return tempArray
}

// 取得小數點位數
export const getDecimalPlace = function(num:number){
  const numStr = num.toString()
  const decimalIndex = numStr.indexOf('.')
  return decimalIndex !== -1 ? numStr.length - decimalIndex - 1 : 0
}

// 滾動到特定 el
export const scrollToSection = function({el, offset=0, jump=false}:any, callback?:Function){
  if (el){
    const targetRect = el.getBoundingClientRect()
    const targetTop = targetRect.top + window.pageYOffset
    const top = (targetTop - Number((document?.body?.style?.paddingTop?.split?.('px')?.[0] || 0)) + offset).toFixed()
    const onScroll = function(){
      if (window.pageYOffset.toFixed() === top){
        window.removeEventListener('scroll', onScroll)
        callback?.()
      }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
      top,
      behavior: jump === true ? undefined : 'smooth'
    })
  }
}

// 取得 el 在螢幕上的％數
export const getItemPositionInViewport = function({el, based='top'}:{el:HTMLElement, based?:string}){
  if (el) {
    switch (based) {
      case 'top':
        return Math.round(
          ((el.offsetTop - window.pageYOffset) * 100) / window.innerHeight
        )
        break

      case 'bottom':
        const elBottomPosition =
          el.offsetTop - el.offsetHeight - window.pageYOffset
        return Math.round(
          ((elBottomPosition - window.pageYOffset) * 100) /
            (window.innerHeight + el.offsetHeight)
        )
    }
  }
}

// 複製文字
export async function copyText(passedString:string){
  try {
    await navigator.clipboard.writeText(passedString)
  } catch (err){
    console.error('Failed to copy text: ', err)
  }
}

// 數字前面補 0
export const padLeft = function(n:number|string, width:number, z:string = '0'){
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n

  // how to use
  // pad(10, 4);      // 0010
  // pad(9, 4);       // 0009
  // pad(123, 4);     // 0123
  // pad(10, 4, '-'); // --10
}

// 計算「字元」長度
export const charBytes = function(str:string){
  return str.replace(/[^\x00-\xff]/g,'xx').length
}

// 計算字串在瀏覽器佔用的寬度（字串寬度受全域 css，如字級、字重...等設定影響）
export const strWidth = function(text='', fontCssProps = '1rem'){
  const dom = document.createElement('div')
  dom.textContent = text
  dom.style.position = 'absolute'
  dom.style.whiteSpace = 'nowrap'
  dom.style.visibility = 'hidden'
  dom.style.font = fontCssProps
  document.body.appendChild(dom)
  const width = dom.offsetWidth
  document.body.removeChild(dom)
  return width
}

// 字串轉駝峰（可指定大駝峰）
export const toCamelCase = function(str='', breakKey='-', upperCamelCase=false){
  const re = new RegExp(`${breakKey}(\\w)`, 'g')

  str = str.replace(re, function($0, $1){
    return $1.toUpperCase()
  })

  if( upperCamelCase ){
    str = `${str[0].toUpperCase()}${str.slice(1)}`
  }

  return str
}

// 指定 ratio 後，輸入寬或高其中之一，回傳另一側的值
export const calcSizeByRatio = function({w, h, ratio}:{w?:number|null|undefined, h?:number|null|undefined, ratio:number}) {
  // 輸入寬(或高) + 比例, return 符合比例的寬高值
  // 比例格式 =  Number((16/9).toFixed(2))
  if (typeof w !== 'number' && typeof h !== 'number' ) {
    throw new Error("At least one of width or height must be entered.")
  }

  if (typeof ratio !== 'number' || ratio <= 0) {
    throw new Error("The ratio must be a positive number.")
  }

  if( typeof w === 'number' && w > 0 ){
    return {
      w,
      h: Math.round(w / ratio)
    }
  }

  if( typeof h === 'number' && h > 0 ) {
    return {
      w: Math.round(h * ratio),
      h
    }
  }
}

// 取得 object-fit: contain 圖片的實際內容寬高
export const getContainedSize = function(img:HTMLImageElement){
  var ratio = img.naturalWidth/img.naturalHeight
  var width = img.height*ratio
  var height = img.height
  if (width > img.width) {
    width = img.width
    height = img.width/ratio
  }
  return [width, height]
}

// 將 youtube 網址轉成 embed 用的網址
export const convertYoutubeUrlToEmbed = function(input:string | undefined | null){
  if( typeof input !== 'string' ){
    return null
  }

  let youtubeID

  if (input.includes('https://youtu.be/')){
    youtubeID = input.replace('https://youtu.be/', '').split('?si')?.[0]
  } else if (input?.includes?.('https://www.youtube.com/watch?v=')){
    youtubeID = input.replace('https://www.youtube.com/watch?v=', '').split('&')[0]
  }

  if (youtubeID){
    return {
      youtubeID,
      cover: `https://img.youtube.com/vi/${youtubeID}/0.jpg`,
      embedURL: `https://www.youtube.com/embed/${youtubeID}`
    }
  }

  return null
}