'use client'

import ReactDOM from 'react-dom'

interface TypeProps {
  children: React.ReactNode
  dom: HTMLElement
}

export default function Portal(props:TypeProps){
  return ReactDOM.createPortal(
    props.children,
    props.dom
  )
}
