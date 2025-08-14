import { EditableText } from '@/components';
import { cn } from '@/utils';
import { useState, type MouseEvent } from 'react';

interface NoteCreateProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const NoteCreate = ({ onClick, className }: NoteCreateProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div
      className={cn(
        'bg-base shadow-base flex w-full max-w-[var(--width-note-expanded)] flex-col gap-6 rounded-lg border p-5',
        className,
      )}
      onClick={onClick}
    >
      <EditableText
        placeholder="Title"
        value={title}
        onSave={(title) => setTitle(title)}
        isTitle
        onClick={() => setIsExpanded(true)}
      />
      {isExpanded && (
        <EditableText
          placeholder="Take a note..."
          value={content}
          onSave={(content) => setContent(content)}
        />
      )}
    </div>
  );
};

export default NoteCreate;
