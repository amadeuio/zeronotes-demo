import { Label, Toolbar } from '@/components';
import { Drag } from '@/components/dnd';
import type { Note as NoteType } from '@/types';

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => (
  <Drag key={note.id} id={note.id}>
    <div className="bg-base flex flex-col gap-6 rounded-lg border p-6">
      <div className="font-semibold">{note.title}</div>
      <div>{note.content}</div>
      <div className="flex gap-2">
        {note.labels.map((label) => (
          <Label key={label} label={label} />
        ))}
      </div>
      <Toolbar />
    </div>
  </Drag>
);

export default Note;
