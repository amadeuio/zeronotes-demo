import { GRID_CONFIG } from '@/constants';
import { useStore } from '@/store';
import {
  getNoteIdFromPosition,
  getNotesTotalWidth,
  getPositionFromNoteId,
  getSectionHeight,
} from '@/utils';
import { useMemo } from 'react';
import { createSelector } from 'reselect';
import {
  selectGridColumns,
  selectPinnedFilteredNotes,
  selectPinnedFilteredNotesOrder,
  selectUnpinnedFilteredNotes,
  selectUnpinnedFilteredNotesOrder,
} from './';

export const selectPinnedSectionHeight = createSelector(
  [selectPinnedFilteredNotesOrder, selectPinnedFilteredNotes, selectGridColumns],
  (pinnedOrder, pinnedNotes, gridColumns) =>
    getSectionHeight(pinnedOrder, pinnedNotes, gridColumns),
);

export const selectUnpinnedSectionHeight = createSelector(
  [selectUnpinnedFilteredNotesOrder, selectUnpinnedFilteredNotes, selectGridColumns],
  (unpinnedOrder, unpinnedNotes, gridColumns) =>
    getSectionHeight(unpinnedOrder, unpinnedNotes, gridColumns) - GRID_CONFIG.pinnedSectionGap,
);

export const selectNotesTotalHeight = createSelector(
  [selectPinnedSectionHeight, selectUnpinnedSectionHeight],
  (pinnedSectionHeight, unpinnedSectionHeight) =>
    pinnedSectionHeight + unpinnedSectionHeight - GRID_CONFIG.gap,
);

export const selectNotesTotalWidth = createSelector([selectGridColumns], (gridColumns) =>
  getNotesTotalWidth(gridColumns),
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
