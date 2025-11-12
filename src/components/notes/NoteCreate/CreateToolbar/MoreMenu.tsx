import { Menu, MenuTrigger } from '@/components';
import type { DraftNote } from '@/types';
import { useState, type Dispatch, type ReactNode } from 'react';
import { EditLabelsMenu } from '.';
import type { NoteAction } from '../reducer';

interface MoreMenuProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
  children: ReactNode;
}

const MoreMenu = ({ state, dispatch, children }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  return (
    <MenuTrigger
      menu={
        isEditLabel ? (
          <EditLabelsMenu state={state} dispatch={dispatch} />
        ) : (
          <Menu
            items={[
              {
                label: 'Add label',
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
