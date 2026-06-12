"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, type AuthState } from "@/app/auth/actions";
import { Field } from "@/components/auth/AuthShell";

export default function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signIn,
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
        label="Correo"
        name="email"
        type="email"
        placeholder="tu@correo.com"
        autoComplete="email"
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Iniciar sesión"}
      </button>
      <p className="text-center text-sm">
        <Link href="/recuperar" className="text-ink/55 hover:text-ink">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
    </form>
  );
}
