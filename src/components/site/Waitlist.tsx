"use client";

import { useActionState, useState } from "react";
import { joinWaitlist, type AuthState } from "@/app/auth/actions";
import Brand from "@/components/Brand";
import Reveal from "@/components/Reveal";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, action, pending] = useActionState<AuthState, FormData>(
    joinWaitlist,
    undefined,
  );

  const sent = state?.success === "ok";

  return (
    <section className="relative overflow-hidden bg-cream">
      <Reveal className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Sé de los primeros en{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">ahorrar</span>
            <span className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-brand/60" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink/60">
          Déjanos tu correo y te avisamos apenas <Brand /> esté disponible en tu
          ciudad.
        </p>

        {sent ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-brand/40 bg-white px-6 py-5">
            <p className="font-display font-bold text-ink">¡Listo! 🎉</p>
            <p className="mt-1 text-sm text-ink/60">
              Te sumamos a la lista. Te escribimos a <b>{email}</b> muy pronto.
            </p>
          </div>
        ) : (
          <form
            action={action}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-full border border-haze bg-white px-5 py-3.5 text-sm text-ink outline-none transition-colors duration-200 focus:border-brand"
            />
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 ease-snappy hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60"
            >
              {pending ? "Enviando…" : "Avísame"}
            </button>
          </form>
        )}

        {state?.error && (
          <p className="mt-3 text-xs font-medium text-red-600">{state.error}</p>
        )}
        <p className="mt-3 text-xs text-ink/40">
          Sin spam. Solo te escribimos para el lanzamiento.
        </p>
      </Reveal>
    </section>
  );
}
