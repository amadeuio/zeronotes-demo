import { Drag } from '@/components/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { Note as NoteType } from '@/types';

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => (
  <Drag id={note.id}>
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{note.content}</p>
      </CardContent>
    </Card>
  </Drag>
);

export default Note;
