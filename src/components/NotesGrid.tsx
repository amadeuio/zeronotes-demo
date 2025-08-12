import { Note } from '@/components';
import { useDisplayNotes } from '@/store';

const NotesGrid = () => {
  const notes = useDisplayNotes();

  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </main>
  );
};

export default NotesGrid;
