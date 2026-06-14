import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin, approveBenefit, rejectBenefit } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

type Row = {
  id: string;
  title: string;
  description: string | null;
  code_type: string;
  status: string;
  created_at: string;
  business: { name: string; website: string | null } | null;
};

const codeLabel: Record<string, string> = {
  qr: "Código QR",
  barcode: "Código de barras",
  text: "Texto",
};

export default async function AdminPage() {
  const user = await requireAdmin();
  if (!user) redirect("/cuenta");

  const admin = createAdminClient();
  const { data } = await admin
    .from("benefits")
    .select(
      "id, title, description, code_type, status, created_at, business:businesses(name, website)",
    )
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as unknown as Row[];
  const pendientes = rows.filter((r) => r.status === "pending");
  const revisados = rows.filter((r) => r.status !== "pending");

  return (
    <main className="min-h-screen bg-mist/40">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={130}
            height={36}
            className="h-6 w-auto"
            unoptimized
          />
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-brand">
            ADMIN
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          Beneficios por aprobar
        </h1>
        <p className="mt-1 text-sm text-ink/55">
          {pendientes.length} pendiente{pendientes.length === 1 ? "" : "s"} de
          revisión.
        </p>

        <div className="mt-6 space-y-3">
          {pendientes.length === 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-8 text-center text-sm text-ink/50">
              No hay beneficios pendientes. 🎉
            </div>
          )}

          {pendientes.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-black/5 bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-lg font-bold text-ink">
                    {b.business?.name ?? "Negocio"}
                  </span>
                  <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-medium text-ink/60">
                    {codeLabel[b.code_type] ?? b.code_type}
                  </span>
                </div>
                <p className="mt-1 font-medium text-ink">{b.title}</p>
                {b.description && (
                  <p className="mt-0.5 text-sm text-ink/55">{b.description}</p>
                )}
              </div>

              <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
                <form action={approveBenefit}>
                  <input type="hidden" name="id" value={b.id} />
                  <button
                    type="submit"
                    className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 ease-snappy active:scale-[0.97]"
                  >
                    Aprobar
                  </button>
                </form>
                <form action={rejectBenefit}>
                  <input type="hidden" name="id" value={b.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-haze px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-mist"
                  >
                    Rechazar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {revisados.length > 0 && (
          <>
            <h2 className="mt-12 font-display text-lg font-bold text-ink">
              Revisados
            </h2>
            <div className="mt-4 space-y-2">
              {revisados.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-5 py-3 text-sm"
                >
                  <span className="text-ink">
                    <b>{b.business?.name}</b> · {b.title}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      b.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status === "approved" ? "Publicado" : "Rechazado"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="mt-10 text-center text-sm">
          <Link href="/cuenta" className="text-ink/55 hover:text-ink">
            Volver a mi cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
