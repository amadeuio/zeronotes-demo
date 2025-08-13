import { Menu } from '@/components';
import type { DisplayNote } from '@/types';
import { useState } from 'react';
import EditLabelsMenu from './EditLabelsMenu';

interface MoreMenuProps {
  note: DisplayNote;
}

const MoreMenu = ({ note }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  return isEditLabel ? (
    <EditLabelsMenu note={note} />
  ) : (
    <Menu
      items={[
        {
          label: 'Delete note',
          action: () => {},
        },
        {
          label: note.labels.length > 0 ? 'Change labels' : 'Add label',
          action: () => setIsEditLabel(true),
        },
      ]}
    />
  );
};

export default MoreMenu;
