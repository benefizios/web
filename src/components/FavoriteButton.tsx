"use client";

import { useState, useTransition } from "react";
import { toggleFavorite } from "@/app/beneficios/actions";

/**
 * Corazón para guardar/quitar un beneficio de favoritos.
 * - Sin `onToggle`: maneja su propio estado (uso suelto, ej. en el detalle).
 * - Con `onToggle`: controlado por el padre (ej. la lista, para filtrar en vivo).
 */
export default function FavoriteButton({
  benefitId,
  favorite,
  onToggle,
  className = "",
}: {
  benefitId: string;
  favorite: boolean;
  onToggle?: (id: string, next: boolean) => void;
  className?: string;
}) {
  const controlled = onToggle !== undefined;
  const [internal, setInternal] = useState(favorite);
  const fav = controlled ? favorite : internal;
  const [, startTransition] = useTransition();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = !fav;
    if (controlled) onToggle!(benefitId, next);
    else setInternal(next);
    startTransition(async () => {
      const result = await toggleFavorite(benefitId);
      if (controlled) onToggle!(benefitId, result);
      else setInternal(result);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={fav}
      aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base transition-colors ${
        fav ? "bg-brand/20" : "bg-mist hover:bg-haze"
      } ${className}`}
    >
      {fav ? "❤️" : "🤍"}
    </button>
  );
}
