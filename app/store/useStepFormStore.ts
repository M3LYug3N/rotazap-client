// /features/auth/store/useStepFormStore.ts
import { create } from "zustand";

import { AuthRegisterForm } from "@/features/auth/types";

type StepFormState = {
  step: number;
  data: Partial<AuthRegisterForm>;
  setStep: (step: number) => void;
  setData: (newData: Partial<AuthRegisterForm>) => void;
  reset: () => void;
};

export const useStepFormStore = create<StepFormState>(set => ({
  step: 1,
  data: {},
  setStep: step => set({ step }),
  setData: newData => set(state => ({ data: { ...state.data, ...newData } })),
  reset: () => set({ step: 1, data: {} })
}));
