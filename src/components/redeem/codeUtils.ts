/** PRNG determinista a partir de un string (para generar códigos estables). */
export function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** Logo genérico (placeholder) que se muestra arriba de cada beneficio. */
export const GENERIC_LOGO = "/logos/dummy-logo-5b.png";

/** Categorías canónicas: etiqueta + ícono. */
export const categoryMeta: Record<string, { label: string; icon: string }> = {
  restaurantes: { label: "Restaurantes", icon: "🍽️" },
  cafe: { label: "Café y postres", icon: "☕" },
  bienestar: { label: "Belleza y bienestar", icon: "💆" },
  entretenimiento: { label: "Entretenimiento", icon: "🎬" },
  salud: { label: "Salud y farmacia", icon: "⚕️" },
  servicios: { label: "Servicios", icon: "🛠️" },
  moda: { label: "Moda", icon: "👗" },
  mascotas: { label: "Mascotas", icon: "🐾" },
  supermercado: { label: "Supermercado", icon: "🛒" },
};

export const iconFor = (c?: string | null): string =>
  (c && categoryMeta[c]?.icon) || "🎁";

export const categoryLabel = (c?: string | null): string =>
  (c && categoryMeta[c]?.label) || "Otros";

export const codeTypeLabel: Record<string, string> = {
  qr: "Código QR",
  barcode: "Código de barras",
  text: "Mostrar pantalla",
};
