import { EditableText, Label } from '@/components';
import { useClickOutside } from '@/hooks';
import { useActions } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { useState, type MouseEvent } from 'react';
import NoteToolbar from './Toolbar';

interface NoteCreateProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const initNote: DisplayNote = {
  id: '',
  color: null,
  isPinned: false,
  isArchived: false,
  title: '',
  content: '',
  labels: [],
};

const NoteCreate = ({ onClick, className }: NoteCreateProps) => {
  const [note, setNote] = useState<DisplayNote>(initNote);

  const [isExpanded, setIsExpanded] = useState(false);
  const { notes } = useActions();

  const handleCreate = () => {
    if (!note.title && !note.content) {
      setNote(initNote);
      return;
    }
    notes.add(note.title, note.content);
    setNote(initNote);
  };

  const { triggerRef } = useClickOutside(handleCreate);

  return (
    <div
      ref={triggerRef}
      className={cn(
        'bg-base shadow-base flex w-full max-w-[var(--width-note-expanded)] flex-col gap-6 rounded-lg border p-5',
        className,
      )}
      onClick={onClick}
    >
      <EditableText
        onFocus={() => setIsExpanded(true)}
        value={note.title}
        onChange={(value) => setNote({ ...note, title: value })}
        placeholder="Title"
        isTitle
      />
      {isExpanded && (
        <EditableText
          value={note.content}
          placeholder="Take a note..."
          onChange={(value) => setNote({ ...note, content: value })}
        />
      )}
      <div className="flex gap-2">
        {note.labels.map((label) => (
          <Label
            key={label.id}
            label={label}
            onClose={() =>
              setNote({ ...note, labels: note.labels.filter((l) => l.id !== label.id) })
            }
          />
        ))}
      </div>
      <NoteToolbar note={note} setNote={setNote} />
    </div>
  );
};

export default NoteCreate;
