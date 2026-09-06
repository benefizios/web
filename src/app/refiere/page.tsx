import type { Metadata } from "next";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import AppHeader from "@/components/site/AppHeader";
import ReferralShare from "@/components/referidos/ReferralShare";
import Brand from "@/components/Brand";

export const metadata: Metadata = { title: "Refiere y gana" };

const pasos = [
  { icon: "📲", title: "Comparte", desc: "Manda tu enlace o QR por WhatsApp a quien quieras." },
  { icon: "✅", title: "Se suma", desc: "Tu amigo se registra y paga su inscripción." },
  { icon: "💸", title: "Cobras", desc: "Te depositamos $99 directo a tu tarjeta." },
];

export default async function RefierePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", user.id)
    .single();

  const code = profile?.referral_code ?? null;

  // Quiénes se registraron con este código (RLS solo deja ver el perfil propio,
  // por eso usamos el cliente admin del lado del servidor).
  const admin = createAdminClient();
  const { data: referred } = await admin
    .from("profiles")
    .select("full_name, created_at")
    .eq("referred_by", user.id)
    .order("created_at", { ascending: false });
  const referredCount = referred?.length ?? 0;

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://benefizios.com";
  const link = code ? `${base}/registro?ref=${code}` : null;
  const message =
    "Te invito a Benefizios: una sola membresía y accedes a descuentos en comercios cerca de ti. Regístrate con mi enlace 👇";

  const qrDataUrl = link
    ? await QRCode.toDataURL(link, {
        margin: 1,
        width: 320,
        color: { dark: "#232323", light: "#ffffff" },
      })
    : null;

  return (
    <main className="min-h-screen bg-[linear-gradient(90deg,#ffe693_0%,#fff3cf_100%)]">
      <AppHeader active="refiere" />

      <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          Refiere y gana
        </h1>
        <p className="mt-1 text-ink/60">
          Gana <b className="text-ink">$99</b> por cada amigo que se suma a{" "}
          <Brand />.
        </p>

        {link && qrDataUrl ? (
          <div className="mt-7 rounded-3xl border border-black/5 bg-white p-7 shadow-xl sm:p-9">
            <div className="flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="Código QR de tu enlace de referido"
                className="h-44 w-44 rounded-2xl border border-black/5"
              />
              <p className="mt-4 text-sm text-ink/55">
                Muestra el QR o comparte tu enlace:
              </p>
            </div>

            <div className="mt-5">
              <ReferralShare link={link} message={message} />
            </div>
          </div>
        ) : (
          <div className="mt-7 rounded-3xl border border-black/5 bg-white p-7 text-center text-sm text-ink/60 shadow-xl">
            Estamos generando tu enlace de referido. Vuelve a intentarlo en un
            momento.
          </div>
        )}

        {/* Tus referidos */}
        <div className="mt-7 rounded-3xl border border-black/5 bg-white p-6 shadow-xl sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">
              Tus referidos
            </h2>
            <span className="rounded-full bg-brand/15 px-3 py-1 text-sm font-bold text-ink">
              {referredCount}
            </span>
          </div>

          {referredCount > 0 ? (
            <ul className="mt-4 divide-y divide-black/5">
              {referred!.map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-sm font-medium text-ink">
                    {r.full_name?.split(" ")[0] ?? "Nuevo miembro"}
                  </span>
                  <span className="text-xs text-ink/50">
                    {new Date(r.created_at as string).toLocaleDateString(
                      "es-MX",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink/55">
              Todavía no tienes referidos. Comparte tu enlace o QR para empezar a
              ganar.
            </p>
          )}

          <p className="mt-4 text-xs text-ink/45">
            El pago de $99 por cada referido se habilitará junto con los pagos
            reales.
          </p>
        </div>

        {/* Cómo funciona */}
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {pasos.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-black/5 bg-white/70 p-5 text-center backdrop-blur"
            >
              <div className="text-2xl">{p.icon}</div>
              <p className="mt-2 font-display text-sm font-bold text-ink">
                {p.title}
              </p>
              <p className="mt-1 text-xs text-ink/60">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink/55">
          Tu amigo paga $199 de inscripción (única vez) y $99 al mes. De esa
          inscripción, <b className="text-ink/70">$99 son para ti</b>.
        </p>
      </div>
    </main>
  );
}
