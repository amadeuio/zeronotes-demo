import { useActions, useFilteredNotes, useNotesOrder } from '@/store';
import { getNoteIdFromPosition } from '@/utils';
import { useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react';

interface UseDragReturn {
  isDragging: boolean;
  translate: { x: number; y: number };
  handleMouseDown: (e: MouseEvent) => void;
  nodeRef: RefObject<HTMLDivElement | null>;
  initialPosition: { x: number; y: number };
}

export const useDrag = ({
  notePosition,
  noteId,
}: {
  notePosition: { x: number; y: number };
  noteId: string;
}): UseDragReturn => {
  const notesOrder = useNotesOrder();
  const notes = useFilteredNotes();
  const { notesOrder: notesOrderActions } = useActions();
  const [isDragging, setIsDragging] = useState(false);
  const [isDragSession, setIsDragSession] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragStartPositionRef = useRef<{
    mouseX: number;
    mouseY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const initialPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const lastOverIdRef = useRef<string | undefined>(undefined);
  const notesOrderRef = useRef<string[]>(notesOrder);

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }

    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      dragStartPositionRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
      initialPositionRef.current = { x: notePosition.x, y: notePosition.y };
      setIsDragSession(true);
    }
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!dragStartPositionRef.current) return;

    const deltaX = e.clientX - dragStartPositionRef.current.mouseX;
    const deltaY = e.clientY - dragStartPositionRef.current.mouseY;
    const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (!isDragging && dragDistance > 3) {
      setIsDragging(true);
      setTranslate({
        x: deltaX,
        y: deltaY,
      });

      const pointerX = initialPositionRef.current.x + deltaX + dragStartPositionRef.current.offsetX;
      const pointerY = initialPositionRef.current.y + deltaY + dragStartPositionRef.current.offsetY;
      const overId = getNoteIdFromPosition(pointerY, pointerX, notesOrderRef.current, notes);

      if (overId && overId !== lastOverIdRef.current) {
        lastOverIdRef.current = overId;
        const newNotesOrder = notesOrderActions.reorder(noteId, overId, true);
        notesOrderRef.current = newNotesOrder;
      }
    }
  };

  const handleMouseUp = () => {
    dragStartPositionRef.current = null;
    lastOverIdRef.current = undefined;
    setIsDragSession(false);
    setIsDragging(false);
    setTranslate({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragSession) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragSession]);

  return {
    isDragging,
    translate,
    handleMouseDown,
    nodeRef,
    initialPosition: initialPositionRef.current,
  };
};
