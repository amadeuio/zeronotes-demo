import { IconButton, MenuTrigger } from '@/components';
import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { BackgroundMenu, MoreMenu } from '.';

const NoteToolbar = ({ note, className }: { note: DisplayNote; className?: string }) => {
  const { notes } = useStore(selectActions);

  return (
    <div className={cn('flex items-center', className)}>
      {note.isTrashed ? (
        <>
          <IconButton
            className="p-2"
            iconClassName="text-neutral-300"
            size={18}
            label="Restore"
            iconName="restore_from_trash"
            onClick={() => notes.restore(note.id)}
          />
          <IconButton
            className="p-2"
            iconClassName="text-neutral-300"
            size={18}
            label="Delete forever"
            iconName="delete_forever"
            onClick={() => notes.remove(note.id)}
          />
        </>
      ) : (
        <>
          <MenuTrigger menu={<BackgroundMenu note={note} />}>
            <IconButton
              className="p-2"
              iconClassName="text-neutral-300"
              size={18}
              label="Background options"
              iconName="palette"
            />
          </MenuTrigger>
          <IconButton
            className="p-2"
            iconClassName="text-neutral-300"
            size={18}
            label={note.isArchived ? 'Unarchive' : 'Archive'}
            iconName="archive"
            filled={note.isArchived}
            onClick={() => notes.toggleArchive(note.id)}
          />
          <MoreMenu note={note}>
            <IconButton
              className="p-2"
              iconClassName="text-neutral-300"
              size={18}
              label="More"
              iconName="more_vert"
            />
          </MoreMenu>
        </>
      )}
    </div>
  );
};

export default NoteToolbar;
