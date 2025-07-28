import { Note } from '@/components';
import { Drop } from '@/components/dnd';
import { useActions, useNotes } from '@/store';

const App = () => {
  const notes = useNotes();
  const { setNotes } = useActions();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <Drop items={notes} setItems={setNotes}>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </Drop>
    </div>
  );
};

export default App;
