import { Icon } from '@/components';
import { useActions, useFilteredLabels, useNoteHasLabel } from '@/store';
import type { Note } from '@/types';
import { useState } from 'react';

const Checkbox = ({ checked }: { checked: boolean }) => (
  <div className="relative size-[12px] rounded-xs border border-neutral-300">
    {checked && (
      <Icon name="check" size={12} className="absolute top-0 -left-[1px] text-neutral-300" />
    )}
  </div>
);

const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
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

const MenuItem = ({ noteId, label }: { noteId: string; label: string }) => {
  const { toggleNoteLabel } = useActions();
  const isChecked = useNoteHasLabel(noteId, label);

  return (
    <div
      onClick={() => toggleNoteLabel(noteId, label)}
      className="flex cursor-pointer items-center gap-x-4 py-2 whitespace-nowrap text-white hover:bg-neutral-600"
    >
      <Checkbox checked={isChecked} />
      {label}
    </div>
  );
};

interface EditLabelMenuProps {
  note: Note;
}

const EditLabelMenu = ({ note }: EditLabelMenuProps) => {
  const [search, setSearch] = useState('');
  const filteredLabels = useFilteredLabels(search);
  const { createLabelAndAddToNote } = useActions();

  const handleCreateLabel = () => {
    createLabelAndAddToNote(search, note.id);
    setSearch('');
  };

  return (
    <div className="w-56 rounded-sm bg-neutral-700 py-2 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)] [&>*]:px-4">
      <span>Label note</span>
      <SearchInput value={search} onChange={setSearch} />
      {filteredLabels.length > 0 ? (
        filteredLabels.map((label) => <MenuItem key={label} noteId={note.id} label={label} />)
      ) : (
        <CreateLabel name={search} onClick={handleCreateLabel} />
      )}
    </div>
  );
};

export default EditLabelMenu;
