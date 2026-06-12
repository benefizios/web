"use client";

import { useActionState } from "react";
import { updatePassword, type AuthState } from "@/app/auth/actions";
import { Field } from "@/components/auth/AuthShell";

export default function ActualizarForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    updatePassword,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <Field
        label="Nueva contraseña"
        name="password"
        type="password"
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
      />
      <Field
        label="Repetir contraseña"
        name="confirm"
        type="password"
        placeholder="Repite la contraseña"
        autoComplete="new-password"
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar contraseña"}
      </button>
    </form>
  );
}
