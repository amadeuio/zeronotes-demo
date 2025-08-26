import { Note, NoteCreate } from '@/components';
import { useDisplayNotes } from '@/store';

const Main = () => {
  const notes = useDisplayNotes();
  const isLong = false;
  const notesToShow = isLong
    ? [...notes, ...notes, ...notes, ...notes, ...notes, ...notes, ...notes, ...notes]
    : notes;

  return (
    <main className="flex w-full flex-col items-center gap-4 p-4">
      <NoteCreate className="mb-22" />
      <div className="relative w-full">
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
};

export default Main;
