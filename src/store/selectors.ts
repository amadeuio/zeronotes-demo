import { useStore, type Store } from '@/store';
import type { DisplayNote } from '@/types';
import { filterNote, mapNoteToDisplay } from '@/utils';
import { useShallow } from 'zustand/react/shallow';

const useShallowStore = <T>(selector: (state: Store) => T) => useStore(useShallow(selector));

export const useActions = () => useStore((state) => state.actions);

export const useLabelsById = () =>
  useShallowStore((state) => Object.fromEntries(state.labels.map((l) => [l.id, l] as const)));

export const useDisplayNotes = (): DisplayNote[] => {
  const [notes, filters] = useShallowStore((s) => [s.notes, s.filters]);
  const labelsById = useLabelsById();
  return notes.filter((n) => filterNote(n, filters)).map((n) => mapNoteToDisplay(n, labelsById));
};

export const useActiveNote = () => {
  const [notes, activeNote] = useShallowStore((s) => [s.notes, s.activeNote]);
  const labelsById = useLabelsById();
  const note = notes.find((n) => n.id === activeNote.id);

  return note ? mapNoteToDisplay(note, labelsById) : null;
};

export const useActiveNoteId = () => useStore((state) => state.activeNote.id);

export const useActiveNotePosition = () => useStore((state) => state.activeNote.position);

export const useIsNoteActive = (noteId: string) =>
  useStore((state) => state.activeNote.id === noteId);

export const useLabels = () => useStore((state) => state.labels);

export const useSearch = () => useStore((state) => state.filters.search);

export const useView = () => useStore((state) => state.filters.view);

export const useNoteHeights = () => useStore((state) => state.noteHeights);

export const useNotesOrder = () => useStore((state) => state.notesOrder);

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
