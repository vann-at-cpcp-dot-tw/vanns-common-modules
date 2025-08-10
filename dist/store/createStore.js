import { create } from 'zustand';
const defaultStore = {
    lightbox: []
};
export const createStore = (initStore) => {
    const useStore = create((set, get) => ({
        ...defaultStore,
        ...(initStore || {}),
        set: (updateState = {}) => {
            return set((state) => {
                return {
                    ...state,
                    ...updateState
                };
            });
        },
        lightboxOpen: (actionId) => {
            if (!actionId) {
                return null;
            }
            return set((state) => {
                return {
                    lightbox: [...state.lightbox, actionId]
                };
            });
        },
        lightboxClose: (actionId) => {
            if (!actionId) {
                return set((state) => {
                    return {
                        lightbox: []
                    };
                });
            }
            return set((state) => {
                return {
                    lightbox: state.lightbox?.filter((id) => {
                        return id !== actionId;
                    })
                };
            });
        }
    }));
    return {
        useStore
    };
};
