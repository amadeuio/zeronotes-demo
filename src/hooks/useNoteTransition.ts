import { useEffect, useState } from 'react';

const DURATION = 200;

interface UseNoteTransitionProps {
  position: { top: number; left: number } | null;
  onClose: () => void;
}

export const useNoteTransition = ({ position, onClose }: UseNoteTransitionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, DURATION);
  };

  const positionStyles = {
    top: isOpen ? '23%' : position?.top,
    left: isOpen ? '36%' : position?.left,
    width: isOpen ? 'var(--width-note-expanded)' : 'var(--width-note-compact)',
    transform: isOpen ? 'translateY(-20%)' : undefined,
    transition: `all ${DURATION}ms ease-in-out`,
  };

  return {
    positionStyles,
    handleClose,
  };
};
