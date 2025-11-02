import { IconButton } from '@/components';
import { useMountTrigger } from '@/hooks';
import { useActions, useActiveNote, useActiveNotePosition } from '@/store';
import { cn } from '@/utils';
import { Label, NoteToolbar, TextEdit } from './';

const NoteActive = () => {
  const note = useActiveNote()!;
  const position = useActiveNotePosition();
  const { activeNote } = useActions();
  const isMounted = useMountTrigger();
  const { notes } = useActions();

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-800/60"
      onClick={() => activeNote.set({ id: null, position: null })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'group/note relative flex flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 transition-colors duration-800 ease-in-out',
          'shadow-base fixed transition-all duration-200',
          isMounted ? 'w-note-expanded' : 'w-note-compact',
        )}
        style={{
          backgroundColor: note.colorValue ?? 'var(--color-base)',
          borderColor: note.colorValue ?? 'var(--color-secondary)',
          top: isMounted ? '23%' : position?.top,
          left: isMounted ? '36%' : position?.left,
          transform: isMounted ? 'translateY(-20%)' : undefined,
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
        <TextEdit
          isTitle
          value={note.title}
          onChange={(value: string) => notes.updateTitle(note.id, value)}
          placeholder="Title"
          className="pr-6"
        />
        <TextEdit
          value={note.content}
          onChange={(value: string) => notes.updateContent(note.id, value)}
          placeholder="Take a note..."
        />
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
    </div>
  );
};

export default NoteActive;
