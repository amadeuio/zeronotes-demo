import { Icon } from '@/components';
import { useTooltipPosition } from '@/hooks';
import type { Color } from '@/types';
import { cn } from '@/utils';
import { useRef, useState } from 'react';

interface ColorCircleProps {
  color: Color;
  isSelected: boolean;
  onClick: () => void;
}

const ColorCircle = ({ color, isSelected, onClick }: ColorCircleProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const position = useTooltipPosition({
    isVisible: isTooltipVisible,
    tooltipRef,
    wrapperRef,
  });
  const isDefault = color.value === null;

  return (
    <div
      ref={wrapperRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      className={cn(
        'relative size-8 cursor-pointer rounded-full transition-all',
        'border-2 border-transparent hover:border-neutral-100',
        isDefault && 'border-neutral-600',
        isSelected && 'border-purple-500 hover:border-purple-500',
      )}
      style={{
        backgroundColor: color.value ?? 'transparent',
      }}
    >
      {isDefault && (
        <Icon
          name="format_color_reset"
          size={18}
          className="absolute top-[5.5px] left-[5px] text-neutral-200"
        />
      )}
      {isSelected && (
        <Icon
          className="absolute -top-1.5 -right-1.5 rounded-full bg-purple-500 text-white"
          name="check"
          size={18}
        />
      )}
      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute rounded bg-neutral-700 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg',
            position === 'bottom' && 'top-full left-1/2 mt-1 -translate-x-1/2',
            position === 'top' && 'bottom-full left-1/2 mb-1 -translate-x-1/2',
            position === 'left' && 'top-full -right-1 mt-1',
            position === 'right' && 'top-full -left-1 mt-1',
          )}
        >
          {color.label}
        </div>
      )}
    </div>
  );
};

export default ColorCircle;
