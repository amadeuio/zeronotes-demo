import { Note, NoteCreate } from '@/components';
import { useDisplayNotes } from '@/store';

const Main = () => {
  const notes = useDisplayNotes();

  return (
    <main className="flex w-full flex-col items-center gap-4 p-4">
      <NoteCreate className="mb-22" />
      <div className="grid w-full grid-cols-[repeat(3,auto)] justify-start gap-4">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
};

export default Main;
