import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import Brand from "@/components/Brand";
import RegistroForm from "./RegistroForm";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle={
        <>
          Empieza a ahorrar con tu membresía <Brand />.
        </>
      }
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-ink underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <RegistroForm />
      </Suspense>
    </AuthShell>
  );
}
