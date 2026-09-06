"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Active = "beneficios" | "refiere" | "cuenta";

const links: { href: string; label: string; key: Active }[] = [
  { href: "/beneficios", label: "Beneficios", key: "beneficios" },
  { href: "/refiere", label: "Refiere y gana", key: "refiere" },
  { href: "/cuenta", label: "Mi cuenta", key: "cuenta" },
];

/** Barra superior para usuarios con sesión: logo + menú (hamburguesa en mobile). */
export default function AppHeader({ active }: { active?: Active }) {
  const [open, setOpen] = useState(false);

  const item = (current: boolean) =>
    `text-sm font-semibold transition-colors ${
      current ? "text-ink" : "text-ink/55 hover:text-ink"
    }`;

  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/beneficios" aria-label="Beneficios">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={130}
            height={36}
            className="h-6 w-auto"
            unoptimized
          />
        </Link>

        {/* Menú desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.key} href={l.href} className={item(active === l.key)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Botón hamburguesa (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label="Menú"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menú desplegable (mobile) */}
      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <ul className="mx-auto max-w-5xl space-y-1 px-5 py-3 sm:px-8">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    active === l.key
                      ? "bg-mist text-ink"
                      : "text-ink/70 hover:bg-mist"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
