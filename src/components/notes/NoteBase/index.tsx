import { EditableText, Label } from '@/components';
import { useActions } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import type { CSSProperties, MouseEvent } from 'react';
import NoteToolbar from './NoteToolbar';

interface NoteProps {
  note: DisplayNote;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const NoteBase = ({ note, onClick, className, style }: NoteProps) => {
  const { notes } = useActions();

  return (
    <div
      className={cn('bg-base flex flex-col gap-6 rounded-lg border p-5', className)}
      onClick={onClick}
      style={style}
    >
      <EditableText
        value={note.title}
        onSave={(title) => notes.updateTitle(note.id, title)}
        isTitle
      />
      <EditableText
        value={note.content}
        onSave={(content) => notes.updateContent(note.id, content)}
      />
      <div className="flex gap-2">
        {note.labels.map((label) => (
          <Label
            key={label.id}
            label={label}
            onClose={() => notes.removeLabel(note.id, label.id)}
          />
        ))}
      </div>
      <NoteToolbar note={note} />
    </div>
  );
};

export default NoteBase;
