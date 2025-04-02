import { create } from "zustand";

type CharacterStore = {
  refetchCharacters: (() => void) | null;
  setRefetchCharacters: (fn: () => void) => void;
};

export const useCharacterStore = create<CharacterStore>((set) => ({
  refetchCharacters: null,
  setRefetchCharacters: (fn) => set({ refetchCharacters: fn }),
}));

