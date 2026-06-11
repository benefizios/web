"use client";

import { useEffect, useState } from "react";

/* Marco de teléfono reutilizable */
function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] w-full overflow-hidden rounded-[2rem] border-[6px] border-ink bg-white shadow-2xl ring-1 ring-black/5 ${className}`}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink/80" />
      {children}
    </div>
  );
}

const categorias = [
  { label: "Estacionamiento", emoji: "🅿️", tone: "bg-amber-50" },
  { label: "Restaurantes", emoji: "🍽️", tone: "bg-rose-50" },
  { label: "Café", emoji: "☕", tone: "bg-orange-50" },
  { label: "Cine", emoji: "🎬", tone: "bg-violet-50" },
  { label: "Gimnasio", emoji: "🏋️", tone: "bg-emerald-50" },
  { label: "Spa", emoji: "💆", tone: "bg-sky-50" },
];

/* Pantalla 1 — Home con beneficios */
function HomeScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-3.5 pb-3 pt-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-ink/40">Hola,</p>
          <p className="font-display text-sm font-bold leading-none text-ink">
            Mauricio
          </p>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand to-brand-bright" />
      </div>

      <p className="mt-3 text-[11px] font-semibold text-ink">
        Benefizios para ti
      </p>
      <div className="mt-1.5 flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
        <span className="text-[10px] text-ink/40">🔍</span>
        <span className="text-[10px] text-ink/40">Buscar</span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        {categorias.map((c) => (
          <div
            key={c.label}
            className={`flex flex-col items-start justify-between rounded-xl ${c.tone} p-2`}
          >
            <span className="text-base">{c.emoji}</span>
            <span className="mt-2 text-[9px] font-semibold leading-tight text-ink">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Patrón tipo QR (determinista) */
const QR = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

/* Pantalla 2 — Cupón con reloj en vivo */
function CouponScreen() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fecha = now
    ? now.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "—";
  const hora = now
    ? now.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  return (
    <div className="flex h-full flex-col items-center bg-white px-4 pb-4 pt-8 text-center">
      <p className="font-display text-sm font-extrabold tracking-tight text-emerald-700">
        ☕ Café del Centro
      </p>
      <p className="mt-2 text-[11px] font-semibold leading-snug text-ink">
        $20 MXN de descuento en consumos de más de $250
      </p>

      <div className="mt-3 grid grid-cols-7 gap-[2px] rounded-lg bg-white p-2 ring-1 ring-black/10">
        {QR.flatMap((row, i) =>
          row.map((cell, j) => (
            <span
              key={`${i}-${j}`}
              className={`h-2.5 w-2.5 rounded-[1px] ${
                cell ? "bg-ink" : "bg-transparent"
              }`}
            />
          ))
        )}
      </div>

      <div className="mt-auto w-full rounded-xl bg-mist px-3 py-2">
        <p className="text-[10px] font-medium capitalize text-ink/60">{fecha}</p>
        <p className="font-display text-lg font-bold tabular-nums text-ink">
          {hora}
        </p>
        <p className="mt-0.5 text-[8px] text-ink/40">
          Hora en vivo · válido solo con membresía activa
        </p>
      </div>
    </div>
  );
}

/* Pantalla 3 — Referidos */
function ReferralScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-brand/15 to-white px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl shadow-lg">
        🎁
      </div>
      <p className="mt-3 font-display text-sm font-bold text-ink">
        Invita y gana
      </p>
      <p className="mt-1 text-[10px] leading-snug text-ink/60">
        Gana dinero por cada amigo que se suma con tu enlace o código QR.
      </p>
      <div className="mt-3 w-full rounded-xl bg-ink px-3 py-2 text-[10px] font-semibold text-white">
        Compartir mi enlace
      </div>
    </div>
  );
}

export default function AppMockups() {
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-md sm:h-[520px]">
      {/* Teléfono izquierdo (atrás) */}
      <div className="absolute left-0 top-10 w-[42%] rotate-[-8deg] animate-float-slow [animation-delay:-2s]">
        <PhoneFrame>
          <ReferralScreen />
        </PhoneFrame>
      </div>

      {/* Teléfono derecho (atrás) */}
      <div className="absolute right-0 top-6 w-[44%] rotate-[8deg] animate-float [animation-delay:-4s]">
        <PhoneFrame>
          <CouponScreen />
        </PhoneFrame>
      </div>

      {/* Teléfono central (frente) */}
      <div className="absolute left-1/2 top-0 w-[50%] -translate-x-1/2 animate-float">
        <PhoneFrame className="shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
          <HomeScreen />
        </PhoneFrame>
      </div>
    </div>
  );
}
