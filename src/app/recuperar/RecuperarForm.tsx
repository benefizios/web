"use client";

import { useActionState, useState } from "react";
import { requestPasswordReset, type AuthState } from "@/app/auth/actions";
import { Field } from "@/components/auth/AuthShell";
import Turnstile from "@/components/auth/Turnstile";

export default function RecuperarForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    requestPasswordReset,
    undefined,
  );
  const [email, setEmail] = useState("");

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-brand/40 bg-cream px-5 py-6 text-center">
        <p className="text-3xl">✉️</p>
        <p className="mt-2 font-display font-bold text-ink">Enlace enviado</p>
        <p className="mt-1 text-sm text-ink/60">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <Field
        label="Correo"
        name="email"
        type="email"
        placeholder="tu@correo.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Turnstile />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar enlace"}
      </button>
    </form>
  );
}
