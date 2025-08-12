import { BasicMenu, LabelNoteMenu, MenuTrigger } from '@/components';
import type { DisplayNote } from '@/types';
import { useState, type ReactNode } from 'react';

interface MoreMenuProps {
  children: ReactNode;
  note: DisplayNote;
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
      menu={isEditLabel ? <LabelNoteMenu note={note} /> : <BasicMenu items={moreMenuItems} />}
      onClickOutside={() => setIsEditLabel(false)}
    >
      {children}
    </MenuTrigger>
  );
};

export default MoreMenu;
