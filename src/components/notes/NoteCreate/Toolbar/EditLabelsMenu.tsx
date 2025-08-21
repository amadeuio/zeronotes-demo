import { Icon } from '@/components';
import { useActions, useFilteredLabels } from '@/store';
import type { DisplayNote, Label } from '@/types';
import { useState } from 'react';

const Checkbox = ({ checked }: { checked: boolean }) => (
  <div className="relative size-[12px] rounded-xs border border-neutral-300">
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
    />
    <Icon name="search" size={14} className="text-neutral-400" />
  </div>
);

const CreateLabel = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-x-2 py-2 whitespace-nowrap text-white hover:bg-neutral-600"
    >
      <Icon name="add" />
      Create '{name}'
    </div>
  );
};

const MenuItem = ({
  note,
  setNote,
  label,
}: {
  note: DisplayNote;
  setNote: (note: DisplayNote) => void;
  label: Label;
}) => {
  const isChecked = note.labels.some((l) => l.id === label.id);

  return (
    <div
      onClick={() =>
        setNote({
          ...note,
          labels: isChecked
            ? note.labels.filter((l) => l.id !== label.id)
            : [...note.labels, label],
        })
      }
      className="flex cursor-pointer items-center gap-x-4 py-2 whitespace-nowrap text-white hover:bg-neutral-600"
    >
      <Checkbox checked={isChecked} />
      {label.name}
    </div>
  );
};

interface LabelNoteMenuProps {
  note: DisplayNote;
  setNote: (note: DisplayNote) => void;
}

const EditLabelsMenu = ({ note, setNote }: LabelNoteMenuProps) => {
  const [search, setSearch] = useState('');
  const filteredLabels = useFilteredLabels(search);
  const { labels } = useActions();

  const handleCreateLabel = () => {
    const newLabel = labels.create(search);
    setNote({ ...note, labels: [...note.labels, newLabel] });
    setSearch('');
  };

  return (
    <div className="shadow-base w-56 rounded-sm bg-neutral-700 py-2 [&>*]:px-4">
      <span>Label note</span>
      <Input value={search} onChange={setSearch} />
      {filteredLabels.length > 0 ? (
        filteredLabels.map((label) => (
          <MenuItem key={label.id} note={note} setNote={setNote} label={label} />
        ))
      ) : (
        <CreateLabel name={search} onClick={handleCreateLabel} />
      )}
    </div>
  );
};

export default EditLabelsMenu;
