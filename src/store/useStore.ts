
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Entry {
  id: string;
  name: string;
}

export interface Result {
  id: string;
  name: string;
  timestamp: number;
}

interface WheelState {
  entries: Entry[];
  results: Result[];
  isSpinning: boolean;
  addEntry: (name: string) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, name: string) => void;
  addResult: (name: string) => void;
  clearResults: () => void;
  setIsSpinning: (isSpinning: boolean) => void;
}

export const useStore = create<WheelState>()(
  persist(
    (set) => ({
      entries: [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' },
        { id: '4', name: 'Diana' },
        { id: '5', name: 'Edward' },
      ],
      results: [],
      isSpinning: false,
      addEntry: (name) => 
        set((state) => ({
          entries: [...state.entries, { id: Date.now().toString(), name }],
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
      updateEntry: (id, name) =>
        set((state) => ({
          entries: state.entries.map((entry) => 
            entry.id === id ? { ...entry, name } : entry
          ),
        })),
      addResult: (name) =>
        set((state) => ({
          results: [
            { id: Date.now().toString(), name, timestamp: Date.now() },
            ...state.results,
          ],
        })),
      clearResults: () => set({ results: [] }),
      setIsSpinning: (isSpinning) => set({ isSpinning }),
    }),
    {
      name: 'wheel-spinner-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
