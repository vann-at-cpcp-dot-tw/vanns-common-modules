import { create } from 'zustand'

interface TypeStore {
  lightbox: string[]
  [key:string]: any
}

const defaultStore = {
  lightbox: []
}

export const createStore = (initStore:{[key:string]:any})=>{
  const useStore = create<TypeStore>((set, get)=>({
    ...defaultStore,
    ...(initStore || {}),
    set: (updateState={})=>{
      return set((state:TypeStore)=>{
        return {
          ...state,
          ...updateState
        }
      })
    },
    lightboxOpen: (actionId:string)=>{
      if( !actionId ){
        return null
      }
      return set((state:TypeStore)=>{
        return {
          lightbox: [...state.lightbox, actionId]
        }
      })
    },
    lightboxClose: (actionId:string)=>{
      if( !actionId ){
        return set((state:TypeStore)=>{
          return {
            lightbox: []
          }
        })
      }
      return set((state:TypeStore)=>{
        return {
          lightbox: state.lightbox?.filter((id:string)=>{
            return id !== actionId
          })
        }
      })
    }
  }))
  return {
    useStore
  }
}
