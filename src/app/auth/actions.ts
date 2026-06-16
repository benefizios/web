"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AuthState = { error?: string; success?: string } | undefined;

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

/** Traduce los mensajes de error de Supabase a español neutro. */
function traducirError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "Correo o contraseña incorrectos.";
  if (m.includes("email not confirmed"))
    return "Todavía no confirmaste tu correo. Revisa tu bandeja de entrada.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Ya existe una cuenta con ese correo.";
  if (m.includes("captcha"))
    return "No pudimos verificar que no eres un bot. Recarga la página e inténtalo de nuevo.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  if (m.includes("password"))
    return "La contraseña no cumple los requisitos (mínimo 8 caracteres).";
  return "Ocurrió un error. Inténtalo de nuevo.";
}

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Completa el correo y la contraseña." };

  const captchaToken =
    String(formData.get("cf-turnstile-response") ?? "") || undefined;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });
  if (error) return { error: traducirError(error.message) };

  revalidatePath("/", "layout");
  redirect("/beneficios");
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password)
    return { error: "Completa todos los campos." };
  if (password.length < 8)
    return { error: "La contraseña debe tener al menos 8 caracteres." };

  // ¿El correo ya está registrado? (mensaje claro en vez del genérico)
  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existing) {
    return {
      error: "Ya existe una cuenta con ese correo. Inicia sesión.",
    };
  }

  const captchaToken =
    String(formData.get("cf-turnstile-response") ?? "") || undefined;
  const ref = String(formData.get("ref") ?? "").trim() || undefined;
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, ...(ref ? { ref } : {}) },
      emailRedirectTo: `${siteUrl()}/auth/confirm?next=/beneficios`,
      captchaToken,
    },
  });
  if (error) return { error: traducirError(error.message) };

  return {
    success:
      "Te enviamos un correo para confirmar tu cuenta. Revisa tu bandeja de entrada.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Ingresa tu correo." };

  const captchaToken =
    String(formData.get("cf-turnstile-response") ?? "") || undefined;
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/confirm?next=/actualizar-contrasena`,
    captchaToken,
  });
  if (error) return { error: traducirError(error.message) };

  return {
    success:
      "Si el correo existe, te enviamos un enlace para restablecer la contraseña.",
  };
}

export async function updatePassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 8)
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  if (password !== confirm) return { error: "Las contraseñas no coinciden." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: traducirError(error.message) };

  revalidatePath("/", "layout");
  redirect("/cuenta");
}

export async function joinWaitlist(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email || !email.includes("@"))
    return { error: "Ingresa un correo válido." };

  // service_role: la tabla waitlist tiene RLS sin políticas (acceso solo server).
  const admin = createAdminClient();
  const { error } = await admin
    .from("waitlist")
    .upsert({ email }, { onConflict: "email" });
  if (error) return { error: "No pudimos registrarte. Inténtalo de nuevo." };

  return { success: "ok" };
}
