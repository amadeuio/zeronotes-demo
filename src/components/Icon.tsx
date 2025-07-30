import { cn } from "@/utils";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon = ({ name, size = 22, className }: IconProps) => (
  <span
    className={cn('material-symbols-outlined text-primary-dark', className)}
    style={{
      fontSize: `${size}px`,
    }}
  >
    {name}
  </span>
);

export default Icon;
