interface LabelProps {
  label: string;
}

const Label = ({ label }: LabelProps) => (
  <div className="flex gap-2 rounded-full border px-2.5 py-0.5 text-[11px]">{label}</div>
);

export default Label;
