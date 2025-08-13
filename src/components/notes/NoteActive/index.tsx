import { NOTE_WIDTH } from '@/constants';
import { useMountTrigger } from '@/hooks';
import { useActions, useActiveNote, useActiveNotePosition } from '@/store';
import NoteBase from '../NoteBase';

const NoteActive = () => {
  const note = useActiveNote()!;
  const position = useActiveNotePosition();
  const { activeNote } = useActions();
  const isMounted = useMountTrigger();

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-800/60"
      onClick={() => activeNote.set({ id: null, position: null })}
    >
      <NoteBase
        note={note}
        className="shadow-base fixed transition-all duration-200 ease-in-out"
        style={{
          width: isMounted ? NOTE_WIDTH.expanded : NOTE_WIDTH.compact,
          top: isMounted ? '23%' : position?.top,
          left: isMounted ? '36%' : position?.left,
        }}
      />
    </div>
  );
};

export default NoteActive;
