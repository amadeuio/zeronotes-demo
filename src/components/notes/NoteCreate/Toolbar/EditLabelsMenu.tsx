import { Icon } from '@/components';
import { useActions, useFilteredLabels } from '@/store';
import type { DraftNote, Label } from '@/types';
import { useState, type Dispatch } from 'react';
import type { NoteAction } from '../reducer';

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
  state,
  dispatch,
  label,
}: {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
  label: Label;
}) => {
  const isChecked = state.labels.some((l) => l.id === label.id);

  const handleClick = () => {
    if (isChecked) {
      dispatch({ type: 'REMOVE_LABEL', payload: label.id });
    } else {
      dispatch({ type: 'ADD_LABEL', payload: label });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-x-4 py-2 whitespace-nowrap text-white hover:bg-neutral-600"
    >
      <Checkbox checked={isChecked} />
      {label.name}
    </div>
  );
};

export interface EditLabelsMenuProps {
  state: DraftNote;
  dispatch: Dispatch<NoteAction>;
}

const EditLabelsMenu = ({ state, dispatch }: EditLabelsMenuProps) => {
  const [search, setSearch] = useState('');
  const filteredLabels = useFilteredLabels(search);
  const { labels } = useActions();

  const handleCreateLabel = () => {
    const newLabel = labels.create(search);
    dispatch({ type: 'ADD_LABEL', payload: newLabel });
    setSearch('');
  };

  return (
    <div className="shadow-base w-56 rounded-sm bg-neutral-700 py-2 [&>*]:px-4">
      <span>Label note</span>
      <Input value={search} onChange={setSearch} />
      {filteredLabels.length > 0 ? (
        filteredLabels.map((label) => (
          <MenuItem key={label.id} state={state} dispatch={dispatch} label={label} />
        ))
      ) : (
        <CreateLabel name={search} onClick={handleCreateLabel} />
      )}
    </div>
  );
};

export default EditLabelsMenu;
