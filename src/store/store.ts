import { labels as initialLabels, notes as initialNotes } from '@/data';
import type { Label, Note } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
      removeLabel: (noteId: string, labelId: string) => void;
      toggleLabel: (noteId: string, labelId: string) => void;
    };
    labels: {
      create: (name: string) => void;
      createAndAddToNote: (name: string, noteId: string) => void;
      edit: (id: string, newName: string) => void;
      remove: (id: string) => void;
    };
    filters: {
      set: (filters: Partial<Filters>) => void;
    };
    ui: {
      setEditLabelsMenuOpen: (isOpen: boolean) => void;
    };
  };
}

export const useStore = create<Store>()(
  devtools((set) => ({
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
        removeLabel: (noteId: string, labelId: string) => {
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === noteId
                ? { ...note, labelIds: note.labelIds.filter((l) => l !== labelId) }
                : note,
            ),
          }));
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
        create: (name: string) => {
          set((state) => ({ labels: [...state.labels, { id: uuidv4(), name }] }));
        },
        createAndAddToNote: (name: string, noteId: string) => {
          set((state) => {
            const newId = uuidv4();
            return {
              labels: [...state.labels, { id: newId, name }],
              notes: state.notes.map((note) =>
                note.id === noteId ? { ...note, labelIds: [...note.labelIds, newId] } : note,
              ),
            };
          });
        },
        edit: (id: string, newName: string) => {
          set((state) => ({
            labels: state.labels.map((label) =>
              label.id === id ? { ...label, name: newName } : label,
            ),
          }));
        },
        remove: (id: string) => {
          set((state) => ({
            labels: state.labels.filter((label) => label.id !== id),
            notes: state.notes.map((note) => ({
              ...note,
              labelIds: note.labelIds.filter((labelId) => labelId !== id),
            })),
          }));
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
  })),
);
