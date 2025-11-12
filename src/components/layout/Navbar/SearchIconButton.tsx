import { Icon } from '@/components';
import { cn } from '@/utils';
import { useState } from 'react';

interface IconButtonProps {
  iconName: string;
  label: string;
  size?: number;
  dark?: boolean;
  className?: string;
  onClick?: () => void;
}
const SeachIconButton = ({
  iconName,
  label,
  size = 24,
  dark = false,
  className,
  onClick,
}: IconButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <button
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors duration-150 ease-in-out hover:bg-neutral-500',
        dark && 'hover:bg-neutral-300',
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <Icon
        size={size}
        name={iconName}
        className={cn(
          'text-neutral-100 transition-colors duration-150 ease-in-out',
          dark && 'text-neutral-500',
        )}
      />
      {isTooltipVisible && (
        <div className="absolute top-full left-1/2 z-20 -translate-x-1/2 translate-y-1 rounded bg-neutral-700 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
          {label}
        </div>
      )}
    </button>
  );
};

export default SeachIconButton;
