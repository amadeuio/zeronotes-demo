import { notes as initialNotes } from '@/data';
import type { Note } from '@/types';
import { create } from 'zustand';

export interface Store {
  notes: Note[];
  actions: {
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, note: Note) => void;
  };
}

export const useStore = create<Store>((set) => ({
  notes: initialNotes,
  actions: {
    setNotes: (notes: Note[]) => {
      set({ notes });
    },
    addNote: (note: Note) => {
      set((state) => ({ notes: [...state.notes, note] }));
    },
    removeNote: (id) => {
      set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
    },
    updateNote: (id, note) => {
      set((state) => ({ notes: state.notes.map((n) => (n.id === id ? note : n)) }));
    },
  },
}));
