type PortalLoaderProps = {
  label?: string;
  fullScreen?: boolean;
  size?: "lg" | "sm";
  className?: string;
};

export function PortalLoader({
  label = "carregando portal",
  fullScreen = true,
  size = "lg",
  className,
}: PortalLoaderProps) {
  const containerBase = fullScreen
    ? "relative flex min-h-screen items-center justify-center overflow-hidden"
    : "relative flex items-center justify-center";
  const containerClass = className
    ? `${containerBase} ${className}`
    : containerBase;
  const cardClass =
    size === "sm"
      ? "relative flex flex-col items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/80 px-7 py-6 shadow-2xl backdrop-blur-xl"
      : "relative flex flex-col items-center gap-6 rounded-3xl border border-slate-200/70 bg-white/80 px-10 py-8 shadow-2xl backdrop-blur-xl";
  const iconClass =
    size === "sm"
      ? "flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
      : "flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white";
  const barClass = size === "sm" ? "h-1.5 w-32" : "h-2 w-48";

  return (
    <div
      className={containerClass}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {fullScreen ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-amber-50/40 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
        </>
      ) : null}

      <div className={cardClass}>
        <div className={iconClass}>DA</div>
        <div className={`${barClass} overflow-hidden rounded-full bg-emerald-100`}>
          <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-400/60" />
        </div>
        <p className="text-xs uppercase tracking-widest text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}
