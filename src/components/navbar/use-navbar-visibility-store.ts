import { create } from "zustand";
interface UseNavbarVisibilityStore {
  visible: boolean;
  setVisibility: (visible: boolean) => void;
}
export const useNavbarVisibilityStore = create<UseNavbarVisibilityStore>(
  (set) => ({
    visible: false,
    setVisibility: (visible) => set({ visible }),
  }),
);
