import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: '',
      profile: { id: '', nombre: '', email: '', rolId: '' },
      logged: false,

      setToken: (token) => set({ token, logged: true }),

      setProfile: (profile) => set({ profile }),

      logout: () =>
        set({
          token: '',
          profile: { id: '', nombre: '', email: '', rolId: '' },
          logged: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
