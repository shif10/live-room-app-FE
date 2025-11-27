import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  setAuth: (u: User, t: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAdmin: user.role === "ADMIN",
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAdmin: false,
        }),
    }),
    { name: "auth-storage" }
  )
);