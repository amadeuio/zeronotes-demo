import { Note } from '@/components';
import { notes } from '@/data';

const App = () => {
  return (
    <div className="flex h-screen flex-wrap gap-4 bg-zinc-900 p-4 leading-7 text-white">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default App;
