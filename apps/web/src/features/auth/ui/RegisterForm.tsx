import { Button } from "@/shared/ui/Button";
import { SelectField } from "@/shared/ui/SelectField";
import { TextField } from "@/shared/ui/TextField";

type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
  role: "driver" | "dispatcher";
  loading: boolean;
  error: string | null;
  status: string | null;
  validationError: string | null;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (value: "driver" | "dispatcher") => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function RegisterForm({
  name,
  email,
  password,
  role,
  loading,
  error,
  status,
  validationError,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onRoleChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} aria-busy={loading} className="mt-8 space-y-5">
      <TextField
        label="Nome"
        name="name"
        placeholder="Seu nome"
        autoComplete="name"
        value={name}
        onChange={onNameChange}
        disabled={loading}
      />
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
        autoComplete="new-password"
        value={password}
        onChange={onPasswordChange}
        disabled={loading}
      />
      <SelectField
        label="Perfil"
        value={role}
        onChange={(value) =>
          onRoleChange(value === "dispatcher" ? "dispatcher" : "driver")
        }
        disabled={loading}
        options={[
          {
            value: "driver",
            label: "Motorista",
            description: "Acompanha entregas na rota.",
          },
          {
            value: "dispatcher",
            label: "Despachante",
            description: "Gerencia equipes e entregas.",
          },
        ]}
      />

      <div className="mt-4 flex flex-col gap-4">
        <Button type="submit" disabled={loading} variant="primary">
          Criar conta
        </Button>
      </div>

      {status ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
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
    </form>
  );
}
