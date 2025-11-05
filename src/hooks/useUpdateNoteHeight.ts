import { useActions } from '@/store';
import { useEffect, type RefObject } from 'react';

interface UseUpdateNoteHeightProps {
  noteId: string;
  noteHeight: number | null;
  noteRef: RefObject<HTMLDivElement | null>;
}

export const useUpdateNoteHeight = ({ noteId, noteHeight, noteRef }: UseUpdateNoteHeightProps) => {
  const { notes } = useActions();

  const updateNoteHeight = () => {
    if (noteRef.current) {
      requestAnimationFrame(() => {
        if (noteRef.current) {
          const height = noteRef.current.offsetHeight;
          if (noteHeight !== height) {
            notes.updateHeight(noteId, height);
          }
        }
      });
    }
  };

  useEffect(() => {
    updateNoteHeight();
  }, [noteRef]);
};
