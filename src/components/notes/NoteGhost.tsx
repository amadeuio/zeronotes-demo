import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { TextView } from './';

interface NoteGhostProps {
  note: DisplayNote;
  translate: { x: number; y: number };
  initialPosition: { x: number; y: number };
}

const NoteGhost = ({ note, translate, initialPosition }: NoteGhostProps) => (
  <div
    className={cn(
      'w-note-compact absolute z-50 flex cursor-move flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 opacity-96 shadow-[0_1px_12px_rgba(0,0,0,0.5)] select-none',
    )}
    style={{
      transform: `translate(${initialPosition.x + translate.x}px, ${initialPosition.y + translate.y}px)`,
      backgroundColor: note.colorValue ?? 'var(--color-base)',
      borderColor: note.colorValue ?? 'var(--color-secondary)',
      height: 200,
    }}
  >
    <TextView isTitle value={note.title} searchTerm={''} />
    <TextView value={note.id} searchTerm={''} />
  </div>
);

export default NoteGhost;
