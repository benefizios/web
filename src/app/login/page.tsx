import type { Metadata } from "next";
import Link from "next/link";
import AuthShell, { Field } from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Ingresa para ver tus benefizios."
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="font-semibold text-ink underline">
            Regístrate
          </Link>
        </>
      }
    >
      {/* TODO(supabase): conectar con Supabase Auth (signInWithPassword). */}
      <form className="space-y-4">
        <Field
          label="Correo"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
        />
        <Field
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Iniciar sesión
        </button>
      </form>
    </AuthShell>
  );
}
