"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/** Devuelve el user si es admin; si no, null. */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  return profile?.role === "admin" ? user : null;
}

async function review(formData: FormData, status: "approved" | "rejected") {
  const user = await requireAdmin();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const admin = createAdminClient();
  await admin
    .from("benefits")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
    })
    .eq("id", id);

  revalidatePath("/admin");
}

export async function approveBenefit(formData: FormData) {
  await review(formData, "approved");
}

export async function rejectBenefit(formData: FormData) {
  await review(formData, "rejected");
}
