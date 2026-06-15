"use client";

import { useEffect, useState } from "react";

/** Reloj en vivo (anti-captura): fecha + hora que avanza cada segundo. */
export default function LiveClock() {
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
        month: "long",
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
    <div className="text-center">
      <p className="text-xs font-medium capitalize text-ink/50">{fecha}</p>
      <p className="font-display text-2xl font-bold tabular-nums text-ink">
        {hora}
      </p>
      <p className="mt-1 text-[10px] text-ink/40">
        Hora en vivo · válido solo en este momento
      </p>
    </div>
  );
}
