import { Note } from '@/components';
import { Drop } from '@/components/dnd';
import { notes as initialNotes } from '@/data';
import { useState } from 'react';

const App = () => {
  const [notes, setNotes] = useState(initialNotes);

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
