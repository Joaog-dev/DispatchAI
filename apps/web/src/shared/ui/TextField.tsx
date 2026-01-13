type TextFieldProps = {
  label: string;
  type?: "text" | "email" | "password" | "search";
  name?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextField({
  label,
  type = "text",
  name,
  value,
  placeholder,
  autoComplete,
  inputMode,
  disabled,
  required,
  onChange,
}: TextFieldProps) {
  return (
    <label className="block text-sm text-slate-600">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        disabled={disabled}
        required={required}
        onChange={onChange}
        className="mt-2 w-full cursor-text rounded-2xl border border-transparent bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-400/60 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      />
    </label>
  );
}
