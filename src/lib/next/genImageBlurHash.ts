const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export async function genImageBlurHash(url:string, w:number=16, q:number=75) {
  if( !url ){
    return ''
  }

  if( !APP_URL ){
    console.error('need NEXT_PUBLIC_APP_URL')
    return ''
  }

  const base64str = await fetch(
    `${APP_URL}/_next/image?url=${url}&w=${w}&q=${q}`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64')
  )

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='0.5' />
      </filter>
      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `

  const toBase64 = (str:string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`
}
