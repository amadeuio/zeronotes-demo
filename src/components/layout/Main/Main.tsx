import { NoteCreate, NoteView } from '@/components';
import { useSetGridColumns } from '@/hooks';
import {
  selectDisplayNotes,
  selectHasPinnedNotes,
  selectNotesTotalWidth,
  selectPinnedSectionHeight,
  useStore,
} from '@/store';
import { useRef } from 'react';
import EmptyState from './EmptyState';
import SectionTitle from './SectionTitle';

const Main = () => {
  const notes = useStore(selectDisplayNotes);
  const hasPinnedNotes = useStore(selectHasPinnedNotes);
  const pinnedSectionHeight = useStore(selectPinnedSectionHeight);
  const notesTotalWidth = useStore(selectNotesTotalWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  useSetGridColumns(containerRef);

  return (
    <main className="flex min-w-0 flex-1 flex-col items-center gap-12 p-4 md:gap-20 md:px-2 md:py-12">
      <NoteCreate />
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div ref={containerRef} className="w-full">
          <div className="relative mx-auto" style={{ width: notesTotalWidth }}>
            {hasPinnedNotes && (
              <>
                <SectionTitle label="PINNED" />
                <SectionTitle label="OTHERS" verticalOffset={pinnedSectionHeight} />
              </>
            )}
            {notes.map((note) => (
              <NoteView key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
