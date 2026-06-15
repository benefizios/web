"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signIn, type AuthState } from "@/app/auth/actions";
import { Field } from "@/components/auth/AuthShell";
import Turnstile from "@/components/auth/Turnstile";

export default function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signIn,
    undefined,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <Field
        label="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Turnstile />
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
