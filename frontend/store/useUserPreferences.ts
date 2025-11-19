import { create } from "zustand";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

interface PreferenceState {
  stylePref: string;
  colors: string[];
  goal: string;
  fit: string;
  inspiration: string;
  user: GoogleUser | null;
}

interface PreferenceActions {
  setUser: (user: GoogleUser) => void;
  setPreferences: (data: Partial<PreferenceState>) => void;
}

type UserPreferences = PreferenceState & PreferenceActions;

export const useUserPreferences = create<UserPreferences>((set) => ({
  stylePref: "",
  colors: [],
  goal: "",
  fit: "",
  inspiration: "",
  user: null,

  setUser: (user) => set({ user }),

  setPreferences: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
