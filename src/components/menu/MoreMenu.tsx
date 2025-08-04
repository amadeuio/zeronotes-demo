import { BasicMenu, EditLabelMenu, MenuTrigger } from '@/components';
import type { Note } from '@/types';
import { useState, type ReactNode } from 'react';

interface MoreMenuProps {
  children: ReactNode;
  note: Note;
}

const MoreMenu = ({ children, note }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  const moreMenuItems = [
    {
      label: 'Delete note',
      onClick: () => {},
    },
    {
      label: note.labels.length > 0 ? 'Change labels' : 'Add label',
      onClick: () => setIsEditLabel(true),
    },
  ];

  return (
    <MenuTrigger
      menu={isEditLabel ? <EditLabelMenu note={note} /> : <BasicMenu items={moreMenuItems} />}
      onClose={() => setIsEditLabel(false)}
    >
      {children}
    </MenuTrigger>
  );
};

export default MoreMenu;
