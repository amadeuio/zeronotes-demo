import { IconButton, MoreMenu } from '@/components';
import type { DisplayNote } from '@/types';

interface ToolbarItemType {
  id: string;
  label: string;
  iconName: string;
  onClick?: () => void;
}

const ToolbarItem = ({ label, iconName, onClick }: ToolbarItemType) => (
  <IconButton label={label} iconName={iconName} onClick={onClick} />
);

const Toolbar = ({ note }: { note: DisplayNote }) => {
  const toolbarItems = [
    {
      id: 'background-options',
      label: 'Background options',
      iconName: 'palette',
      onClick: () => {},
    },
    {
      id: 'archive',
      label: 'Archive',
      iconName: 'archive',
      onClick: () => {},
    },
    {
      id: 'more',
      label: 'More',
      iconName: 'more_vert',
    },
  ];

  return (
    <div className="flex items-center gap-x-2">
      {toolbarItems.map((item) =>
        item.id === 'more' ? (
          <MoreMenu note={note}>
            <ToolbarItem key={item.id} {...item} />
          </MoreMenu>
        ) : (
          <ToolbarItem key={item.id} {...item} />
        ),
      )}
    </div>
  );
};

export default Toolbar;
