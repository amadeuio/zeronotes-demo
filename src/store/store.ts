import { labels as initialLabels, notes as initialNotes } from '@/data';
import type { Note } from '@/types';
import { create } from 'zustand';

export interface Filters {
  search: string;
  label: string | null;
}

export interface Store {
  notes: Note[];
  labels: string[];
  filters: Filters;
  actions: {
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, note: Note) => void;
    setFilters: (filters: Partial<Filters>) => void;
  };
}

export const useStore = create<Store>((set) => ({
  notes: initialNotes,
  labels: initialLabels,
  filters: {
    search: '',
    label: null,
  },
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
    setFilters: (filters) => {
      set((state) => ({ filters: { ...state.filters, ...filters } }));
    },
  },
}));
