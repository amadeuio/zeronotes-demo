import { GRID_CONFIG } from '@/constants/grid';
import type { Note } from '@/types';

export const getPositionFromNoteId = (
  noteId: string,
  notesOrder: string[],
  notes: Note[],
): { y: number; x: number } => {
  const { noteWidth, gap, columns } = GRID_CONFIG;
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
): string | undefined => {
  const { noteWidth, gap, columns } = GRID_CONFIG;

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
