import { Icon } from '@/components';
import { useActions, useFilteredLabels, useNoteHasLabel } from '@/store';
import type { DisplayNote, Label } from '@/types';
import { useState } from 'react';

const Checkbox = ({ checked }: { checked: boolean }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="relative size-[12px] rounded-xs border border-neutral-300"
  >
    {checked && (
      <Icon name="check" size={12} className="absolute top-0 -left-[1px] text-neutral-300" />
    )}
  </div>
);

const Input = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="flex items-center gap-x-2">
    <input
      type="text"
      placeholder="Enter label name"
      className="w-full border-none py-2 text-white outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
    />
    <Icon name="search" size={14} className="text-neutral-400" />
  </div>
);

const CreateLabel = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex cursor-pointer items-center gap-x-2 py-2 whitespace-nowrap text-white hover:bg-white/8"
    >
      <Icon name="add" />
      Create '{name}'
    </div>
  );
};

const MenuItem = ({ noteId, label }: { noteId: string; label: Label }) => {
  const { notes } = useActions();
  const isChecked = useNoteHasLabel(noteId, label.id);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        notes.toggleLabel(noteId, label.id);
      }}
      className="flex cursor-pointer items-center gap-x-4 py-2 whitespace-nowrap text-white hover:bg-white/8"
    >
      <Checkbox checked={isChecked} />
      {label.name}
    </div>
  );
};

interface LabelNoteMenuProps {
  note: DisplayNote;
}

const EditLabelsMenu = ({ note }: LabelNoteMenuProps) => {
  const [search, setSearch] = useState('');
  const filteredLabels = useFilteredLabels(search);
  const { labels } = useActions();

  const handleCreateLabel = () => {
    labels.createAndAddToNote(search, note.id);
    setSearch('');
  };

  return (
    <div className="shadow-base w-56 rounded-sm bg-neutral-700 py-2 text-sm [&>*]:px-4">
      <span>Label note</span>
      <Input value={search} onChange={setSearch} />
      {filteredLabels.length > 0 ? (
        filteredLabels.map((label) => <MenuItem key={label.id} noteId={note.id} label={label} />)
      ) : (
        <CreateLabel name={search} onClick={handleCreateLabel} />
      )}
    </div>
  );
};

export default EditLabelsMenu;
