import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import BenefitsBrowser, { type Benefit } from "./BenefitsBrowser";

export const metadata: Metadata = { title: "Beneficios" };

type Raw = {
  id: string;
  title: string;
  code_type: string;
  category: string | null;
  business: { name: string; branches?: { zone: string | null }[] } | null;
};

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

  const admin = createAdminClient();
  const { data } = await admin
    .from("benefits")
    .select(
      "id, title, code_type, category, business:businesses(name, branches(zone))",
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const raw = (data ?? []) as unknown as Raw[];

  const benefits: Benefit[] = raw.map((b) => ({
    id: b.id,
    title: b.title,
    code_type: b.code_type,
    category: b.category,
    business: b.business?.name ?? "Negocio",
    zone: b.business?.branches?.[0]?.zone ?? null,
  }));

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
          {benefits.length} beneficios disponibles. Elige uno y muéstralo en el
          local.
        </p>
        <div className="mt-8">
          <BenefitsBrowser benefits={benefits} />
        </div>
      </div>
    </main>
  );
}
