import { Menu, MenuTrigger } from '@/components';
import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import type { DisplayNote } from '@/types';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { EditLabelsMenu } from '.';

interface MoreMenuProps {
  note: DisplayNote;
  children: ReactNode;
}

const MoreMenu = ({ note, children }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);
  const { notes } = useStore(selectActions);

  return (
    <MenuTrigger
      recalculateKey={isEditLabel}
      menu={
        isEditLabel ? (
          <EditLabelsMenu note={note} />
        ) : (
          <Menu
            items={[
              {
                label: 'Delete note',
                action: () => notes.trash(note.id),
              },
              {
                label: note.labels.length > 0 ? 'Change labels' : 'Add label',
                action: () => setIsEditLabel(true),
              },
            ]}
          />
        )
      }
    >
      {children}
    </MenuTrigger>
  );
};

export default MoreMenu;
