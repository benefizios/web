import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import Brand from "@/components/Brand";

export const metadata: Metadata = { title: "Mi cuenta" };

export default async function CuentaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const nombre = profile?.full_name?.split(" ")[0] ?? "";

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

        <div className="rounded-3xl border border-black/5 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl shadow-sm">
            🎉
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
            ¡Hola{nombre ? `, ${nombre}` : ""}!
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Tu cuenta de <Brand /> está activa.
          </p>

          <div className="mt-6 rounded-2xl bg-mist px-4 py-3 text-left">
            <p className="text-xs font-medium text-ink/40">Correo</p>
            <p className="text-sm font-medium text-ink">{user.email}</p>
          </div>

          <p className="mt-6 text-xs text-ink/40">
            Pronto verás aquí tus <Brand /> disponibles y el estado de tu
            membresía.
          </p>

          <form action={signOut} className="mt-6">
            <button
              type="submit"
              className="w-full rounded-xl border border-haze py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
