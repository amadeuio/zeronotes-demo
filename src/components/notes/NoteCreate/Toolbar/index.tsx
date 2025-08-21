import { IconButton, MenuTrigger } from '@/components';
import type { DisplayNote } from '@/types';
import MoreMenu from './MoreMenu';

const NoteToolbar = ({ note, setNote }: { note: DisplayNote; setNote: (note: DisplayNote) => void }) => (
  <div className="flex items-center gap-x-2">
    <IconButton label="Background options" iconName="palette" onClick={() => {}} />
    <IconButton label="Archive" iconName="archive" onClick={() => {}} />
    <MenuTrigger menu={<MoreMenu note={note} setNote={setNote} />}>
      <IconButton label="More" iconName="more_vert" />
    </MenuTrigger>
  </div>
);

export default NoteToolbar;
