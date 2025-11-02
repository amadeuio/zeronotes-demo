import { Menu } from '@/components';
import type { DraftNote } from '@/types';
import { useState, type Dispatch } from 'react';
import { EditLabelsMenu } from '.';
import type { NoteAction } from '../reducer';

interface MoreMenuProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
}

const MoreMenu = ({ state, dispatch }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  return isEditLabel ? (
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
  );
};

export default MoreMenu;
