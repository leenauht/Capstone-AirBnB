import { create } from "zustand";

const useValidationStore = create((set) => ({
  resetValidation: false,
  triggerReset: () => set({ resetValidation: true }),
  clearReset: () => set({ resetValidation: false }),
}));

export default useValidationStore;
