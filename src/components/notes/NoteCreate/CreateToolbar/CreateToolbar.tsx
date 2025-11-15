import { ColorCircle, IconButton, Menu, MenuTrigger } from '@/components';
import { COLORS } from '@/constants';
import type { Color, DraftNote } from '@/types';
import { useState, type Dispatch, type ReactNode } from 'react';
import type { NoteAction } from '../reducer';
import EditLabelsMenu from './EditLabelsMenu';

interface BackgroundMenuProps {
  colors: Color[];
  selectedColorId: string | null;
  onColorClick: (color: Color) => void;
}

const BackgroundMenu = ({ colors, selectedColorId, onColorClick }: BackgroundMenuProps) => (
  <div className="bg-base shadow-base flex gap-1 rounded-sm p-2">
    {colors.map((color) => (
      <ColorCircle
        key={color.label}
        color={color}
        isSelected={selectedColorId === color.id}
        onClick={() => onColorClick(color)}
      />
    ))}
  </div>
);

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

interface CreateToolbarProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
}

const CreateToolbar = ({ state, dispatch }: CreateToolbarProps) => (
  <div className="-m-2 mt-0 flex items-center gap-x-2">
    <MenuTrigger
      menu={
        <BackgroundMenu
          colors={COLORS}
          selectedColorId={state.colorId}
          onColorClick={(color) => dispatch({ type: 'SET_COLOR', payload: color })}
        />
      }
    >
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
    <MoreMenu state={state} dispatch={dispatch}>
      <IconButton
        className="p-2"
        iconClassName="text-neutral-300"
        label="More"
        iconName="more_vert"
      />
    </MoreMenu>
  </div>
);

export default CreateToolbar;
