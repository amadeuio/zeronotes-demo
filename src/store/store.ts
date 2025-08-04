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
    toggleNoteLabel: (noteId: string, label: string) => void;
    createLabel: (label: string) => void;
    setFilters: (filters: Partial<Filters>) => void;
    createLabelAndAddToNote: (label: string, noteId: string) => void;
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
    toggleNoteLabel: (noteId: string, label: string) => {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                labels: note.labels.includes(label)
                  ? note.labels.filter((l) => l !== label)
                  : [...note.labels, label],
              }
            : note,
        ),
      }));
    },
    createLabel: (label: string) => {
      set((state) => ({ labels: [...state.labels, label] }));
    },
    setFilters: (filters) => {
      set((state) => ({ filters: { ...state.filters, ...filters } }));
    },
    createLabelAndAddToNote: (label: string, noteId: string) => {
      set((state) => ({
        labels: [...state.labels, label],
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, labels: [...note.labels, label] } : note,
        ),
      }));
    },
  },
}));
