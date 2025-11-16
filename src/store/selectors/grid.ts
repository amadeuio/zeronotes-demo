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
import { selectGridColumns } from './base';
import {
  selectPinnedFilteredNotes,
  selectPinnedFilteredNotesOrder,
  selectUnpinnedFilteredNotes,
  selectUnpinnedFilteredNotesOrder,
} from './notes';

export const selectPinnedSectionHeight = createSelector(
  [selectPinnedFilteredNotesOrder, selectPinnedFilteredNotes, selectGridColumns],
  (pinnedOrder, pinnedNotes, gridColumns) =>
    pinnedOrder.length === 0
      ? 0
      : getSectionHeight(pinnedOrder, pinnedNotes, gridColumns) + GRID_CONFIG.pinnedUnpinnedGap,
);

export const selectUnpinnedSectionHeight = createSelector(
  [selectUnpinnedFilteredNotesOrder, selectUnpinnedFilteredNotes, selectGridColumns],
  (unpinnedOrder, unpinnedNotes, gridColumns) =>
    unpinnedOrder.length === 0 ? 0 : getSectionHeight(unpinnedOrder, unpinnedNotes, gridColumns),
);

export const selectNotesTotalHeight = createSelector(
  [selectPinnedSectionHeight, selectUnpinnedSectionHeight],
  (pinnedSectionHeight, unpinnedSectionHeight) => pinnedSectionHeight + unpinnedSectionHeight,
);

export const selectNotesTotalWidth = createSelector([selectGridColumns], (gridColumns) =>
  getNotesTotalWidth(gridColumns),
);

const selectNoteIdFromPosition = createSelector(
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

export const useSelectNoteIdFromPosition = () => useStore(selectNoteIdFromPosition);

const selectPositionFromNoteId = (noteId: string, isPinned: boolean) =>
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

export const useSelectPositionFromNoteId = (noteId: string, isPinned: boolean) =>
  useStore(useMemo(() => selectPositionFromNoteId(noteId, isPinned), [noteId, isPinned]));
