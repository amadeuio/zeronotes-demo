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
import { selectGridColumns, selectNoteHeights } from './base';
import { selectPinnedOrder, selectUnpinnedOrder } from './notes';

export const selectPinnedHeight = createSelector(
  [selectPinnedOrder, selectNoteHeights, selectGridColumns],
  (pinnedOrder, noteHeights, gridColumns) =>
    pinnedOrder.length > 0
      ? getSectionHeight(pinnedOrder, noteHeights, gridColumns) + GRID_CONFIG.pinnedUnpinnedGap
      : 0,
);

export const selectUnpinnedHeight = createSelector(
  [selectUnpinnedOrder, selectNoteHeights, selectGridColumns],
  (unpinnedOrder, noteHeights, gridColumns) =>
    unpinnedOrder.length > 0 ? getSectionHeight(unpinnedOrder, noteHeights, gridColumns) : 0,
);

export const selectTotalHeight = createSelector(
  [selectPinnedHeight, selectUnpinnedHeight],
  (pinnedHeight, unpinnedHeight) => pinnedHeight + unpinnedHeight,
);

export const selectTotalWidth = createSelector([selectGridColumns], (gridColumns) =>
  getTotalWidth(gridColumns),
);

export const selectNoteIdFromPosition = createSelector(
  [
    selectPinnedOrder,
    selectUnpinnedOrder,
    selectNoteHeights,
    selectPinnedHeight,
    selectGridColumns,
  ],
  (pinnedOrder, unpinnedOrder, noteHeights, pinnedHeight, gridColumns) =>
    (x: number, y: number): string | undefined => {
      if (y < pinnedHeight) {
        return getNoteIdFromPosition(x, y, pinnedOrder, noteHeights, gridColumns);
      } else {
        const unpinnedY = y - pinnedHeight;
        return getNoteIdFromPosition(x, unpinnedY, unpinnedOrder, noteHeights, gridColumns);
      }
    },
);

export const useSelectNoteIdFromPosition = () => useStore(selectNoteIdFromPosition);

export const selectPositionFromNoteId = (noteId: string, isPinned: boolean) =>
  createSelector(
    [
      selectPinnedOrder,
      selectUnpinnedOrder,
      selectNoteHeights,
      selectPinnedHeight,
      selectGridColumns,
    ],
    (pinnedOrder, unpinnedOrder, noteHeights, pinnedHeight, gridColumns) => {
      if (isPinned) {
        return getPositionFromNoteId(noteId, pinnedOrder, noteHeights, gridColumns);
      } else {
        const position = getPositionFromNoteId(noteId, unpinnedOrder, noteHeights, gridColumns);
        return { ...position, y: position.y + pinnedHeight };
      }
    },
  );

export const useSelectPositionFromNoteId = (noteId: string, isPinned: boolean) =>
  useStore(useMemo(() => selectPositionFromNoteId(noteId, isPinned), [noteId, isPinned]));
