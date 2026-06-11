import type { Metadata } from "next";
import Link from "next/link";
import AuthShell, { Field } from "@/components/auth/AuthShell";
import Brand from "@/components/Brand";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle={<>Empieza a ahorrar con tu membresía <Brand />.</>}
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-ink underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      {/* TODO(supabase): conectar con Supabase Auth (signUp) + alta de membresía. */}
      <form className="space-y-4">
        <Field label="Nombre" placeholder="Mauricio Islas" autoComplete="name" />
        <Field
          label="Correo"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
        />
        <Field
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Crear cuenta
        </button>
        <p className="text-center text-xs text-ink/40">
          Al registrarte aceptas los términos y la política de privacidad.
        </p>
      </form>
    </AuthShell>
  );
}
