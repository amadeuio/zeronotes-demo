import { useStore, type Store } from '@/store';
import {
  filterNote,
  getNoteIdFromPosition,
  getNotesTotalWidth,
  getPositionFromNoteId,
  getSectionHeight,
  mapNoteToDisplay,
  sortNotesByPinned,
} from '@/utils';
import { useMemo } from 'react';
import { createSelector } from 'reselect';

export const selectActions = (state: Store) => state.actions;

export const selectLabels = (state: Store) => state.labels;

export const selectNotes = (state: Store) => state.notes;

export const selectFilters = (state: Store) => state.filters;

export const selectFiltersSearch = (state: Store) => state.filters.search;

export const selectFiltersView = (state: Store) => state.filters.view;

export const selectActiveNote = (state: Store) => state.activeNote;

export const selectActiveNoteId = (state: Store) => state.activeNote.id;

export const selectActiveNotePosition = (state: Store) => state.activeNote.position;

export const selectNotesOrder = (state: Store) => state.notesOrder;

export const selectUi = (state: Store) => state.ui;

export const selectGridColumns = (state: Store) => state.ui.gridColumns;

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

export const selectPinnedFilteredNotes = createSelector([selectFilteredNotes], (filteredNotes) =>
  filteredNotes.filter((n) => n.isPinned),
);

export const selectHasPinnedNotes = createSelector(
  [selectPinnedFilteredNotes],
  (pinnedNotes) => pinnedNotes.length > 0,
);

export const selectUnpinnedFilteredNotes = createSelector([selectFilteredNotes], (filteredNotes) =>
  filteredNotes.filter((n) => !n.isPinned),
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

export const selectPinnedSectionHeight = createSelector(
  [selectPinnedFilteredNotesOrder, selectPinnedFilteredNotes, selectGridColumns],
  (pinnedOrder, pinnedNotes, gridColumns) =>
    getSectionHeight(pinnedOrder, pinnedNotes, gridColumns),
);

const selectGetNoteIdFromPosition = createSelector(
  [
    selectPinnedFilteredNotesOrder,
    selectPinnedFilteredNotes,
    selectUnpinnedFilteredNotesOrder,
    selectUnpinnedFilteredNotes,
    selectPinnedSectionHeight,
    selectGridColumns,
  ],
  (pinnedOrder, pinnedNotes, unpinnedOrder, unpinnedNotes, pinnedSectionHeight, gridColumns) =>
    (x: number, y: number): string | undefined => {
      if (y < pinnedSectionHeight) {
        return getNoteIdFromPosition(y, x, pinnedOrder, pinnedNotes, gridColumns);
      } else {
        const unpinnedY = y - pinnedSectionHeight;
        return getNoteIdFromPosition(unpinnedY, x, unpinnedOrder, unpinnedNotes, gridColumns);
      }
    },
);

export const useSelectGetNoteIdFromPosition = () => useStore(selectGetNoteIdFromPosition);

export const selectActiveNoteDisplay = createSelector(
  [selectNotes, selectActiveNote, selectLabels],
  (notes, activeNote, labels) => {
    const note = notes.find((n) => n.id === activeNote.id);
    return note ? mapNoteToDisplay(note, labels) : null;
  },
);

const selectNotePositionById = (noteId: string, isPinned: boolean) =>
  createSelector(
    [
      selectPinnedFilteredNotesOrder,
      selectPinnedFilteredNotes,
      selectUnpinnedFilteredNotesOrder,
      selectUnpinnedFilteredNotes,
      selectPinnedSectionHeight,
      selectGridColumns,
    ],
    (pinnedOrder, pinnedNotes, unpinnedOrder, unpinnedNotes, pinnedSectionHeight, gridColumns) => {
      if (isPinned) {
        return getPositionFromNoteId(noteId, pinnedOrder, pinnedNotes, gridColumns);
      } else {
        const position = getPositionFromNoteId(noteId, unpinnedOrder, unpinnedNotes, gridColumns);
        return { ...position, y: position.y + pinnedSectionHeight };
      }
    },
  );

export const useSelectNotePositionById = (noteId: string, isPinned: boolean) =>
  useStore(useMemo(() => selectNotePositionById(noteId, isPinned), [noteId, isPinned]));

const selectNoteHasLabel = (noteId: string, labelId: string) =>
  createSelector(
    [selectNotes],
    (notes) => notes.find((n) => n.id === noteId)?.labelIds.includes(labelId) ?? false,
  );

export const useSelectNoteHasLabel = (noteId: string, labelId: string) =>
  useStore(useMemo(() => selectNoteHasLabel(noteId, labelId), [noteId, labelId]));

const selectFilteredLabels = (searchTerm: string) =>
  createSelector([selectLabels], (labels) =>
    labels.filter((label) => label.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

export const useSelectFilteredLabels = (searchTerm: string) =>
  useStore(useMemo(() => selectFilteredLabels(searchTerm), [searchTerm]));

const selectIsNoteActive = (noteId: string) => (state: Store) => state.activeNote.id === noteId;

export const useSelectIsNoteActive = (noteId: string) => useStore(selectIsNoteActive(noteId));

export const selectNotesTotalWidth = createSelector([selectGridColumns], (gridColumns) =>
  getNotesTotalWidth(gridColumns),
);
