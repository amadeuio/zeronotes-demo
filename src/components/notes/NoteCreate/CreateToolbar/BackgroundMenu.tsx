import { COLORS } from '@/constants';
import type { DraftNote } from '@/types';
import type { Dispatch } from 'react';
import { ColorCircle } from '../..';
import type { NoteAction } from '../reducer';

interface BackgroundMenuProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
}

const BackgroundMenu = ({ state, dispatch }: BackgroundMenuProps) => (
  <div className="bg-base shadow-base flex gap-1 rounded-sm p-2">
    {COLORS.map((color) => (
      <ColorCircle
        key={color.label}
        color={color}
        isSelected={state.colorId === color.id}
        onClick={() => dispatch({ type: 'SET_COLOR', payload: color })}
      />
    ))}
  </div>
);

export default BackgroundMenu;
