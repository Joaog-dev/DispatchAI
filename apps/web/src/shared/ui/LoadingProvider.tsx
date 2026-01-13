"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { PortalLoader } from "@/shared/ui/PortalLoader";

type LoadingContextValue = {
  active: boolean;
  label: string;
  show: (label?: string) => void;
  hide: () => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("carregando");

  const show = useCallback((nextLabel?: string) => {
    setLabel(nextLabel ?? "carregando");
    setActive(true);
  }, []);

  const hide = useCallback(() => {
    setActive(false);
  }, []);

  const value = useMemo(
    () => ({
      active,
      label,
      show,
      hide,
    }),
    [active, hide, label, show]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {active ? (
        <div className="fixed inset-0 z-50">
          <PortalLoader label={label} />
        </div>
      ) : null}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
}
