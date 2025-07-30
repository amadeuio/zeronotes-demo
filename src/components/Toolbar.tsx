import { Button, Icon, Tooltip } from '@/components';

interface ToolbarItemProps {
  label: string;
  iconName: string;
}

const ToolbarItem = ({ iconName, label }: ToolbarItemProps) => (
  <Tooltip content={label}>
    <Button className="rounded-full">
      <Icon size={16} name={iconName} />
    </Button>
  </Tooltip>
);

const toolbarItems = [
  {
    id: 'background-options',
    label: 'Background options',
    iconName: 'palette',
  },
  {
    id: 'archive',
    label: 'Archive',
    iconName: 'archive',
  },
  {
    id: 'more',
    label: 'More',
    iconName: 'more_vert',
  },
];

interface ToolbarProps {}

const Toolbar = ({}: ToolbarProps) => {
  return (
    <div className="flex items-center gap-x-2">
      {toolbarItems.map((item) => (
        <ToolbarItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
