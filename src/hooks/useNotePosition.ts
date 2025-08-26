import { useNotesOrder } from '@/store';

interface NoteGridConfig {
  noteWidth: number;
  noteHeight: number;
  gap: number;
  columns: number;
}

interface NotePosition {
  top: number;
  left: number;
}

const GRID_CONFIG: NoteGridConfig = {
  noteWidth: 237,
  noteHeight: 200,
  gap: 10,
  columns: 3,
};

const notesOrder = ['1', '2', '3', '4'];
const notesOrder2 = ['4', '2', '3', '1'];

export const useNotePosition = () => {
  const notesOrder = useNotesOrder();

  const getPosition = (noteId: string): NotePosition => {
    const { noteWidth, noteHeight, gap, columns } = GRID_CONFIG;
    const orderIndex = notesOrder.indexOf(noteId);
    const column = orderIndex % columns;
    const row = Math.floor(orderIndex / columns);

    return {
      top: row * (noteHeight + gap),
      left: column * (noteWidth + gap),
    };
  };

  const getNoteIdAtPosition = (top: number, left: number) => {
    const { noteWidth, noteHeight, gap, columns } = GRID_CONFIG;

    const col = Math.floor(left / (noteWidth + gap));
    const row = Math.floor(top / (noteHeight + gap));

    const gridIndex = row * columns + col;
    return notesOrder[gridIndex];
  };

  return { getPosition, getNoteIdAtPosition };
};
