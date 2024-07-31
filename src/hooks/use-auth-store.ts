import { User } from "lucia";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};
export const useAuthStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "ecommerce-auth-store",
      partialize: (state) => ({
        ...state.user,
      }),
    },
  ),
);
