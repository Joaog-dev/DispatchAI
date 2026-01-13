import { AnimatedSelect } from "@/shared/ui/AnimatedSelect";

type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function SelectField({
  label,
  value,
  options,
  disabled,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-600">{label}</p>
      <AnimatedSelect
        value={value}
        options={options}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
