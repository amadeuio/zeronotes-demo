import { NOTE_WIDTH } from '@/constants';
import { useActions, useIsNoteActive } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import type { MouseEvent } from 'react';
import NoteBase from '../NoteBase';

interface NoteProps {
  note: DisplayNote;
}

const Note = ({ note }: NoteProps) => {
  const { activeNote } = useActions();
  const isActive = useIsNoteActive(note.id);

  const handleClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    activeNote.set({
      id: note.id,
      position: {
        top: rect.top,
        left: rect.left,
      },
    });
  };

  return (
    <NoteBase
      note={note}
      onClick={handleClick}
      className={cn('hover:shadow-base', `w-[${NOTE_WIDTH.compact}]`, isActive && 'opacity-0')}
    />
  );
};

export default Note;
