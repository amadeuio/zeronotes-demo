import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Note as NoteType } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: note.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    cursor: isDragging ? 'move' : 'default',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-lg">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{note.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Note;
