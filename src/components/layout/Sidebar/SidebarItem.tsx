import { Icon } from '@/components';
import { cn } from '@/utils';

const SidebarItem = ({
  title,
  url,
  iconName,
  onClick,
  isActive,
  isCollapsed,
}: {
  title: string;
  url: string;
  iconName: string;
  onClick?: () => void;
  isActive?: boolean;
  isCollapsed?: boolean;
}) => (
  <a
    href={url}
    className={cn(
      'transition-width flex items-center gap-x-8 overflow-hidden py-3 text-sm font-[500] duration-100 ease-in-out',
      isActive ? 'bg-[#41331c]' : 'hover:bg-white/6',
      isCollapsed
        ? 'ml-2.75 w-12 rounded-full pl-3.25 group-hover:ml-0 group-hover:w-70 group-hover:rounded-r-full group-hover:pl-6'
        : 'ml-0 w-70 rounded-r-full pl-6',
    )}
    onClick={onClick}
  >
    <Icon light={isActive} size={24} name={iconName} />
    <span className="whitespace-nowrap">{title}</span>
  </a>
);

export default SidebarItem;
