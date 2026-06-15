"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type NearbyBenefit = {
  id: string;
  title: string;
  business: string;
  category: string | null;
  code_type: string;
  distanceKm: number;
  address: string | null;
};

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type BranchRow = {
  lat: number | null;
  lng: number | null;
  address: string | null;
  business: {
    name: string;
    benefits: {
      id: string;
      title: string;
      category: string | null;
      code_type: string;
      status: string;
    }[];
  } | null;
};

/** Devuelve los beneficios cuyos locales están dentro del radio (km) del punto. */
export async function searchNearbyBenefits(
  lat: number,
  lng: number,
  radiusKm: number,
): Promise<NearbyBenefit[]> {
  // Cualquier usuario logueado puede explorar (el canje se bloquea aparte).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const r = Math.min(Math.max(radiusKm, 1), 500);
  // Caja delimitadora para traer SOLO los locales cercanos (no toda la base).
  const dLat = r / 111;
  const cosLat = Math.cos((lat * Math.PI) / 180) || 0.01;
  const dLng = r / (111 * Math.abs(cosLat));

  const admin = createAdminClient();
  const { data } = await admin
    .from("branches")
    .select(
      "lat, lng, address, business:businesses(name, benefits(id, title, category, code_type, status))",
    )
    .gte("lat", lat - dLat)
    .lte("lat", lat + dLat)
    .gte("lng", lng - dLng)
    .lte("lng", lng + dLng);

  const rows = (data ?? []) as unknown as BranchRow[];

  // Por cada beneficio nos quedamos con su local más cercano.
  const best = new Map<string, NearbyBenefit>();
  for (const br of rows) {
    if (br.lat == null || br.lng == null || !br.business) continue;
    const dist = haversineKm(lat, lng, br.lat, br.lng);
    if (dist > r) continue;
    for (const b of br.business.benefits ?? []) {
      if (b.status !== "approved") continue;
      const prev = best.get(b.id);
      if (!prev || dist < prev.distanceKm) {
        best.set(b.id, {
          id: b.id,
          title: b.title,
          business: br.business.name,
          category: b.category,
          code_type: b.code_type,
          distanceKm: Math.round(dist * 10) / 10,
          address: br.address,
        });
      }
    }
  }

  return [...best.values()].sort((a, b) => a.distanceKm - b.distanceKm);
}
