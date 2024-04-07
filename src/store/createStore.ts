import { create } from 'zustand'

export interface IStore {
  [key:string]: any
}

const defaultStore = {
  lightbox: []
}

export const createStore = (initStore:IStore)=>{

  const useStore = create<IStore>((set, get)=>({
    ...defaultStore,
    ...(initStore || {}),
    set: (updateState={})=>{
      return set((state:IStore)=>{
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
      return set((state:IStore)=>{
        return {
          lightbox: [...state.lightbox, actionId]
        }
      })
    },
    lightboxClose: (actionId:string)=>{
      if( !actionId ){
        return set((state:IStore)=>{
          return {
            lightbox: []
          }
        })
      }
      return set((state:IStore)=>{
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
