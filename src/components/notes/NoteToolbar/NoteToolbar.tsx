import { IconButton, MenuTrigger } from '@/components';
import { useActions } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { BackgroundMenu, MoreMenu } from '.';

const NoteToolbar = ({ note, className }: { note: DisplayNote; className?: string }) => {
  const { notes } = useActions();

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
          <MenuTrigger menu={<MoreMenu note={note} />}>
            <IconButton
              className="p-2"
              iconClassName="text-neutral-300"
              size={18}
              label="More"
              iconName="more_vert"
            />
          </MenuTrigger>
        </>
      )}
    </div>
  );
};

export default NoteToolbar;
