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

export const categoryIcon: Record<string, string> = {
  café: "☕",
  restaurante: "🍽️",
  gimnasio: "🏋️",
  cine: "🎬",
  spa: "💆",
  postres: "🍦",
  tienda: "🛍️",
  moda: "👗",
  salud: "⚕️",
  estacionamiento: "🅿️",
  belleza: "💈",
  servicios: "🐾",
};

export const iconFor = (c?: string | null): string =>
  (c && categoryIcon[c]) || "🎁";

export const codeTypeLabel: Record<string, string> = {
  qr: "Código QR",
  barcode: "Código de barras",
  text: "Mostrar pantalla",
};
