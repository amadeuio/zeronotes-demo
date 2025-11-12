import { useClickOutside, useOverflowCorrection } from '@/hooks';
import { useRef, useState, type ReactNode } from 'react';

interface MenuTriggerProps {
  children: ReactNode;
  menu: ReactNode;
  onClickOutside?: () => void;
  recalculateKey?: boolean;
}

const MenuTrigger = ({
  children,
  menu,
  onClickOutside,
  recalculateKey,
}: MenuTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = () => {
    setIsOpen(false);
    onClickOutside?.();
  };
  const { triggerRef } = useClickOutside(handleClickOutside);
  const offset = useOverflowCorrection({
    isVisible: isOpen,
    elementRef: menuRef,
    triggerRef,
    recalculateKey,
  });

  return (
    <div className="relative" ref={triggerRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 z-10"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          {menu}
        </div>
      )}
    </div>
  );
};

export default MenuTrigger;
