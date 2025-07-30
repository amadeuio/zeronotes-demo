import { cn } from '@/utils';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => (
  <button
    className={cn(
      'hover:bg-base-light flex cursor-pointer items-center justify-center p-3',
      className,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
