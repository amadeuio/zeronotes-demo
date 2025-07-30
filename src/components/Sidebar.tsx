import Icon from '@/components/Icon';
import { useActions, useLabels } from '@/store';

const SidebarItem = ({
  title,
  url,
  iconName,
  onClick,
}: {
  title: string;
  url: string;
  iconName: string;
  onClick?: () => void;
}) => (
  <a href={url} className="flex items-center gap-x-2" onClick={onClick}>
    <Icon name={iconName} />
    <span>{title}</span>
  </a>
);

const Sidebar = () => {
  const labels = useLabels();
  const { setFilters } = useActions();

  return (
    <aside className="flex h-full w-full max-w-70 flex-col gap-6 p-6">
      <SidebarItem
        title="Notes"
        url="#"
        iconName="lightbulb_2"
        onClick={() => setFilters({ label: null })}
      />
      {labels.map((label) => (
        <SidebarItem
          key={label}
          title={label}
          url="#"
          iconName="label"
          onClick={() => setFilters({ label })}
        />
      ))}
      <SidebarItem title="Edit labels" url="#" iconName="edit" />
      <SidebarItem title="Archive" url="#" iconName="archive" />
      <SidebarItem title="Trash" url="#" iconName="delete" />
    </aside>
  );
};

export default Sidebar;
