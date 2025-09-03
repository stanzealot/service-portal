import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
// interface AuthState {
//   isFirstLaunch: boolean;
//   setFirstLaunch: (value: boolean) => void;
// }

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isFirstLaunch: boolean;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
  setFirstLaunch: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isFirstLaunch: true,
      token: null,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isFirstLaunch: false,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      setFirstLaunch: (value) => set({ isFirstLaunch: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
