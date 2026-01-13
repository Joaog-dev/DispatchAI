type DateFieldProps = {
  label: string;
  name?: string;
  value: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function DateField({
  label,
  name,
  value,
  min,
  max,
  disabled,
  onChange,
}: DateFieldProps) {
  return (
    <label className="block text-sm text-slate-600">
      {label}
      <input
        type="date"
        name={name}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={onChange}
        className="mt-2 w-full cursor-pointer rounded-2xl border border-transparent bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-400/60 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      />
    </label>
  );
}
