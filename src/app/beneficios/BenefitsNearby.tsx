"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { searchNearbyBenefits, type NearbyBenefit } from "./actions";
import { iconFor, codeTypeLabel } from "@/components/redeem/codeUtils";

type Center = { lat: number; lng: number; label: string };

const RADIOS = [5, 10, 25, 50, 100, 200];
const STORAGE_KEY = "benefizios:nearby";

export default function BenefitsNearby() {
  const [query, setQuery] = useState("");
  const [center, setCenter] = useState<Center | null>(null);
  const [radius, setRadius] = useState(50);
  const [results, setResults] = useState<NearbyBenefit[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Guarda la ubicación elegida para restaurarla al volver.
  function persist(c: Center, r: number) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, radius: r }));
    } catch {
      // localStorage no disponible: no pasa nada.
    }
  }

  function runSearch(c: Center, r: number) {
    startTransition(async () => {
      const data = await searchNearbyBenefits(c.lat, c.lng, r);
      setResults(data);
      setSearched(true);
    });
  }

  // Al montar: restaura la última ubicación guardada y vuelve a buscar.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Center & { radius?: number };
      if (typeof saved.lat !== "number" || typeof saved.lng !== "number") return;
      const c = { lat: saved.lat, lng: saved.lng, label: saved.label };
      const r = saved.radius ?? 50;
      setCenter(c);
      setRadius(r);
      setQuery(saved.label ?? "");
      runSearch(c, r);
    } catch {
      // entrada inválida: la ignoramos.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function geocode(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=es&q=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await res.json();
      if (!data[0]) {
        setError("No encontramos esa ubicación. Prueba con otra.");
        return;
      }
      const c = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        label: data[0].display_name.split(",").slice(0, 3).join(", "),
      };
      setCenter(c);
      setQuery(c.label);
      persist(c, radius);
      runSearch(c, radius);
    } catch {
      setError("No pudimos buscar la ubicación. Intenta de nuevo.");
    }
  }

  function useMyLocation() {
    setError(null);
    if (!navigator.geolocation) {
      setError("Tu navegador no permite geolocalización.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Tu ubicación actual",
        };
        setCenter(c);
        setQuery(c.label);
        persist(c, radius);
        runSearch(c, radius);
      },
      () =>
        setError(
          "No pudimos obtener tu ubicación. Permite el acceso o busca una dirección.",
        ),
    );
  }

  function changeRadius(r: number) {
    setRadius(r);
    if (center) {
      persist(center, r);
      runSearch(center, r);
    }
  }

  return (
    <div>
      {/* Controles de ubicación */}
      <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
        <form onSubmit={geocode} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ciudad, colonia o dirección…"
            className="w-full rounded-xl border border-haze bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
          />
          <button
            type="submit"
            className="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition-transform duration-200 ease-snappy active:scale-[0.97]"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={useMyLocation}
            className="rounded-xl border border-haze px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
          >
            📍 Mi ubicación
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink/55">Distancia:</span>
          {RADIOS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => changeRadius(r)}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                r === radius
                  ? "bg-brand text-ink"
                  : "border border-haze bg-white text-ink/60 hover:bg-mist"
              }`}
            >
              {r} km
            </button>
          ))}
        </div>

        {center && (
          <p className="mt-3 text-xs text-ink/55">
            Mostrando beneficios a menos de <b>{radius} km</b> de{" "}
            <b>{center.label}</b>.
          </p>
        )}
        {error && <p className="mt-3 text-xs font-medium text-red-600">{error}</p>}
      </div>

      {/* Resultados */}
      <div className="mt-6">
        {!center ? (
          <p className="py-10 text-center text-sm text-ink/50">
            Elige una ubicación o usa la tuya para ver los beneficios cerca.
          </p>
        ) : pending ? (
          <p className="py-10 text-center text-sm text-ink/50">Buscando…</p>
        ) : results.length === 0 && searched ? (
          <p className="py-10 text-center text-sm text-ink/50">
            No hay beneficios dentro de {radius} km. Prueba ampliar la distancia u
            otra ubicación.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink/55">
              {results.length} beneficio{results.length === 1 ? "" : "s"} cerca.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((b) => (
                <Link
                  key={b.id}
                  href={`/beneficios/${b.id}`}
                  className="group rounded-2xl border border-black/5 bg-white p-5 transition-all duration-200 ease-snappy hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-xl">
                      {iconFor(b.category)}
                    </span>
                    <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-ink/70">
                      ~{b.distanceKm} km
                    </span>
                  </div>
                  <p className="mt-4 font-display text-base font-bold text-ink">
                    {b.business}
                  </p>
                  <p className="mt-0.5 text-sm text-ink/65">{b.title}</p>
                  <p className="mt-3 text-xs font-medium text-brand">
                    Ver código · {codeTypeLabel[b.code_type] ?? b.code_type} →
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
