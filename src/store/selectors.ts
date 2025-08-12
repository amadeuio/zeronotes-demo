import { useStore, type Store } from '@/store';
import type { DisplayNote } from '@/types';
import { buildLabelsById, filterNote, mapNoteToDisplay } from '@/utils';
import { useShallow } from 'zustand/react/shallow';

const useShallowStore = <T>(selector: (state: Store) => T) => useStore(useShallow(selector));

export const useActions = () => useStore((state) => state.actions);

export const useDisplayNotes = (): DisplayNote[] => {
  const [notes, filters, labels] = useShallowStore((s) => [s.notes, s.filters, s.labels]);
  const labelsById = buildLabelsById(labels);
  return notes.filter((n) => filterNote(n, filters)).map((n) => mapNoteToDisplay(n, labelsById));
};

export const useLabels = () => useStore((state) => state.labels);

export const usePinnedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => n.isPinned));

export const useArchivedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => n.isArchived));

export const useUnpinnedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => !n.isPinned));

export const useUnarchivedNotes = () =>
  useShallowStore((state) => state.notes.filter((n) => !n.isArchived));

export const useNoteHasLabel = (noteId: string, labelId: string) =>
  useShallowStore((state) => {
    return state.notes.find((n) => n.id === noteId)?.labelIds.includes(labelId) ?? false;
  });

export const useFilteredLabels = (searchTerm: string) =>
  useShallowStore((state) =>
    state.labels.filter((label) => label.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

export const useUi = () => useStore((state) => state.ui);
