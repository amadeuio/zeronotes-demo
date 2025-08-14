import { EditableText } from '@/components';
import { useClickOutside } from '@/hooks';
import { useActions } from '@/store';
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
  const { notes } = useActions();
  const reset = () => {
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  const { triggerRef } = useClickOutside({
    onClickOutside: () => {
      if (!title && !content) return;
      notes.add(title, content);
      reset();
    },
  });

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
        value={title}
        onChange={setTitle}
        placeholder="Title"
        isTitle
      />
      {isExpanded && (
        <EditableText value={content} placeholder="Take a note..." onChange={setContent} />
      )}
    </div>
  );
};

export default NoteCreate;
