import { Button } from "@/shared/ui/Button";
import { TextField } from "@/shared/ui/TextField";

type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  validationError: string | null;
  status: string | null;
  user: { name: string; email: string } | null;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onLogout: () => void;
};

export function LoginForm({
  email,
  password,
  loading,
  error,
  validationError,
  status,
  user,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onLogout,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} aria-busy={loading} className="mt-8 space-y-5">
      <TextField
        label="Email"
        type="email"
        name="email"
        placeholder="voce@empresa.com"
        autoComplete="email"
        value={email}
        onChange={onEmailChange}
        disabled={loading}
      />
      <TextField
        label="Senha"
        type="password"
        name="password"
        placeholder="********"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
        disabled={loading}
      />

      <div className="mt-4 flex flex-col gap-4">
        <Button type="submit" disabled={loading} variant="primary">
          Entrar
        </Button>
        <Button type="button" disabled={loading} variant="secondary">
          Solicitar acesso
        </Button>
      </div>

      {status ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
          {status}
        </div>
      ) : null}

      {validationError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
          {validationError}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          {error}
        </div>
      ) : null}

      {user ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
          Logado como {user.name} ({user.email})
        </div>
      ) : null}

      {user ? (
        <Button type="button" onClick={onLogout} variant="ghost" fullWidth={false}>
          Sair
        </Button>
      ) : null}
    </form>
  );
}
