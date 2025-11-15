import { useStore } from '@/store';
import { filterNote, mapNoteToDisplay, sortNotesByPinned } from '@/utils';
import { useMemo } from 'react';
import { createSelector } from 'reselect';
import {
  selectActiveNote,
  selectFilters,
  selectLabels,
  selectNotes,
  selectNotesOrder,
} from './base';

export const selectFilteredNotes = createSelector([selectNotes, selectFilters], (notes, filters) =>
  notes.filter((n) => filterNote(n, filters)),
);

export const selectFilteredNotesOrder = createSelector(
  [selectFilteredNotes, selectNotesOrder],
  (filteredNotes, notesOrder) => {
    const filteredNoteIds = new Set(filteredNotes.map((n) => n.id));
    const filtered = notesOrder.filter((id) => filteredNoteIds.has(id));
    return sortNotesByPinned(filtered, filteredNotes);
  },
);

export const selectDisplayNotes = createSelector(
  [selectFilteredNotes, selectLabels],
  (filteredNotes, labels) => filteredNotes.map((n) => mapNoteToDisplay(n, labels)),
);

export const selectActiveNoteDisplay = createSelector(
  [selectNotes, selectActiveNote, selectLabels],
  (notes, activeNote, labels) => {
    const note = notes.find((n) => n.id === activeNote.id);
    return note ? mapNoteToDisplay(note, labels) : null;
  },
);

export const selectPinnedFilteredNotes = createSelector([selectFilteredNotes], (filteredNotes) =>
  filteredNotes.filter((n) => n.isPinned),
);

export const selectUnpinnedFilteredNotes = createSelector([selectFilteredNotes], (filteredNotes) =>
  filteredNotes.filter((n) => !n.isPinned),
);

export const selectHasPinnedNotes = createSelector(
  [selectPinnedFilteredNotes],
  (pinnedNotes) => pinnedNotes.length > 0,
);

export const selectPinnedFilteredNotesOrder = createSelector(
  [selectFilteredNotesOrder, selectPinnedFilteredNotes],
  (filteredNotesOrder, pinnedNotes) => {
    const pinnedIds = new Set(pinnedNotes.map((n) => n.id));
    return filteredNotesOrder.filter((id) => pinnedIds.has(id));
  },
);

export const selectUnpinnedFilteredNotesOrder = createSelector(
  [selectFilteredNotesOrder, selectUnpinnedFilteredNotes],
  (filteredNotesOrder, unpinnedNotes) => {
    const unpinnedIds = new Set(unpinnedNotes.map((n) => n.id));
    return filteredNotesOrder.filter((id) => unpinnedIds.has(id));
  },
);

const selectIsNoteActive = (noteId: string) =>
  createSelector([selectActiveNote], (activeNote) => activeNote.id === noteId);

export const useSelectIsNoteActive = (noteId: string) =>
  useStore(useMemo(() => selectIsNoteActive(noteId), [noteId]));
