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
  dragGhost?: React.ReactNode;
}

const Draggable = ({
  children,
  onDragEnd,
  onDragStart,
  onDragStateChange,
  className,
  initialPosition = { x: 0, y: 0 },
  noteId,
  dragGhost,
}: DraggableProps) => {
  const { notesOrder } = useActions();
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState(initialPosition);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const lastOverId = useRef<string | null>(null);

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

    const overId = document
      .elementsFromPoint(e.clientX, e.clientY)
      .map((node) => (node as Element).closest('[data-note-id]') as HTMLElement | null)
      .find((node) => node && !el.contains(node))?.dataset.noteId;

    if (overId && overId !== lastOverId.current) {
      console.debug('Dragging over noteId:', overId, 'current noteId:', noteId);
      notesOrder.reorder(noteId, overId, true);
      lastOverId.current = overId;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    onDragStateChange?.(false);
    lastOverId.current = null;
    onDragEnd?.(translate.x, translate.y);
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
