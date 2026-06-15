import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import RedeemCode from "@/components/redeem/RedeemCode";
import { iconFor } from "@/components/redeem/codeUtils";

export const metadata: Metadata = { title: "Tu beneficio" };

type Detail = {
  id: string;
  title: string;
  description: string | null;
  code_type: string;
  category: string | null;
  status: string;
  business: {
    name: string;
    website: string | null;
    branches: { name: string | null; address: string | null; zone: string | null }[];
  } | null;
};

export default async function RedeemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
      "id, title, description, code_type, category, status, business:businesses(name, website, branches(name, address, zone))",
    )
    .eq("id", id)
    .single();

  const b = data as unknown as Detail | null;
  if (!b || b.status !== "approved") notFound();

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-4">
          <Link href="/beneficios" className="text-sm font-semibold text-ink/70 hover:text-ink">
            ← Beneficios
          </Link>
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={120}
            height={32}
            className="h-5 w-auto"
            unoptimized
          />
        </div>
      </header>

      <div className="mx-auto max-w-lg px-5 py-8">
        {/* Encabezado del beneficio */}
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl shadow-sm">
            {iconFor(b.category)}
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
            {b.business?.name}
          </h1>
          <p className="mt-1 text-lg font-semibold text-ink">{b.title}</p>
          {b.description && (
            <p className="mt-1 text-sm text-ink/55">{b.description}</p>
          )}
        </div>

        {/* Ticket de redención */}
        <div className="mt-8">
          <RedeemCode codeType={b.code_type} seed={b.id} />
        </div>

        <p className="mt-4 text-center text-xs text-ink/45">
          Muestra este código en el local. La hora en vivo confirma que es válido
          en este momento.
        </p>

        {/* Sucursales */}
        {b.business?.branches && b.business.branches.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">
              Dónde usarlo
            </h2>
            <div className="mt-3 space-y-2">
              {b.business.branches.map((br, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3"
                >
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {br.name ?? b.business?.name}
                    </p>
                    <p className="text-xs text-ink/55">
                      {br.address ?? br.zone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
