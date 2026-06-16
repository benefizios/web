import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { activateMembership } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";
import Brand from "@/components/Brand";

export const metadata: Metadata = { title: "Activar membresía" };

export default async function MembresiaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_status")
    .eq("id", user.id)
    .single();
  if (profile?.membership_status === "active") redirect("/cuenta");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(90deg,#ffe693_0%,#fff3cf_100%)] px-5 py-12">
      <div className="relative w-full max-w-md">
        <Link href="/cuenta" className="mb-8 flex justify-center">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={150}
            height={42}
            className="h-7 w-auto"
            unoptimized
          />
        </Link>

        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
          {/* Resumen del plan */}
          <div className="bg-ink px-7 py-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-white/60">Inscripción</p>
                <p className="mt-1 font-display text-3xl font-bold">
                  $199{" "}
                  <span className="text-base font-medium text-white/60">
                    MXN
                  </span>
                </p>
                <p className="text-xs text-white/40">única vez</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Membresía</p>
                <p className="mt-1 font-display text-3xl font-bold">
                  $99{" "}
                  <span className="text-base font-medium text-white/60">
                    / mes
                  </span>
                </p>
                <p className="text-xs text-white/40">cancela cuando quieras</p>
              </div>
            </div>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/50">
              Acceso a todos los <Brand /> cerca de ti. Invita amigos y recupera
              tu inscripción: ganas $99 por cada uno.
            </p>
          </div>

          <div className="p-7">
            <div className="mb-5 rounded-xl bg-brand/15 px-4 py-3 text-center text-xs font-semibold text-ink">
              🧪 Pago simulado — todavía no hay cobro real
            </div>

            {/* Formulario de tarjeta (decorativo) */}
            <form action={activateMembership} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink/80">
                  Número de tarjeta
                </span>
                <input
                  disabled
                  placeholder="4242 4242 4242 4242"
                  className="w-full rounded-xl border border-haze bg-mist/50 px-4 py-3 text-sm text-ink/50"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink/80">
                    Vencimiento
                  </span>
                  <input
                    disabled
                    placeholder="12/28"
                    className="w-full rounded-xl border border-haze bg-mist/50 px-4 py-3 text-sm text-ink/50"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink/80">
                    CVV
                  </span>
                  <input
                    disabled
                    placeholder="123"
                    className="w-full rounded-xl border border-haze bg-mist/50 px-4 py-3 text-sm text-ink/50"
                  />
                </label>
              </div>

              <SubmitButton
                pendingLabel="Activando…"
                className="w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                Pagar y activar membresía
              </SubmitButton>
              <p className="text-center text-xs text-ink/40">
                Al activar simulamos un pago exitoso y desbloqueamos tus
                beneficios.
              </p>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink/55">
          <Link href="/cuenta" className="hover:text-ink">
            Volver a mi cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
