import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import { useRef, useState, type MouseEvent, type RefObject } from 'react';

interface UseDragProps {
  noteId: string;
  notePosition: { x: number; y: number };
  noteRef: RefObject<HTMLDivElement | null>;
}

export const useDrag = ({ noteId, notePosition, noteRef }: UseDragProps) => {
  const { notesOrder } = useStore(selectActions);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartPos = useRef<{
    mouseX: number;
    mouseY: number;
    offsetX: number;
    offsetY: number;
  }>({ mouseX: 0, mouseY: 0, offsetX: 0, offsetY: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }

    if (noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect();
      dragStartPos.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!dragStartPos.current) return;

    const dx = e.clientX - dragStartPos.current.mouseX;
    const dy = e.clientY - dragStartPos.current.mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!isDragging && distance > 3) {
      setIsDragging(true);
      setTranslate({
        x: dx,
        y: dy,
      });

      const pointerX = notePosition.x + dx + dragStartPos.current.offsetX;
      const pointerY = notePosition.y + dy + dragStartPos.current.offsetY;

      notesOrder.reorderFromPointer(noteId, pointerX, pointerY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartPos.current = { mouseX: 0, mouseY: 0, offsetX: 0, offsetY: 0 };
    setTranslate({ x: 0, y: 0 });

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return {
    isDragging,
    translate,
    handleMouseDown,
  };
};
