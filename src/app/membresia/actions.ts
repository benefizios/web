"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * SIMULACIÓN de pago: marca la membresía como activa.
 * No hay cobro real (la pasarela aún no está integrada).
 */
export async function activateMembership() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = createAdminClient();
  await admin
    .from("profiles")
    .update({
      membership_status: "active",
      membership_activated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  revalidatePath("/", "layout");
  redirect("/cuenta?activada=1");
}

/** Desactiva la membresía (útil para demostrar los distintos estados). */
export async function deactivateMembership() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = createAdminClient();
  await admin
    .from("profiles")
    .update({ membership_status: "inactive", membership_activated_at: null })
    .eq("id", user.id);

  revalidatePath("/", "layout");
  redirect("/cuenta");
}
