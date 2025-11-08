import { NoteCreate, NoteView } from '@/components';
import { useResponsiveGrid } from '@/hooks';
import { useStore } from '@/store';
import { selectDisplayNotes } from '@/store/selectors';
import { useRef } from 'react';
import EmptyState from './EmptyState';

const Main = () => {
  const notes = useStore(selectDisplayNotes);
  const containerRef = useRef<HTMLDivElement>(null);
  useResponsiveGrid(containerRef);

  return (
    <main className="flex flex-1 flex-col items-center gap-20 overflow-y-auto p-4 py-8">
      <NoteCreate />
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div ref={containerRef} className="relative w-full">
          {notes.map((note) => (
            <NoteView key={note.id} note={note} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Main;
