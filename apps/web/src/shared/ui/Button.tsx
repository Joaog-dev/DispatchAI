type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  fullWidth = true,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer";
  const width = fullWidth ? "w-full" : "";
  const variants = {
    primary:
      "bg-slate-900 text-white hover:-translate-y-0.5 hover:shadow-lg",
    secondary:
      "border border-slate-200/70 bg-white/70 text-slate-900 hover:-translate-y-0.5 hover:bg-white",
    ghost: "text-slate-600 hover:text-slate-900",
  };

  const classes = [base, width, variants[variant], className]
    .filter(Boolean)
    .join(" ");

  return <button {...props} className={classes} />;
}
