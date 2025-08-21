import { IconButton, MenuTrigger } from '@/components';
import type { DraftNote } from '@/types';
import type { Dispatch } from 'react';
import type { NoteAction } from '../reducer';
import MoreMenu from './MoreMenu';

interface NoteToolbarProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
}

const NoteToolbar = ({ state, dispatch }: NoteToolbarProps) => (
  <div className="flex items-center gap-x-2">
    <IconButton label="Background options" iconName="palette" onClick={() => {}} />
    <IconButton
      label="Archive"
      iconName="archive"
      onClick={() => dispatch({ type: 'SET_ARCHIVED', payload: true })}
    />
    <MenuTrigger menu={<MoreMenu state={state} dispatch={dispatch} />}>
      <IconButton label="More" iconName="more_vert" />
    </MenuTrigger>
  </div>
);

export default NoteToolbar;
