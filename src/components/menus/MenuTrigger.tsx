import { useEffect, useRef, useState, type ReactNode } from 'react';

interface MenuTriggerProps {
  children: ReactNode;
  menu: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const MenuTrigger = ({ children, menu, isOpen, onClose }: MenuTriggerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsVisible(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  return (
    <div className="relative" ref={triggerRef}>
      <div onClick={() => setIsVisible(!isVisible)}>{children}</div>
      {isVisible && <div className="absolute top-full left-0 z-10">{menu}</div>}
    </div>
  );
};

export default MenuTrigger;
