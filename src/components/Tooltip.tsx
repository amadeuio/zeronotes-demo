import { useState, type ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div className="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 transform rounded bg-neutral-700 px-2 py-1 text-sm whitespace-nowrap text-white shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
