import { IconButton } from '@/components';
import { useDrag } from '@/hooks';
import { useActions, useIsNoteActive, useNotePositionById, useSearch } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { type MouseEvent } from 'react';
import { Label, NoteGhost, NoteToolbar, TextView } from './';

interface NoteViewProps {
  note: DisplayNote;
}

const NoteView = ({ note }: NoteViewProps) => {
  const { activeNote } = useActions();
  const isActive = useIsNoteActive(note.id);
  const { notes } = useActions();
  const search = useSearch();
  const position = useNotePositionById(note.id);
  const { isDragging, translate, handleMouseDown, nodeRef } = useDrag({ notePosition: position });

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
    <>
      <div
        ref={nodeRef}
        className={cn(
          'group/note hover:shadow-base w-note-compact absolute flex flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 transition-colors duration-800 ease-in-out select-none',
          isDragging && 'opacity-0',
          isActive && 'opacity-0',
        )}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        style={{
          backgroundColor: note.colorValue ?? 'var(--color-base)',
          borderColor: note.colorValue ?? 'var(--color-secondary)',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.3s ease-in-out',
          willChange: 'transform',
        }}
      >
        <IconButton
          size={24}
          iconName="push_pin"
          label={note.isPinned ? 'Unpin note' : 'Pin note'}
          filled={note.isPinned}
          className="absolute top-2 right-2 p-1 opacity-0 transition-opacity duration-400 ease-in-out group-hover/note:opacity-100"
          iconClassName="text-neutral-300"
          onClick={() => notes.togglePin(note.id)}
        />
        {note.title && <TextView isTitle value={note.title} searchTerm={search} />}
        <TextView value={note.content} searchTerm={search} />
        <div className="flex flex-wrap gap-1.5">
          {note.labels.map((label) => (
            <Label
              key={label.id}
              label={label}
              onClose={() => notes.removeLabel(note.id, label.id)}
            />
          ))}
        </div>
        <NoteToolbar
          note={note}
          className="absolute bottom-1.5 left-1.5 opacity-0 transition-opacity duration-400 ease-in-out group-hover/note:opacity-100"
        />
      </div>
      {isDragging && <NoteGhost note={note} translate={translate} initialPosition={position} />}
    </>
  );
};

export default NoteView;
