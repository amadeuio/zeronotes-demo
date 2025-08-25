import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils';

interface DraggableProps {
  children: React.ReactNode;
  onDragEnd?: (x: number, y: number) => void;
  className?: string;
  initialPosition?: { x: number; y: number };
}

const Draggable = ({
  children,
  onDragEnd,
  className,
  initialPosition = { x: 0, y: 0 },
}: DraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState(initialPosition);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
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
    const parent = el?.parentElement;
    if (el && parent) {
      const parentRect = parent.getBoundingClientRect();
      const child = el.firstElementChild as HTMLElement | null;
      if (!child) return;
      const rect = child.getBoundingClientRect();
      const relX = rect.left - parentRect.left;
      const relY = rect.top - parentRect.top;
      console.debug('Draggable position (relative to parent):', { x: relX, y: relY });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
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
