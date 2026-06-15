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
  if (profile?.membership_status !== "active") redirect("/membresia");

  return (
    <main className="min-h-screen bg-cream">
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
        <div className="mt-8">
          <BenefitsNearby />
        </div>
      </div>
    </main>
  );
}
