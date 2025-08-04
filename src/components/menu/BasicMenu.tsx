import { cn } from '@/utils';

interface MenuProps {
  items: MenuItemProps[];
  className?: string;
}

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => (
  <div
    onClick={onClick}
    className="cursor-pointer px-6 py-2 whitespace-nowrap text-white hover:bg-neutral-700"
  >
    {label}
  </div>
);

const BasicMenu = ({ items, className }: MenuProps) => (
  <div
    className={cn(
      'bg-base w-42 rounded-sm py-2 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]',
      className,
    )}
  >
    {items.map((item) => (
      <MenuItem key={item.label} {...item} />
    ))}
  </div>
);

export default BasicMenu;
