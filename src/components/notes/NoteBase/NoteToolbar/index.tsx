import { IconButton, MenuTrigger } from '@/components';
import type { DisplayNote } from '@/types';
import MoreMenu from './MoreMenu';

const NoteToolbar = ({ note }: { note: DisplayNote }) => (
  <div className="flex items-center gap-x-2">
    <IconButton label="Background options" iconName="palette" onClick={() => {}} />
    <IconButton label="Archive" iconName="archive" onClick={() => {}} />
    <MenuTrigger menu={<MoreMenu note={note} />}>
      <IconButton label="More" iconName="more_vert" />
    </MenuTrigger>
  </div>
);

export default NoteToolbar;
