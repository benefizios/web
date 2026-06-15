"use client";

import { useState } from "react";
import Link from "next/link";
import { iconFor, codeTypeLabel } from "@/components/redeem/codeUtils";

export type Benefit = {
  id: string;
  title: string;
  business: string;
  category: string | null;
  zone: string | null;
  code_type: string;
};

const ZONES = ["Todos", "Polanco", "Santa Fe", "Interlomas"];

export default function BenefitsBrowser({ benefits }: { benefits: Benefit[] }) {
  const [zone, setZone] = useState("Todos");
  const visibles =
    zone === "Todos" ? benefits : benefits.filter((b) => b.zone === zone);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {ZONES.map((z) => {
          const active = z === zone;
          return (
            <button
              key={z}
              type="button"
              onClick={() => setZone(z)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-ink text-white"
                  : "border border-haze bg-white text-ink/70 hover:bg-mist"
              }`}
            >
              {z}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((b) => (
          <Link
            key={b.id}
            href={`/beneficios/${b.id}`}
            className="group rounded-2xl border border-black/5 bg-white p-5 transition-all duration-200 ease-snappy hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-xl">
                {iconFor(b.category)}
              </span>
              {b.zone && (
                <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-ink/70">
                  {b.zone}
                </span>
              )}
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

      {visibles.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink/50">
          No hay beneficios en esta zona todavía.
        </p>
      )}
    </>
  );
}
