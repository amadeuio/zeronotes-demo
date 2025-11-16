import { GRID_CONFIG } from '@/constants';
import { useStore } from '@/store';
import {
  getNoteIdFromPosition,
  getPositionFromNoteId,
  getSectionHeight,
  getTotalWidth,
} from '@/utils';
import { useMemo } from 'react';
import { createSelector } from 'reselect';
import { selectGridColumns } from './base';
import {
  selectPinnedNotes,
  selectPinnedOrder,
  selectUnpinnedNotes,
  selectUnpinnedOrder,
} from './notes';

export const selectPinnedHeight = createSelector(
  [selectPinnedOrder, selectPinnedNotes, selectGridColumns],
  (pinnedOrder, pinnedNotes, gridColumns) =>
    pinnedOrder.length === 0
      ? 0
      : getSectionHeight(pinnedOrder, pinnedNotes, gridColumns) + GRID_CONFIG.pinnedUnpinnedGap,
);

export const selectUnpinnedHeight = createSelector(
  [selectUnpinnedOrder, selectUnpinnedNotes, selectGridColumns],
  (unpinnedOrder, unpinnedNotes, gridColumns) =>
    unpinnedOrder.length === 0 ? 0 : getSectionHeight(unpinnedOrder, unpinnedNotes, gridColumns),
);

export const selectTotalHeight = createSelector(
  [selectPinnedHeight, selectUnpinnedHeight],
  (pinnedHeight, unpinnedHeight) => pinnedHeight + unpinnedHeight,
);

export const selectTotalWidth = createSelector([selectGridColumns], (gridColumns) =>
  getTotalWidth(gridColumns),
);

const selectNoteIdFromPosition = createSelector(
  [
    selectPinnedOrder,
    selectPinnedNotes,
    selectUnpinnedOrder,
    selectUnpinnedNotes,
    selectPinnedHeight,
    selectGridColumns,
  ],
  (pinnedOrder, pinnedNotes, unpinnedOrder, unpinnedNotes, pinnedHeight, gridColumns) =>
    (x: number, y: number): string | undefined => {
      if (y < pinnedHeight) {
        return getNoteIdFromPosition(y, x, pinnedOrder, pinnedNotes, gridColumns);
      } else {
        const unpinnedY = y - pinnedHeight;
        return getNoteIdFromPosition(unpinnedY, x, unpinnedOrder, unpinnedNotes, gridColumns);
      }
    },
);

export const useSelectNoteIdFromPosition = () => useStore(selectNoteIdFromPosition);

const selectPositionFromNoteId = (noteId: string, isPinned: boolean) =>
  createSelector(
    [
      selectPinnedOrder,
      selectPinnedNotes,
      selectUnpinnedOrder,
      selectUnpinnedNotes,
      selectPinnedHeight,
      selectGridColumns,
    ],
    (pinnedOrder, pinnedNotes, unpinnedOrder, unpinnedNotes, pinnedHeight, gridColumns) => {
      if (isPinned) {
        return getPositionFromNoteId(noteId, pinnedOrder, pinnedNotes, gridColumns);
      } else {
        const position = getPositionFromNoteId(noteId, unpinnedOrder, unpinnedNotes, gridColumns);
        return { ...position, y: position.y + pinnedHeight };
      }
    },
  );

export const useSelectPositionFromNoteId = (noteId: string, isPinned: boolean) =>
  useStore(useMemo(() => selectPositionFromNoteId(noteId, isPinned), [noteId, isPinned]));
