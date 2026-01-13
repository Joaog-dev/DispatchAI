type AuthToggleProps = {
  mode: "login" | "register";
  onChange: (nextMode: "login" | "register") => void;
};

export function AuthToggle({ mode, onChange }: AuthToggleProps) {
  return (
    <div className="mt-6 flex gap-2 rounded-full border border-slate-200/70 bg-white/70 p-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
      <button
        type="button"
        onClick={() => onChange("login")}
        className={`flex-1 cursor-pointer rounded-full px-3 py-2 transition ${
          mode === "login" ? "bg-slate-900 text-white" : "text-slate-500"
        }`}
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={() => onChange("register")}
        className={`flex-1 cursor-pointer rounded-full px-3 py-2 transition ${
          mode === "register"
            ? "bg-slate-900 text-white"
            : "text-slate-500"
        }`}
      >
        Cadastrar
      </button>
    </div>
  );
}
