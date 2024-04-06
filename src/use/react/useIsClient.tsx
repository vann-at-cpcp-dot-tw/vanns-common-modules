import { useWindowSize } from "~/use/react"
import { useEffect, useState } from "react"

export function useIsClient(){
  const viewport = useWindowSize()
  const [isClient, setIsClient] = useState(false)

  useEffect(()=>{
    if( viewport.width && viewport.width > 0){
      setIsClient(true)
    }
  }, [viewport.width])

  return isClient
}