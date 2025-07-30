import { Button, Icon } from '@/components';

interface LabelProps {
  label: string;
  onClick?: () => void;
  onClose?: () => void;
}

const Label = ({ label, onClick, onClose }: LabelProps) => (
  <div
    className="group relative min-w-12 cursor-pointer rounded-full border px-2.5 py-0.5 text-[11px]"
    onClick={onClick}
  >
    <div className="truncate group-hover:w-4/5">{label}</div>
    <Button
      className="absolute top-[4px] right-[2px] rounded-full p-[2px] opacity-0 group-hover:opacity-100"
      onClick={onClose}
    >
      <Icon name="close" size={11} />
    </Button>
  </div>
);

export default Label;
