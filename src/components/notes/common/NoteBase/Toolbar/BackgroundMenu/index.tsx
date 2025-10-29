import { NOTE_COLORS } from '@/constants';
import type { DisplayNote } from '@/types';
import ColorCircle from './ColorCircle';

interface BackgroundMenuProps {
  note: DisplayNote;
}

const BackgroundMenu = ({ note }: BackgroundMenuProps) => (
  <div className="bg-base shadow-base rounded-sm p-2">
    <div className="flex gap-1">
      {Object.values(NOTE_COLORS).map((color) => (
        <ColorCircle
          key={color.label}
          color={color}
          isSelected={note.color === color.value}
          onClick={() => console.log(color.value)}
        />
      ))}
    </div>
  </div>
);

export default BackgroundMenu;
