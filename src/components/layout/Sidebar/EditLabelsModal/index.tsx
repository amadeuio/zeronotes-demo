import { useLabels } from '@/store';
import CreateLabel from './CreateLabel';
import EditLabel from './EditLabel';

const EditLabelsModal = ({ onClose }: { onClose: () => void }) => {
  const labels = useLabels();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-base flex w-80 flex-col gap-y-4 rounded-lg bg-neutral-800 p-4"
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

export default EditLabelsModal;
