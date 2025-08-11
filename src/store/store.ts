import { labels as initialLabels, notes as initialNotes } from '@/data';
import type { Label, Note } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

export interface Filters {
  search: string;
  labelId: string | null;
}

export interface Store {
  notes: Note[];
  labels: Label[];
  filters: Filters;
  ui: {
    isEditLabelsMenuOpen: boolean;
  };
  actions: {
    notes: {
      set: (notes: Note[]) => void;
      add: (note: Note) => void;
      remove: (id: string) => void;
      update: (id: string, note: Note) => void;
      toggleLabel: (noteId: string, labelId: string) => void;
    };
    labels: {
      create: (label: string) => void;
      createAndAddToNote: (label: string, noteId: string) => void;
    };
    filters: {
      set: (filters: Partial<Filters>) => void;
    };
    ui: {
      setEditLabelsMenuOpen: (isOpen: boolean) => void;
    };
  };
}

export const useStore = create<Store>((set) => ({
  notes: initialNotes,
  labels: initialLabels,
  filters: {
    search: '',
    labelId: null,
  },
  ui: {
    isEditLabelsMenuOpen: false,
  },
  actions: {
    notes: {
      set: (notes: Note[]) => {
        set({ notes });
      },
      add: (note: Note) => {
        set((state) => ({ notes: [...state.notes, note] }));
      },
      remove: (id) => {
        set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
      },
      update: (id, note) => {
        set((state) => ({ notes: state.notes.map((n) => (n.id === id ? note : n)) }));
      },
      toggleLabel: (noteId: string, labelId: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  labelIds: note.labelIds.includes(labelId)
                    ? note.labelIds.filter((l) => l !== labelId)
                    : [...note.labelIds, labelId],
                }
              : note,
          ),
        }));
      },
    },
    labels: {
      create: (label: string) => {
        set((state) => ({ labels: [...state.labels, { id: uuidv4(), name: label }] }));
      },
      createAndAddToNote: (label: string, noteId: string) => {
        set((state) => {
          const newId = uuidv4();
          return {
            labels: [...state.labels, { id: newId, name: label }],
            notes: state.notes.map((note) =>
              note.id === noteId ? { ...note, labelIds: [...note.labelIds, newId] } : note,
            ),
          };
        });
      },
    },
    filters: {
      set: (filters) => {
        set((state) => ({ filters: { ...state.filters, ...filters } }));
      },
    },
    ui: {
      setEditLabelsMenuOpen: (isOpen: boolean) => {
        set({ ui: { isEditLabelsMenuOpen: isOpen } });
      },
    },
  },
}));
