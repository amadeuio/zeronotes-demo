import { IconButton } from '@/components';
import { useActions, useLabels } from '@/store';
import { cn } from '@/utils';
import { useState } from 'react';

interface EditableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isEditing?: boolean;
  className?: string;
  onClick?: () => void;
  onBlur?: () => void;
}

const EditableInput = ({
  value,
  onChange,
  placeholder,
  isEditing = false,
  className,
  onClick,
  onBlur,
}: EditableInputProps) => (
  <input
    type="text"
    placeholder={placeholder}
    className={cn(
      'border-none bg-transparent text-white outline-none',
      isEditing && 'focus:shadow-[0_1px_0_0_oklch(55.6%_0_0)]',
      className,
    )}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onClick={onClick}
    onBlur={onBlur}
  />
);

const CreateLabel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState('');
  const { labels } = useActions();

  const handleSave = () => {
    if (labelName.trim()) {
      labels.create(labelName.trim());
      setLabelName('');
      setIsEditing(false);
    }
  };

  return (
    <div className="flex cursor-text justify-between text-white">
      <div className="flex items-center gap-x-2">
        {isEditing ? (
          <IconButton
            iconName="close"
            label="Label"
            onClick={() => {
              setIsEditing(false);
              setLabelName('');
            }}
          />
        ) : (
          <IconButton
            iconName="add"
            label="Label"
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}
        <EditableInput
          value={labelName}
          onChange={setLabelName}
          onClick={() => setIsEditing(true)}
          placeholder="Enter label name"
          isEditing={isEditing}
        />
      </div>
      <IconButton
        className={cn('size-9.5 opacity-0', isEditing && 'opacity-100')}
        iconName="check"
        label="Save"
        onClick={handleSave}
      />
    </div>
  );
};

const EditLabel = ({ id, name }: { id: string; name: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState(name);
  const { labels } = useActions();

  const handleSave = () => {
    if (labelName.trim()) {
      labels.edit(id, labelName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="flex cursor-text justify-between text-white">
      <div className="flex items-center gap-x-2">
        <IconButton iconName="label" label="Label" />
        <EditableInput
          value={labelName}
          onChange={setLabelName}
          onClick={() => setIsEditing(true)}
          placeholder="Enter label name"
          isEditing={isEditing}
        />
      </div>
      <div className="flex items-center">
        {isEditing ? (
          <IconButton className="size-9.5" iconName="check" label="Save" onClick={handleSave} />
        ) : (
          <IconButton
            className="size-9.5"
            iconName="edit"
            label="Edit"
            onClick={() => setIsEditing(true)}
          />
        )}
        <IconButton iconName="delete" label="Delete" onClick={() => labels.remove(id)} />
      </div>
    </div>
  );
};

const EditLabelsMenu = ({ onClose }: { onClose: () => void }) => {
  const labels = useLabels();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-96 flex-col gap-y-4 rounded-lg bg-neutral-800 p-4 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]"
      >
        <span className="pl-1 text-lg font-semibold">Edit labels</span>
        <div className="space-y-2">
          <CreateLabel />
          {labels.map((label) => (
            <EditLabel key={label.id} id={label.id} name={label.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditLabelsMenu;
