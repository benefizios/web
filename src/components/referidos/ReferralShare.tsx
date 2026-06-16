"use client";

import { useState } from "react";

/** Acciones de compartir el enlace de referido: copiar + WhatsApp. */
export default function ReferralShare({
  link,
  message,
}: {
  link: string;
  message: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // si el navegador no deja copiar, el usuario puede seleccionar el texto
    }
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(`${message} ${link}`)}`;

  return (
    <div className="space-y-3">
      {/* Enlace + copiar */}
      <div className="flex items-stretch gap-2">
        <div className="flex flex-1 items-center overflow-hidden rounded-full border border-haze bg-white px-4">
          <span className="truncate text-sm text-ink/70">{link}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.03] active:scale-[0.97]"
        >
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>

      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.04 4C9.9 4 4.9 9 4.9 15.14c0 2.18.64 4.2 1.74 5.92L4.5 28l7.1-2.06a11.07 11.07 0 0 0 4.44.92h.01c6.14 0 11.14-5 11.14-11.14C27.19 9 22.19 4 16.04 4Zm0 20.3h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-3.5 1.02.93-3.42-.22-.35a9.16 9.16 0 0 1-1.4-4.9c0-5.06 4.12-9.18 9.2-9.18 2.46 0 4.76.96 6.5 2.7a9.13 9.13 0 0 1 2.7 6.5c0 5.07-4.12 9.18-9.18 9.18Zm5.04-6.87c-.28-.14-1.64-.8-1.9-.9-.25-.1-.43-.14-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.38-1.64-1.54-1.91-.16-.28-.02-.43.12-.56.13-.13.28-.32.42-.49.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.2 1.26.18 1.73.1.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32Z" />
        </svg>
        Compartir por WhatsApp
      </a>
    </div>
  );
}
