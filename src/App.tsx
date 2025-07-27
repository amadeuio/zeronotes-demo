import { Note } from '@/components';
import { notes as initialNotes } from '@/data';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

const App = () => {
  const [notes, setNotes] = useState(initialNotes);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={notes.map((note) => note.id)}>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
