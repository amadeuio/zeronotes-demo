import { COLORS } from '@/constants';
import { useActions } from '@/store';
import type { DisplayNote } from '@/types';
import { ColorCircle } from '../..';

interface BackgroundMenuProps {
  note: DisplayNote;
}

const BackgroundMenu = ({ note }: BackgroundMenuProps) => {
  const { notes } = useActions();

  return (
    <div className="bg-base shadow-base flex gap-1 rounded-sm p-2">
      {COLORS.map((color) => (
        <ColorCircle
          key={color.label}
          color={color}
          isSelected={note.colorId === color.id}
          onClick={() => notes.updateColor(note.id, color.id)}
        />
      ))}
    </div>
  );
};

export default BackgroundMenu;
