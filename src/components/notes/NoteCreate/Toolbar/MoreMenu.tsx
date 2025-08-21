import { Menu } from '@/components';
import type { DisplayNote } from '@/types';
import { useState } from 'react';
import EditLabelsMenu from './EditLabelsMenu';

interface MoreMenuProps {
  note: DisplayNote;
  setNote: (note: DisplayNote) => void;
}

const MoreMenu = ({ note, setNote }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  return isEditLabel ? (
    <EditLabelsMenu note={note} setNote={setNote} />
  ) : (
    <Menu
      items={[
        {
          label: 'Add label',
          action: () => setIsEditLabel(true),
        },
      ]}
    />
  );
};

export default MoreMenu;
