import create from 'zustand'

export const authStore = create((set) => ({
  user: null,
  storeStatus: false,
  setUser: (payload) => set((state) => ({ user: payload })),
  setStoreStatus: (payload) => set((state) => ({ storeStatus: payload })),
}))
