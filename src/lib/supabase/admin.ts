import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente con la service_role (secret) key. Saltea RLS.
 * ⚠️ SOLO usar en el servidor (server actions / route handlers).
 * Nunca importar desde un client component: la key no es pública.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
