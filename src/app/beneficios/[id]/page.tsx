import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isFavorite } from "../actions";
import RedeemCode from "@/components/redeem/RedeemCode";
import FavoriteButton from "@/components/FavoriteButton";
import { iconFor, categoryLabel, GENERIC_LOGO } from "@/components/redeem/codeUtils";

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
  const isActive = profile?.membership_status === "active";

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

  const fav = await isFavorite(b.id);

  return (
    <main className="min-h-screen bg-[linear-gradient(90deg,#ffe693_0%,#fff3cf_100%)]">
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
          <div className="mx-auto inline-flex items-center justify-center rounded-2xl border border-black/5 bg-white px-10 py-7 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GENERIC_LOGO}
              alt={b.business?.name ?? "Logo"}
              className="max-h-[100px] w-[220px] max-w-full object-contain"
            />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
            {b.business?.name}
          </h1>
          <p className="mt-1 text-lg font-semibold text-ink">{b.title}</p>
          {b.description && (
            <p className="mt-1 text-sm text-ink/55">{b.description}</p>
          )}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink/70">
              {iconFor(b.category)} {categoryLabel(b.category)}
            </span>
            <FavoriteButton benefitId={b.id} favorite={fav} />
          </div>
        </div>

        {/* Ticket de redención (solo miembros activos) */}
        {isActive ? (
          <>
            <div className="mt-8">
              <RedeemCode codeType={b.code_type} seed={b.id} />
            </div>
            <p className="mt-4 text-center text-xs text-ink/45">
              Muestra este código en el local. La hora en vivo confirma que es
              válido en este momento.
            </p>
          </>
        ) : (
          <div className="mt-8 rounded-3xl border border-black/5 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-2xl">
              🔒
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              Activa tu membresía para usarlo
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              Con tu membresía activa ves el código y lo canjeas en el local.
              Mientras tanto, puedes seguir explorando todos los beneficios.
            </p>
            <Link
              href="/membresia"
              className="mt-6 block rounded-xl bg-ink py-3.5 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98]"
            >
              Activar membresía
            </Link>
          </div>
        )}

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
