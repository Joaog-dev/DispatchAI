"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

type AnimatedSelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function AnimatedSelect({
  value,
  options,
  onChange,
  disabled = false,
}: AnimatedSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-white/80 px-4 py-3 text-left text-slate-900 shadow-sm outline-none transition focus:border-emerald-400/60 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold">{selected?.label}</span>
        <span
          className={`ml-4 text-xs text-slate-500 transition ${
            open ? "rotate-180" : ""
          }`}
        >
          v
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-2xl backdrop-blur-xl"
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {options.map((option) => {
              const isSelected = option.value === selected?.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-start justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-900 hover:bg-slate-50"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div>
                    <p className="font-semibold">{option.label}</p>
                    {option.description ? (
                      <p className="text-xs text-slate-500">
                        {option.description}
                      </p>
                    ) : null}
                  </div>
                  {isSelected ? (
                    <span className="text-xs font-semibold">*</span>
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
