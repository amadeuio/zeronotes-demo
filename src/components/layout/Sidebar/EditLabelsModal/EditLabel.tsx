import { IconButton } from '@/components';
import { useActions } from '@/store';
import { useState } from 'react';
import LabelInput from './common/LabelInput';

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
        <IconButton iconName="label" label="Label" size={18} />
        <LabelInput
          value={labelName}
          onChange={setLabelName}
          onClick={() => setIsEditing(true)}
          placeholder="Enter label name"
        />
      </div>
      <div className="flex items-center">
        {isEditing ? (
          <IconButton
            className="size-9.5"
            iconName="check"
            label="Save"
            size={18}
            onClick={handleSave}
          />
        ) : (
          <IconButton
            className="size-9.5"
            iconName="edit"
            label="Edit"
            size={18}
            onClick={() => setIsEditing(true)}
          />
        )}
        <IconButton iconName="delete" label="Delete" size={18} onClick={() => labels.remove(id)} />
      </div>
    </div>
  );
};

export default EditLabel;
