import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import RecuperarForm from "./RecuperarForm";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function RecuperarPage() {
  return (
    <AuthShell
      title="¿Olvidaste tu contraseña?"
      subtitle="Ingresa tu correo y te enviamos un enlace para crear una nueva."
      footer={
        <>
          ¿La recordaste?{" "}
          <Link href="/login" className="font-semibold text-ink underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <RecuperarForm />
    </AuthShell>
  );
}
