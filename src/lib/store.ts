import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WheelState {
  entries: string[];
  results: string[];
  addEntry: (name: string) => void;
  removeEntry: (index: number) => void;
  editEntry: (index: number, newName: string) => void;
  addResult: (winner: string) => void;
  clearResults: () => void;
  isSpinning: boolean;
  setSpinning: (spinning: boolean) => void;
}

const DEFAULT_ENTRIES = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Wilson",
  "Emma Davis",
];

export const useWheelStore = create<WheelState>()(
  persist(
    (set) => ({
      entries: DEFAULT_ENTRIES,
      results: [],
      isSpinning: false,
      addEntry: (name) =>
        set((state) => ({
          entries: [...state.entries, name],
        })),
      removeEntry: (index) =>
        set((state) => ({
          entries: state.entries.filter((_, i) => i !== index),
        })),
      editEntry: (index, newName) =>
        set((state) => ({
          entries: state.entries.map((entry, i) =>
            i === index ? newName : entry
          ),
        })),
      addResult: (winner) =>
        set((state) => ({
          results: [...state.results, winner],
        })),
      clearResults: () =>
        set(() => ({
          results: [],
        })),
      setSpinning: (spinning) =>
        set(() => ({
          isSpinning: spinning,
        })),
    }),
    {
      name: "wheel-storage",
    }
  )
);
