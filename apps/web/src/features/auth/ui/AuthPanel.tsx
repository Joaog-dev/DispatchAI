"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useAuthPanel } from "../model/useAuthPanel";
import { useAuthStore } from "../model/useAuthStore";
import { AuthToggle } from "./AuthToggle";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthPanel() {
  const { mode, status, loginForm, registerForm, switchMode } = useAuthPanel();
  const { logout } = useAuthStore();
  const isRegister = mode === "register";

  return (
    <section className="relative">
      <div className="absolute -inset-4 rounded-4xl bg-white/40 blur-2xl" />
      <motion.div
        className="relative rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-500">
              acesso seguro
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {isRegister ? "Criar conta" : "Entrar no painel"}
            </h2>
          </div>
          <div className="hidden rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:block">
            {isRegister ? "cadastro aberto" : "auth local"}
          </div>
        </div>

        <AuthToggle mode={mode} onChange={switchMode} />

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {isRegister ? (
              <RegisterForm
                name={registerForm.name}
                email={registerForm.email}
                password={registerForm.password}
                role={registerForm.role}
                loading={registerForm.loading}
                error={registerForm.error}
                status={registerForm.status}
                validationError={registerForm.validationError}
                onNameChange={registerForm.handleNameChange}
                onEmailChange={registerForm.handleEmailChange}
                onPasswordChange={registerForm.handlePasswordChange}
                onRoleChange={registerForm.handleRoleValueChange}
                onSubmit={registerForm.handleSubmit}
              />
            ) : (
              <LoginForm
                email={loginForm.email}
                password={loginForm.password}
                loading={loginForm.loading}
                error={loginForm.error}
                validationError={loginForm.validationError}
                status={status}
                user={loginForm.user}
                onEmailChange={loginForm.handleEmailChange}
                onPasswordChange={loginForm.handlePasswordChange}
                onSubmit={loginForm.handleSubmit}
                onLogout={logout}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-200/70 bg-white/60 px-4 py-3 text-xs text-slate-500">
          Dica: use o admin local para criar novos usuarios e equipes.
        </div>
      </motion.div>
    </section>
  );
}
