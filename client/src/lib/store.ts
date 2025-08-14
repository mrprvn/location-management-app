import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  setToken: (token: string) => void;
}

const useStore = create<TokenStore>()(
  persist(
    devtools((set) => ({
      token: "",
      setToken: (token: string) => set({ token }),
    })),
    {
      name: "token-storage",
    }
  )
);

export default useStore;
