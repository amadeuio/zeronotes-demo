import { IconButton } from '@/components';
import { COLORS } from '@/constants';
import { useActions, useSearch } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import type { CSSProperties, MouseEvent } from 'react';
import { Label, NoteText } from '..';
import Toolbar from './Toolbar';

interface NoteProps {
  note: DisplayNote;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
  isViewOnly?: boolean;
}

const NoteBase = ({ note, onClick, className, style, isViewOnly }: NoteProps) => {
  const { notes } = useActions();
  const search = useSearch();
  const noteColor = COLORS.find((c) => c.id === note.colorId)?.value;

  return (
    <div
      className={cn(
        'group/note relative flex flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 transition-colors duration-800 ease-in-out',
        className,
      )}
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: noteColor ?? 'var(--color-base)',
        borderColor: noteColor ?? 'var(--color-secondary)',
      }}
    >
      <IconButton
        size={24}
        iconName="push_pin"
        label={note.isPinned ? 'Unpin note' : 'Pin note'}
        filled={note.isPinned}
        className="absolute top-2 right-2 p-1 opacity-0 transition-opacity duration-400 ease-in-out group-hover/note:opacity-100"
        onClick={() => notes.togglePin(note.id)}
      />
      <NoteText
        isViewOnly={isViewOnly}
        isTitle
        searchTerm={search}
        value={note.title}
        onChange={(value: string) => notes.updateTitle(note.id, value)}
        className="pr-6"
      />
      <NoteText
        isViewOnly={isViewOnly}
        searchTerm={search}
        value={note.content}
        onChange={(value: string) => notes.updateContent(note.id, value)}
      />
      <div className="flex flex-wrap gap-2">
        {note.labels.map((label) => (
          <Label
            key={label.id}
            label={label}
            onClose={() => notes.removeLabel(note.id, label.id)}
          />
        ))}
      </div>
      <Toolbar
        note={note}
        className="absolute bottom-1.5 left-1.5 opacity-0 transition-opacity duration-400 ease-in-out group-hover/note:opacity-100"
      />
    </div>
  );
};

export default NoteBase;
