import { useStore, type Store } from '@/store';
import { filterNote } from '@/utils/filterNote';
import { useShallow } from 'zustand/react/shallow';

const useShallowStore = <T>(selector: (state: Store) => T) => useStore(useShallow(selector));

export const useActions = () => useStore((state) => state.actions);

export const useNotes = () =>
  useShallowStore((state) => state.notes.filter((note) => filterNote(note, state.filters)));

export const useLabels = () => useStore((state) => state.labels);

export const usePinnedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => n.isPinned));

export const useArchivedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => n.isArchived));

export const useUnpinnedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => !n.isPinned));

export const useUnarchivedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => !n.isArchived));
