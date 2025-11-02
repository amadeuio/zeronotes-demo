import { IconButton, MenuTrigger } from '@/components';
import type { DraftNote } from '@/types';
import type { Dispatch } from 'react';
import { BackgroundMenu, MoreMenu } from '.';
import type { NoteAction } from '../reducer';

interface CreateToolbarProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
}

const CreateToolbar = ({ state, dispatch }: CreateToolbarProps) => (
  <div className="-m-2 mt-0 flex items-center gap-x-2">
    <MenuTrigger menu={<BackgroundMenu state={state} dispatch={dispatch} />}>
      <IconButton
        className="p-2"
        iconClassName="text-neutral-300"
        label="Background options"
        iconName="palette"
      />
    </MenuTrigger>
    <IconButton
      className="p-2"
      iconClassName="text-neutral-300"
      label="Archive"
      iconName="archive"
      onClick={() => dispatch({ type: 'SET_ARCHIVED', payload: true })}
    />
    <MenuTrigger menu={<MoreMenu state={state} dispatch={dispatch} />}>
      <IconButton
        className="p-2"
        iconClassName="text-neutral-300"
        label="More"
        iconName="more_vert"
      />
    </MenuTrigger>
  </div>
);

export default CreateToolbar;
