import { useEffect, useState, type RefObject } from 'react';

interface UseOverflowCorrectionProps {
  isVisible: boolean;
  elementRef: RefObject<HTMLElement | null>;
  triggerRef?: RefObject<HTMLElement | null>;
  margin?: number;
  recalculateOverflowCorrection?: boolean;
}

export const useOverflowCorrection = ({
  isVisible,
  elementRef,
  triggerRef,
  margin = 8,
  recalculateOverflowCorrection,
}: UseOverflowCorrectionProps) => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const calculateOverflowCorrection = () => {
    if (!isVisible || !elementRef.current || !triggerRef?.current) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const elementRect = elementRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let x = 0;
    let y = 0;

    // Horizontal overflow
    if (elementRect.right > viewport.width) {
      x = viewport.width - elementRect.right - margin;
    } else if (elementRect.left < 0) {
      x = -elementRect.left + margin;
    }

    // Vertical overflow
    if (elementRect.bottom > viewport.height) {
      y = -elementRect.height - triggerRect.height - 6;
    } else if (elementRect.top < 0) {
      y = triggerRect.height + margin + 6;
    }

    setOffset({ x, y });
  };

  useEffect(() => {
    calculateOverflowCorrection();
  }, [isVisible, margin, recalculateOverflowCorrection]);

  return offset;
};
