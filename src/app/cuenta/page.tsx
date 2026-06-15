import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { deactivateMembership } from "@/app/membresia/actions";
import Brand from "@/components/Brand";

export const metadata: Metadata = { title: "Mi cuenta" };

export default async function CuentaPage({
  searchParams,
}: {
  searchParams: Promise<{ activada?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, membership_status, role")
    .eq("id", user.id)
    .single();

  const nombre = profile?.full_name?.split(" ")[0] ?? "";
  const isActive = profile?.membership_status === "active";
  const isAdmin = profile?.role === "admin";
  const { activada } = await searchParams;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[480px]">
        <div className="brand-glow absolute inset-0" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={160}
            height={45}
            className="h-8 w-auto"
            unoptimized
          />
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
              ¡Hola{nombre ? `, ${nombre}` : ""}!
            </h1>
            <p className="mt-1 text-sm text-ink/55">{user.email}</p>
          </div>

          {activada && isActive && (
            <div className="mt-6 rounded-xl bg-brand/15 px-4 py-3 text-center text-sm font-semibold text-ink">
              🎉 ¡Tu membresía quedó activa!
            </div>
          )}

          {/* Estado de membresía */}
          {isActive ? (
            <div className="mt-6 rounded-2xl border border-brand/40 bg-cream p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs">
                  ✓
                </span>
                <p className="font-display font-bold text-ink">
                  Membresía activa
                </p>
              </div>
              <p className="mt-2 text-sm text-ink/60">
                Ya puedes ver y redimir todos los <Brand /> disponibles cerca de
                ti.
              </p>
              <Link
                href="/beneficios"
                className="mt-4 block rounded-xl bg-ink py-3 text-center text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98]"
              >
                Ver beneficios
              </Link>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-haze bg-mist/40 p-5">
              <p className="font-display font-bold text-ink">
                Tu membresía no está activa
              </p>
              <p className="mt-1 text-sm text-ink/60">
                Actívala para desbloquear los beneficios en comercios cerca de ti.
              </p>
              <Link
                href="/membresia"
                className="mt-4 block rounded-xl bg-ink py-3 text-center text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98]"
              >
                Activar membresía
              </Link>
            </div>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className="mt-4 block rounded-xl border border-haze py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              Panel de administración
            </Link>
          )}

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-black/5 pt-5 text-sm">
            {isActive && (
              <form action={deactivateMembership}>
                <button
                  type="submit"
                  className="text-ink/45 transition-colors hover:text-ink/70"
                >
                  Cancelar membresía
                </button>
              </form>
            )}
            <form action={signOut} className="ml-auto">
              <button
                type="submit"
                className="font-semibold text-ink/70 transition-colors hover:text-ink"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
