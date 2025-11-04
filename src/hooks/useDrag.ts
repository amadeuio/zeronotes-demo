import { useActions, useNotesOrder } from '@/store';
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
  const { notesOrder: notesOrderActions } = useActions();
  const [isDragging, setIsDragging] = useState(false);
  const [isDragSession, setIsDragSession] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragStartPositionRef = useRef<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const initialPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const overIdRef = useRef<string | undefined>(undefined);
  const lastOverIdRef = useRef<string | undefined>(undefined);

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }

    if (nodeRef.current) {
      dragStartPositionRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
      };
      initialPositionRef.current = { x: notePosition.x, y: notePosition.y };
      setIsDragSession(true);
    }
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!dragStartPositionRef.current) return;

    // deltaX, deltaY: distance moved since mouse down
    const deltaX = e.clientX - dragStartPositionRef.current.mouseX;
    const deltaY = e.clientY - dragStartPositionRef.current.mouseY;
    const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Start dragging if moved more than threshold
    if (!isDragging && dragDistance > 3) {
      setIsDragging(true);
    }

    // Continue updating during drag
    if (isDragging || dragDistance > 3) {
      setTranslate({
        x: deltaX,
        y: deltaY,
      });

      const rect = nodeRef.current?.getBoundingClientRect();
      if (!rect) return;

      // pointerX, pointerY: position of the mouse relative to the parent element
      const pointerX = initialPositionRef.current.x + deltaX + rect.width / 2;
      const pointerY = initialPositionRef.current.y + deltaY + rect.height / 2;

      const overId = getNoteIdFromPosition(pointerY, pointerX, notesOrder);

      // If we moved to a different position, clear lastOverIdRef
      if (overId !== overIdRef.current) {
        lastOverIdRef.current = undefined;
      }

      // Only update if overId is valid and different from current note
      if (overId && overId !== noteId && overId !== lastOverIdRef.current) {
        lastOverIdRef.current = overId;

        console.log('overIdRef:', overId);
        notesOrderActions.reorder(noteId, overId, true);
      }

      // Update overIdRef to track current position
      overIdRef.current = overId;
    }
  };

  const handleMouseUp = () => {
    dragStartPositionRef.current = null;
    overIdRef.current = undefined;
    lastOverIdRef.current = undefined;
    setIsDragSession(false);
    setIsDragging(false);
    setTranslate({ x: 0, y: 0 });
  };

  useEffect(() => {
    console.log('overIdRef:', overIdRef.current);
  }, [overIdRef.current]);

  useEffect(() => {
    console.log('lastOverIdRef:', lastOverIdRef.current);
  }, [lastOverIdRef.current]);

  useEffect(() => {
    if (isDragSession) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragSession, isDragging, notesOrder]);

  return {
    isDragging,
    translate,
    handleMouseDown,
    nodeRef,
    initialPosition: initialPositionRef.current,
  };
};
