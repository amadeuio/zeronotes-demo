import { GRID_CONFIG } from '@/constants';

export const getTotalWidth = (gridColumns: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return gridColumns * noteWidth + (gridColumns - 1) * gap;
};

export const getGridColumnsFromWidth = (containerWidth: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return Math.max(1, Math.floor((containerWidth + gap) / (noteWidth + gap)));
};

export const getSectionHeight = (
  notesOrder: string[],
  noteHeights: Record<string, number | null>,
  gridColumns: number,
): number => {
  const { gap } = GRID_CONFIG;
  const columnHeights = new Array(gridColumns).fill(0);

  for (let i = 0; i < notesOrder.length; i++) {
    const noteId = notesOrder[i];
    const column = i % gridColumns;
    const noteHeight = noteHeights[noteId] ?? 0;
    columnHeights[column] += noteHeight + gap;
  }

  const maxHeight = Math.max(...columnHeights);
  return maxHeight - gap;
};

export const getPositionFromNoteId = (
  noteId: string,
  notesOrder: string[],
  noteHeights: Record<string, number | null>,
  columns: number,
): { x: number; y: number } => {
  const { noteWidth, gap } = GRID_CONFIG;
  const orderIndex = notesOrder.indexOf(noteId);
  const column = orderIndex % columns;

  let y = 0;
  for (let i = 0; i < orderIndex; i++) {
    if (i % columns === column) {
      const height = noteHeights[notesOrder[i]] ?? 0;
      y += height + gap;
    }
  }

  return {
    x: column * (noteWidth + gap),
    y,
  };
};

export const getNoteIdFromPosition = (
  x: number,
  y: number,
  notesOrder: string[],
  noteHeights: Record<string, number | null>,
  columns: number,
): string | undefined => {
  const { noteWidth, gap } = GRID_CONFIG;

  const col = Math.floor(x / (noteWidth + gap));
  if (col < 0 || col >= columns) return undefined;

  const columnHeights: number[] = new Array(columns).fill(0);

  for (let i = 0; i < notesOrder.length; i++) {
    const noteId = notesOrder[i];
    const noteColumn = i % columns;
    const height = noteHeights[noteId] ?? 0;

    if (noteColumn === col) {
      if (y >= columnHeights[noteColumn] && y < columnHeights[noteColumn] + height) {
        return noteId;
      }
      columnHeights[noteColumn] += height + gap;
    } else {
      columnHeights[noteColumn] += height + gap;
    }
  }

  return undefined;
};
