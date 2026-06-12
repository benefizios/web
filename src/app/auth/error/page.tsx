import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Enlace inválido" };

export default function AuthErrorPage() {
  return (
    <AuthShell
      title="Enlace inválido o vencido"
      subtitle="El enlace que usaste ya no es válido. Esto puede pasar si expiró o ya se utilizó."
      footer={
        <>
          ¿Necesitas un enlace nuevo?{" "}
          <Link href="/recuperar" className="font-semibold text-ink underline">
            Solicítalo de nuevo
          </Link>
        </>
      }
    >
      <Link
        href="/login"
        className="block w-full rounded-xl bg-ink py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        Volver a iniciar sesión
      </Link>
    </AuthShell>
  );
}
