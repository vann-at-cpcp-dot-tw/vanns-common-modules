"use client"

import { useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Portal from '../react/Portal'
import { useStore } from '~/store'

interface TypeProps {
  id: string
  className?: string
  maxWidth?: string
  children?: React.ReactNode
}

function Lightbox(props:TypeProps){

  const store = useStore()
  const innerRef = useRef(null)
  const lightboxRef = useRef(null)

  useEffect(()=>{
    if (store.lightbox.length > 0) {
      document.body.classList.add('lb-open')
    }else{
      document.body.classList.remove('lb-open')
    }
  }, [store.lightbox])

  return <>
    {
      store.lightbox.includes(props.id) && <Portal dom={document.body}>
        <div data-el="lightbox"
        className={twMerge(`${store.lightbox[store.lightbox.length-1] === props.id ?'visible' :'invisible'}`, props?.className)}
        id={props?.id}
        ref={lightboxRef}>
          <div className="inner rounded-2xl" style={{maxWidth: props?.maxWidth}} ref={innerRef}>
            <div className="p-6 lg:p-10">{props?.children}</div>
          </div>
        </div>
      </Portal>
    }
  </>
}

export default Lightbox