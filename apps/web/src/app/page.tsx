"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AuthPanel } from "@/features/auth/ui/AuthPanel";
import { HeroPanel } from "@/features/overview/ui/HeroPanel";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-amber-50/40 to-transparent" />
      <motion.div
        className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl"
        animate={{ y: [0, -12, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl"
        animate={{ y: [0, 14, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute right-16 top-24 hidden h-40 w-40 rounded-full bg-white/60 blur-3xl lg:block" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-10 lg:pt-16">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80">
              <Image
                src="/appIcon_dispatch.png"
                alt="DispatchAI app icon"
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-500">
                Dispatch
              </p>
              <p className="text-xl font-[var(--font-fraunces)] text-slate-900">
                DispatchAI
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-slate-500 md:flex">
            <span className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-1">
              portal local
            </span>
            <span className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-1">
              realtime
            </span>
          </div>
        </nav>

        <main className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <HeroPanel />
          <AuthPanel />
        </main>
      </div>
    </div>
  );
}
