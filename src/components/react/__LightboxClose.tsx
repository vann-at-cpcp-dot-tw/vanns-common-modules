"use client"

import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { useWindowSize } from '../../use/react/useWindowSize'
import { useStore } from '~/store'

interface TypeProps {
  id: string
  className?: string
  color?: string
}

function LightboxClose(props:TypeProps){

  const store = useStore()
  const viewport = useWindowSize()

  useEffect(()=>{
    function lightboxClickHandler(e:MouseEvent){
      const target = e.target as HTMLElement
      const targetId = target.id
      if( target.dataset.el === 'lightbox' ){
        store.lightboxClose(targetId)
      }
    }

    document.body.addEventListener('click', lightboxClickHandler)

    return function(){
      document.body.removeEventListener('click', lightboxClickHandler)
    }
  }, [])

  return <div className={twMerge('close flex justify-end', props?.className)}>
    <div className="btn flex size-10 items-center justify-center"
    onClick={()=>{
      store.lightboxClose(props.id)
    }}
    style={{
      marginRight: viewport.width && viewport.width >= 992 ?'-20px' :'-10px',
      marginTop: viewport.width && viewport.width >= 992 ?'-20px' :'-10px',
    }}>
      <i className="bi bi-x-lg text-[28px] font-900 leading-none text-secondary lg:text-[32px]"
      style={{
        color: props.color,
      }}></i>
    </div>
  </div>
}

export default LightboxClose