import { GRID_CONFIG } from '@/constants';
import type { Note } from '@/types';

export const getNotesTotalWidth = (gridColumns: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return gridColumns * noteWidth + (gridColumns - 1) * gap;
};

export const getGridColumnsFromWidth = (containerWidth: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return Math.max(1, Math.floor((containerWidth + gap) / (noteWidth + gap)));
};

export const getSectionHeight = (
  notesOrder: string[],
  notes: Note[],
  gridColumns: number,
): number => {
  const { gap } = GRID_CONFIG;
  const columnHeights = new Array(gridColumns).fill(0);
  const notesById = Object.fromEntries(notes.map((n) => [n.id, n] as const));

  for (let i = 0; i < notesOrder.length; i++) {
    const noteId = notesOrder[i];
    const column = i % gridColumns;
    const note = notesById[noteId];
    const noteHeight = note?.height ?? 200;
    columnHeights[column] += noteHeight + gap;
  }

  const maxHeight = Math.max(...columnHeights);
  return maxHeight - gap;
};

export const getPositionFromNoteId = (
  noteId: string,
  notesOrder: string[],
  notes: Note[],
  columns: number,
): { y: number; x: number } => {
  const { noteWidth, gap } = GRID_CONFIG;
  const orderIndex = notesOrder.indexOf(noteId);
  const column = orderIndex % columns;

  let y = 0;
  for (let i = 0; i < orderIndex; i++) {
    if (i % columns === column) {
      const note = notes.find((n) => n.id === notesOrder[i]);
      const height = note?.height ?? 200;
      y += height + gap;
    }
  }

  return {
    y,
    x: column * (noteWidth + gap),
  };
};

export const getNoteIdFromPosition = (
  y: number,
  x: number,
  notesOrder: string[],
  notes: Note[],
  columns: number,
): string | undefined => {
  const { noteWidth, gap } = GRID_CONFIG;

  const col = Math.floor(x / (noteWidth + gap));
  if (col < 0 || col >= columns) return undefined;

  const columnHeights: number[] = new Array(columns).fill(0);

  for (let i = 0; i < notesOrder.length; i++) {
    const noteId = notesOrder[i];
    const noteColumn = i % columns;
    const note = notes.find((n) => n.id === noteId);
    const height = note?.height ?? 200;

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
