import { writable } from 'svelte/store'

function alertStore() {
  const { subscribe, set, update } = writable(0)

  return {
    subscribe,
    setAlert: (message, typesOfAlert) => set({ message, typesOfAlert }),
    resetAlert: () => set({ message: null, typesOfAlert: null })
  }
}

export const alerts = alertStore()
