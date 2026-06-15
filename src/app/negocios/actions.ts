"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { notifyAdminNewBenefit } from "@/lib/email";

export type NegocioState = { error?: string; success?: boolean } | undefined;

export async function submitBusiness(
  _prev: NegocioState,
  formData: FormData,
): Promise<NegocioState> {
  const name = String(formData.get("name") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const contactEmail = String(formData.get("contact_email") ?? "")
    .trim()
    .toLowerCase();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const codeType = String(formData.get("code_type") ?? "qr");

  if (!name || !contactEmail || !title) {
    return { error: "Completa el nombre del negocio, el correo y el beneficio." };
  }
  if (!contactEmail.includes("@")) {
    return { error: "Ingresa un correo de contacto válido." };
  }
  if (!["qr", "barcode", "text"].includes(codeType)) {
    return { error: "Elige un tipo de código válido." };
  }

  const branchNames = formData.getAll("branch_name").map((v) => String(v).trim());
  const branchAddresses = formData
    .getAll("branch_address")
    .map((v) => String(v).trim());
  const branchRows = branchNames
    .map((n, i) => ({ name: n, address: branchAddresses[i] ?? "" }))
    .filter((b) => b.name || b.address);

  if (branchRows.length === 0) {
    return { error: "Agrega al menos una sucursal." };
  }

  const admin = createAdminClient();

  const { data: biz, error: bizErr } = await admin
    .from("businesses")
    .insert({ name, website: website || null, contact_email: contactEmail })
    .select("id")
    .single();
  if (bizErr || !biz) {
    return { error: "No pudimos guardar el negocio. Inténtalo de nuevo." };
  }

  const { error: benErr } = await admin.from("benefits").insert({
    business_id: biz.id,
    title,
    description: description || null,
    code_type: codeType,
    status: "pending",
  });
  if (benErr) {
    return { error: "No pudimos guardar el beneficio. Inténtalo de nuevo." };
  }

  await admin.from("branches").insert(
    branchRows.map((b) => ({
      business_id: biz.id,
      name: b.name || null,
      address: b.address || null,
    })),
  );

  // Aviso al admin (no bloquea si el correo falla).
  await notifyAdminNewBenefit({
    business: name,
    title,
    branches: branchRows.length,
  });

  return { success: true };
}
