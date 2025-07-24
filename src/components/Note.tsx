import type { Note as NoteType } from '@/types';

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => {
  return (
    <div className="flex w-64 flex-col gap-4 rounded-lg border border-zinc-600 p-6 shadow-lg">
      <h2 className="text-lg">{note.title}</h2>
      <p className="text-sm">{note.content}</p>
    </div>
  );
};

export default Note;
