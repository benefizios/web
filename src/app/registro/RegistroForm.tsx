"use client";

import { useActionState, useState } from "react";
import { signUp, type AuthState } from "@/app/auth/actions";
import { Field } from "@/components/auth/AuthShell";

export default function RegistroForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signUp,
    undefined,
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-brand/40 bg-cream px-5 py-6 text-center">
        <p className="text-3xl">📬</p>
        <p className="mt-2 font-display font-bold text-ink">Revisa tu correo</p>
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
        label="Nombre"
        name="full_name"
        placeholder="Nombre y apellido"
        autoComplete="name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Field
        label="Correo"
        name="email"
        type="email"
        placeholder="tu@correo.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Creando cuenta…" : "Crear cuenta"}
      </button>
      <p className="text-center text-xs text-ink/40">
        Al registrarte aceptas los términos y la política de privacidad.
      </p>
    </form>
  );
}
