import { useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react';

interface UseDragReturn {
  isDragging: boolean;
  translate: { x: number; y: number };
  handleMouseDown: (e: MouseEvent) => void;
  nodeRef: RefObject<HTMLDivElement | null>;
}

export const useDrag = (): UseDragReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragSession, setIsDragSession] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragStartPositionRef = useRef<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

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
      setTranslate({
        x: deltaX,
        y: deltaY,
      });
    }
  };

  const handleMouseUp = () => {
    dragStartPositionRef.current = null;
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
  };
};
