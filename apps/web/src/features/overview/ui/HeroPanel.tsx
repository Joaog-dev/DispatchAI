"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const itemFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export function HeroPanel() {
  return (
    <section className="space-y-8">
      <motion.div
        className="flex justify-center"
        {...itemFade}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src="/logo_dispatch.png"
          alt="DispatchAI logo"
          width={720}
          height={240}
          className="h-28 w-auto sm:h-36 lg:h-44 xl:h-52"
          priority
        />
      </motion.div>

      <motion.div
        className="space-y-5"
        {...itemFade}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
      >
        <p className="text-sm uppercase tracking-widest text-slate-500">
          Controle total das entregas
        </p>
        <h1 className="text-4xl font-[var(--font-fraunces)] leading-tight text-slate-900 sm:text-5xl">
          Um painel vivo para despacho, rotas e decisao rapida.
        </h1>
        <p className="max-w-xl text-lg text-slate-600">
          DispatchAI conecta tracking em tempo real, alertas e IA local
          para voce enxergar cada entrega com clareza.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-3"
        {...itemFade}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      >
        {[
          { label: "Entregas ativas", value: "18" },
          { label: "ETA medio", value: "27 min" },
          { label: "Alertas hoje", value: "3" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500">
              {item.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {item.value}
            </p>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-3/4 rounded-full bg-emerald-400/70" />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-3 text-sm text-slate-600"
        {...itemFade}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
      >
        <span className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2">
          tracking ao vivo
        </span>
        <span className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2">
          mapas e ETA
        </span>
        <span className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2">
          assistente IA local
        </span>
      </motion.div>
    </section>
  );
}
