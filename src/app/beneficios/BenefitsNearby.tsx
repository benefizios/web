"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { searchNearbyBenefits, type NearbyBenefit } from "./actions";
import {
  iconFor,
  categoryLabel,
  codeTypeLabel,
  categoryMeta,
  GENERIC_LOGO,
} from "@/components/redeem/codeUtils";
import FavoriteButton from "@/components/FavoriteButton";

type Center = { lat: number; lng: number; label: string };

const RADIOS = [5, 10, 25, 50, 100, 200];
const STORAGE_KEY = "benefizios:nearby";

export default function BenefitsNearby() {
  const [query, setQuery] = useState("");
  const [center, setCenter] = useState<Center | null>(null);
  const [radius, setRadius] = useState(50);
  const [results, setResults] = useState<NearbyBenefit[]>([]);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const [cat, setCat] = useState<string | null>(null);
  const [onlyFav, setOnlyFav] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<
    { label: string; lat: number; lng: number }[]
  >([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function persist(c: Center, r: number) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, radius: r }));
    } catch {
      // sin localStorage: no pasa nada
    }
  }

  function runSearch(c: Center, r: number) {
    startTransition(async () => {
      const data = await searchNearbyBenefits(c.lat, c.lng, r);
      setResults(data);
      setFavIds(new Set(data.filter((d) => d.favorite).map((d) => d.id)));
      setSearched(true);
    });
  }

  // Restaura la última ubicación guardada al montar.
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
      // entrada inválida
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSuggestions(q: string) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=es&q=${encodeURIComponent(
          q,
        )}`,
      );
      const data = (await res.json()) as {
        display_name: string;
        lat: string;
        lon: string;
      }[];
      setSuggestions(
        data.map((d) => ({
          label: d.display_name.split(",").slice(0, 4).join(", "),
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon),
        })),
      );
    } catch {
      setSuggestions([]);
    }
  }

  function onQueryChange(v: string) {
    setQuery(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (v.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 450);
  }

  function selectSuggestion(s: { label: string; lat: number; lng: number }) {
    const c = { lat: s.lat, lng: s.lng, label: s.label };
    setError(null);
    setCenter(c);
    setQuery(s.label);
    setSuggestions([]);
    persist(c, radius);
    runSearch(c, radius);
  }

  function geocode(e: React.FormEvent) {
    e.preventDefault();
    // Al enviar, usamos la primera sugerencia (la lista guía la elección).
    if (suggestions.length > 0) {
      selectSuggestion(suggestions[0]);
      return;
    }
    if (query.trim().length >= 3) fetchSuggestions(query);
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

  function handleToggleFav(id: string, next: boolean) {
    setFavIds((prev) => {
      const s = new Set(prev);
      if (next) s.add(id);
      else s.delete(id);
      return s;
    });
  }

  const cats = Object.keys(categoryMeta).filter((slug) =>
    results.some((r) => r.category === slug),
  );
  const visible = results.filter(
    (r) =>
      (cat === null || r.category === cat) && (!onlyFav || favIds.has(r.id)),
  );

  return (
    <div>
      {/* Controles de ubicación */}
      <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5">
        <form onSubmit={geocode} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onBlur={() => setTimeout(() => setSuggestions([]), 150)}
              placeholder="Ciudad, colonia o dirección…"
              autoComplete="off"
              className="w-full rounded-xl border border-haze bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
            />
            {suggestions.length > 0 && (
              <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-xl border border-haze bg-white py-1 shadow-xl">
                {suggestions.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => selectSuggestion(s)}
                      className="block w-full px-4 py-2.5 text-left text-sm text-ink/80 transition-colors hover:bg-mist"
                    >
                      📍 {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
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

      {/* Filtros por categoría + favoritos */}
      {results.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCat(null)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              cat === null
                ? "bg-ink text-white"
                : "border border-haze bg-white text-ink/65 hover:bg-mist"
            }`}
          >
            Todas
          </button>
          {cats.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => setCat(slug)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                cat === slug
                  ? "bg-ink text-white"
                  : "border border-haze bg-white text-ink/65 hover:bg-mist"
              }`}
            >
              {categoryMeta[slug].icon} {categoryMeta[slug].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOnlyFav((v) => !v)}
            className={`ml-auto rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              onlyFav
                ? "bg-brand text-ink"
                : "border border-haze bg-white text-ink/65 hover:bg-mist"
            }`}
          >
            {onlyFav ? "❤️" : "🤍"} Favoritos
          </button>
        </div>
      )}

      {/* Resultados */}
      <div className="mt-5">
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
        ) : visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink/50">
            {onlyFav
              ? "Todavía no guardaste favoritos en esta zona."
              : "No hay beneficios en esa categoría aquí."}
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink/55">
              {visible.length} beneficio{visible.length === 1 ? "" : "s"}.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((b) => (
                <div
                  key={b.id}
                  className="group relative rounded-2xl border border-black/5 bg-white p-5 transition-all duration-200 ease-snappy hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <FavoriteButton
                    benefitId={b.id}
                    favorite={favIds.has(b.id)}
                    onToggle={handleToggleFav}
                    className="absolute right-3 top-3 z-10"
                  />
                  <div className="flex h-[104px] items-center justify-center px-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={GENERIC_LOGO}
                      alt=""
                      className="max-h-[92px] w-[200px] max-w-full object-contain"
                    />
                  </div>
                  <p className="mt-3 font-display text-base font-bold text-ink">
                    {b.business}
                  </p>
                  <p className="mt-0.5 text-sm text-ink/65">{b.title}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-semibold text-ink/70">
                      {iconFor(b.category)} {categoryLabel(b.category)}
                    </span>
                    <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-ink/70">
                      ~{b.distanceKm} km
                    </span>
                  </div>
                  <Link
                    href={`/beneficios/${b.id}`}
                    aria-label={b.business}
                    className="absolute inset-0 rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
