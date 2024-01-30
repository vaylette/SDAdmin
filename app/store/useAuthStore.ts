import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SmartUser } from '../types/types'

export type AuthStore = {
  authenticated: boolean;
  user: SmartUser | any;
  token: string | null;
  setAuthentication: (authenticated: boolean) => void;
  setUser: (user: SmartUser | null) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create(
    persist(
        (set, get): AuthStore => ({
            authenticated: false,
            user: null,
            token: null,
            setAuthentication: (val) => set({ authenticated: val }),
            setUser: (val) => set({ user: val }),
            setToken: (val) => set({ token: val}),
            logout: () => {
                set({
                    authenticated: false,
                    user: null,
                    token: null,
                })

                document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; secure;'
            }
        }),
        {
            name: 'auth'
        }
    )
)

export default useAuthStore
