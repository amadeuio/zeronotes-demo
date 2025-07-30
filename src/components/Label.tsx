import Icon from '@/components/Icon';

interface LabelProps {
  label: string;
}

const Label = ({ label }: LabelProps) => (
  <div className="group relative min-w-12 rounded-full border px-2.5 py-0.5 text-[11px]">
    <div className="truncate group-hover:w-4/5">{label}</div>
    <Icon
      name="close"
      size={11}
      className="absolute top-[7px] right-1.5 opacity-0 transition-opacity group-hover:opacity-100"
    />
  </div>
);

export default Label;
