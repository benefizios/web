import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import Brand from "@/components/Brand";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle={
        <>
          Ingresa para ver tus <Brand />.
        </>
      }
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="font-semibold text-ink underline">
            Regístrate
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
