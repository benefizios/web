import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BenefitsNearby from "./BenefitsNearby";

export const metadata: Metadata = { title: "Beneficios" };

export default async function BeneficiosPage() {
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
  const isActive = profile?.membership_status === "active";

  return (
    <main className="min-h-screen bg-[linear-gradient(90deg,#ffe693_0%,#fff3cf_100%)]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/cuenta">
            <Image
              src="/logo-benefizios.png"
              alt="Benefizios"
              width={130}
              height={36}
              className="h-6 w-auto"
              unoptimized
            />
          </Link>
          <Link
            href="/cuenta"
            className="text-sm font-semibold text-ink/70 hover:text-ink"
          >
            Mi cuenta
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          Beneficios cerca de ti
        </h1>
        <p className="mt-1 text-ink/55">
          Elige una ubicación y la distancia que quieras explorar.
        </p>

        {!isActive && (
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl bg-ink p-5 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-white">
              🔓 Estás explorando. Activa tu membresía para canjear cualquiera de
              estos beneficios.
            </p>
            <Link
              href="/membresia"
              className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-ink transition-transform duration-200 ease-snappy hover:scale-[1.03] active:scale-[0.97]"
            >
              Activar membresía
            </Link>
          </div>
        )}

        <div className="mt-8">
          <BenefitsNearby />
        </div>
      </div>
    </main>
  );
}
