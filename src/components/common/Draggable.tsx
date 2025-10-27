import { useNotePosition } from '@/hooks/useNotePosition';
import { useActions } from '@/store';
import { cn } from '@/utils';
import { useEffect, useRef, useState } from 'react';

interface DraggableProps {
  children: React.ReactNode;
  onDragEnd?: (x: number, y: number) => void;
  onDragStart?: () => void;
  onDragStateChange?: (isDragging: boolean) => void;
  className?: string;
  initialPosition?: { x: number; y: number };
  noteId: string;
}

const Draggable = ({
  children,
  onDragEnd,
  onDragStart,
  onDragStateChange,
  className,
  initialPosition = { x: 0, y: 0 },
  noteId,
}: DraggableProps) => {
  const { getNoteIdAtPosition } = useNotePosition();
  const { notesOrder } = useActions();
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState(initialPosition);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [lastOverNoteId, setLastOverNoteId] = useState<string | undefined>();
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onDragStateChange?.(true);
    onDragStart?.();
    setStartPos({
      x: e.clientX - translate.x,
      y: e.clientY - translate.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const next = {
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    };
    setTranslate(next);

    const el = elementRef.current;
    if (!el) return;

    const parentRect = el.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const relativeX = e.clientX - parentRect.left;
    const relativeY = e.clientY - parentRect.top;

    const overId = getNoteIdAtPosition(relativeY, relativeX);

    if (overId && overId !== lastOverNoteId && overId !== noteId) {
      console.debug('last note overId:', lastOverNoteId, 'new note overId:', overId);
      notesOrder.reorder(noteId, overId, true);
      setLastOverNoteId(overId);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    onDragStateChange?.(false);
    onDragEnd?.(translate.x, translate.y);
    setLastOverNoteId(undefined);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseUp, handleMouseMove]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'cursor-grab active:cursor-grabbing',
        isDragging && 'pointer-events-none',
        className,
      )}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.2s',
        willChange: 'transform',
        touchAction: 'none',
        userSelect: 'none',
        position: 'absolute',
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
