import Link from "next/link";
import Reveal from "@/components/Reveal";

type Code = "qr" | "barras";
const beneficios: { marca: string; desc: string; emoji: string; code: Code }[] = [
  { marca: "Cafético", desc: "2x1 de lunes a viernes", emoji: "☕", code: "qr" },
  { marca: "ParkUp", desc: "30% en estacionamiento", emoji: "🅿️", code: "barras" },
  { marca: "CineLuna", desc: "$20 en consumos +$250", emoji: "🎬", code: "qr" },
  { marca: "FitZone", desc: "40% en tu inscripción", emoji: "🏋️", code: "barras" },
  { marca: "Sushiko", desc: "Postre de cortesía", emoji: "🍣", code: "qr" },
  { marca: "Burgr", desc: "Combo a mitad de precio", emoji: "🍔", code: "barras" },
];

function MiniCode({ code }: { code: Code }) {
  if (code === "barras") {
    return (
      <div className="flex h-9 items-end gap-[2px]">
        {[3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2].map((w, i) => (
          <span
            key={i}
            className="h-full bg-ink"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-5 gap-[2px]">
      {[1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1].map(
        (c, i) => (
          <span
            key={i}
            className={`h-2 w-2 ${c ? "bg-ink" : "bg-transparent"}`}
          />
        ),
      )}
    </div>
  );
}

export default function LockedBenefits() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Beneficios reales, cerca de ti
          </h2>
          <p className="mt-4 text-lg text-ink/60">
            Cada comercio elige su descuento y cómo redimirlo: código QR, de
            barras o texto. Tú solo lo muestras en el local.
          </p>
        </Reveal>

        <div className="relative mt-12">
          {/* Grilla de beneficios, difuminada porque requiere membresía */}
          <div
            className="grid select-none grid-cols-1 gap-4 blur-[3px] sm:grid-cols-2 lg:grid-cols-3"
            aria-hidden
          >
            {beneficios.map((b) => (
              <div
                key={b.marca}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{b.emoji}</span>
                    <span className="font-display text-lg font-bold text-ink">
                      {b.marca}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink/70">
                    {b.desc}
                  </p>
                </div>
                <MiniCode code={b.code} />
              </div>
            ))}
          </div>

          {/* Overlay de bloqueo */}
          <div className="absolute inset-0 flex items-center justify-center bg-cream/40">
            <Reveal className="mx-5 max-w-sm rounded-3xl border border-black/5 bg-white p-8 text-center shadow-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl shadow-sm">
                🔒
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Solo para miembros
              </h3>
              <p className="mt-2 text-sm text-ink/60">
                Activa tu membresía e inicia sesión para ver todos los beneficios
                disponibles cerca de ti.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  href="/registro"
                  className="rounded-xl bg-ink py-3 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98]"
                >
                  Quiero mi membresía
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-haze py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
                >
                  Ya soy miembro
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
