import { create } from 'zustand';

interface AuthFormState {
  signIn: Record<string, any>;
  signUp: Record<string, any>;
  setPassword: Record<string, any>;
  completeSignup: Record<string, any>;
  setSignIn: (values: Record<string, any>) => void;
  setSignUp: (values: Record<string, any>) => void;
  setSetPassword: (values: Record<string, any>) => void;
  setCompleteSignup: (values: Record<string, any>) => void;
  resetSignIn: () => void;
  resetSignUp: () => void;
  resetSetPassword: () => void;
  resetCompleteSignup: () => void;
  resetAll: () => void;
}

export const useAuthFormStore = create<AuthFormState>((set) => ({
  signIn: {},
  signUp: {},
  setPassword: {},
  completeSignup: {},
  setSignIn: (values) => set((state) => ({ signIn: { ...state.signIn, ...values } })),
  setSignUp: (values) => set((state) => ({ signUp: { ...state.signUp, ...values } })),
  setSetPassword: (values) => set((state) => ({ setPassword: { ...state.setPassword, ...values } })),
  setCompleteSignup: (values) => set((state) => ({ completeSignup: { ...state.completeSignup, ...values } })),
  resetSignIn: () => set({ signIn: {} }),
  resetSignUp: () => set({ signUp: {} }),
  resetSetPassword: () => set({ setPassword: {} }),
  resetCompleteSignup: () => set({ completeSignup: {} }),
  resetAll: () => set({ signIn: {}, signUp: {}, setPassword: {}, completeSignup: {} }),
}));
