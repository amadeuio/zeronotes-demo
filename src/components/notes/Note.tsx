import { useNotePosition, useSetNoteHeights } from '@/hooks';
import { useActions, useIsNoteActive, useNotesOrder } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { type MouseEvent, useEffect, useState } from 'react';
import { Draggable } from '../common';
import { NoteBase } from './common';

interface NoteProps {
  note: DisplayNote;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { activeNote } = useActions();
  const isActive = useIsNoteActive(note.id);
  const { ref } = useSetNoteHeights();
  const { getPosition } = useNotePosition();
  const notesOrder = useNotesOrder();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(getPosition(note.id));

  // Update position when not dragging and order changes
  useEffect(() => {
    if (!isDragging) {
      setPosition(getPosition(note.id));
    }
  }, [notesOrder, note.id, isDragging]);

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

  const handleDragEnd = (x: number, y: number) => {
    console.debug(`Note ${note.id} dropped at: ${x}, ${y}`);
    // Update to the new grid position after drag ends
    setPosition(getPosition(note.id));
  };

  return (
    <Draggable
      onDragEnd={handleDragEnd}
      onDragStateChange={setIsDragging}
      className={cn('hover:shadow-base w-note-compact', isActive && 'opacity-0', className)}
    >
      <NoteBase
        ref={ref}
        isViewOnly
        note={note}
        onClick={handleClick}
        className={cn(
          'hover:shadow-base w-note-compact absolute',
          isActive && 'opacity-0',
          className,
        )}
        style={{
          transform: `translate(${position.left}px, ${position.top}px)`,
          transition: 'transform 0.3s ease-in-out',
          willChange: 'transform',
        }}
      />
    </Draggable>
  );
};

export default Note;
