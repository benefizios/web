"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Brand from "@/components/Brand";

const links = [
  { href: "#beneficios", label: <Brand /> },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#referidos", label: "Referidos" },
  { href: "#preguntas", label: "Preguntas" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Inicio">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={142}
            height={40}
            priority
            unoptimized
            className="h-7 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Regístrate
          </Link>
        </div>

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
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-mist"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-3 px-3 pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-haze px-4 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Regístrate
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
