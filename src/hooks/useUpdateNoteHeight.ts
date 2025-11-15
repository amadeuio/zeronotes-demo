import { selectActions, selectActiveNoteId, useStore } from '@/store';
import { useLayoutEffect, type RefObject } from 'react';

interface UseUpdateNoteHeightProps {
  noteId: string;
  noteHeight: number | null;
  noteRef: RefObject<HTMLDivElement | null>;
}

export const useUpdateNoteHeight = ({ noteId, noteHeight, noteRef }: UseUpdateNoteHeightProps) => {
  const { notes } = useStore(selectActions);
  const activeNoteId = useStore(selectActiveNoteId);

  useLayoutEffect(() => {
    if (activeNoteId || !noteRef.current) return;

    const updateHeight = () => {
      if (noteRef.current) {
        const height = noteRef.current.offsetHeight;

        if (noteHeight !== height) {
          notes.updateHeight(noteId, height);
        }
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(noteRef.current);

    return () => resizeObserver.disconnect();
  }, [activeNoteId, noteId, noteHeight, notes, noteRef]);
};
