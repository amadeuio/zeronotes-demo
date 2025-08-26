import { labels as initialLabels, notes as initialNotes } from '@/data';
import type { DraftNote, Filters, Label, Note } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Store {
  notes: Note[];
  labels: Label[];
  filters: Filters;
  noteHeights: number[];
  notesOrder: string[];
  ui: {
    isEditLabelsMenuOpen: boolean;
  };
  activeNote: {
    id: string | null;
    position: { top: number; left: number } | null;
  };
  actions: {
    notes: {
      set: (notes: Note[]) => void;
      add: (note: DraftNote) => void;
      remove: (id: string) => void;
      update: (id: string, note: Note) => void;
      updateTitle: (id: string, title: string) => void;
      updateContent: (id: string, content: string) => void;
      removeLabel: (noteId: string, labelId: string) => void;
      toggleLabel: (noteId: string, labelId: string) => void;
    };
    noteHeights: {
      add: (height: number) => void;
    };
    labels: {
      create: (name: string) => Label;
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
    activeNote: {
      set: (activeNote: {
        id: string | null;
        position: { top: number; left: number } | null;
      }) => void;
    };
    notesOrder: {
      set: (notesOrder: string[]) => void;
      reorder: (noteId: string, overId: string, insertBefore: boolean) => void;
    };
  };
}

export const useStore = create<Store>()(
  devtools((set) => ({
    notes: initialNotes,
    labels: initialLabels,
    filters: {
      search: '',
      view: { type: 'notes' },
    },
    noteHeights: [],
    notesOrder: initialNotes.map((note) => note.id),
    ui: {
      isEditLabelsMenuOpen: false,
    },
    activeNote: {
      id: null,
      position: null,
    },
    actions: {
      notes: {
        set: (notes) => {
          set({ notes });
        },
        add: (note) => {
          set((state) => ({
            notes: [
              {
                id: uuidv4(),
                ...note,
                labelIds: note.labels.map((l) => l.id),
                isTrashed: false,
              },
              ...state.notes,
            ],
          }));
        },
        remove: (id) => {
          set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
        },
        update: (id, note) => {
          set((state) => ({ notes: state.notes.map((n) => (n.id === id ? note : n)) }));
        },
        updateTitle: (id, title) => {
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === id ? { ...note, title, updatedAt: new Date() } : note,
            ),
          }));
        },
        updateContent: (id, content) => {
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === id ? { ...note, content, updatedAt: new Date() } : note,
            ),
          }));
        },
        removeLabel: (noteId, labelId) => {
          set((state) => ({
            notes: state.notes.map((note) =>
              note.id === noteId
                ? { ...note, labelIds: note.labelIds.filter((l) => l !== labelId) }
                : note,
            ),
          }));
        },
        toggleLabel: (noteId, labelId) => {
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
          const newId = uuidv4();
          const newLabel = { id: newId, name };
          set((state) => ({ labels: [...state.labels, newLabel] }));
          return newLabel;
        },
        createAndAddToNote: (name, noteId) => {
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
        edit: (id, newName) => {
          set((state) => ({
            labels: state.labels.map((label) =>
              label.id === id ? { ...label, name: newName } : label,
            ),
          }));
        },
        remove: (id) => {
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
        setEditLabelsMenuOpen: (isOpen) => {
          set({ ui: { isEditLabelsMenuOpen: isOpen } });
        },
      },
      activeNote: {
        set: (activeNote) => {
          set({ activeNote });
        },
      },
      noteHeights: {
        add: (height: number) => {
          set((state) => ({
            noteHeights: [...state.noteHeights, height],
          }));
        },
      },
      notesOrder: {
        set: (notesOrder) => {
          set({ notesOrder });
        },
        reorder: (noteId, overId, insertBefore) => {
          set((state) => {
            const newOrder = [...state.notesOrder];
            const fromIndex = newOrder.indexOf(noteId);
            const toIndex = newOrder.indexOf(overId);

            if (fromIndex === -1 || toIndex === -1) return state;

            // Remove the note from its current position
            newOrder.splice(fromIndex, 1);

            // Calculate the insert position
            const insertIndex = insertBefore ? toIndex : toIndex + 1;

            // Insert the note at the new position
            newOrder.splice(insertIndex, 0, noteId);

            return { notesOrder: newOrder };
          });
        },
      },
    },
  })),
);
