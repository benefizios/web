import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import ActualizarForm from "./ActualizarForm";

export const metadata: Metadata = { title: "Nueva contraseña" };

export default function ActualizarContrasenaPage() {
  return (
    <AuthShell
      title="Crea una nueva contraseña"
      subtitle="Elige una contraseña segura para tu cuenta."
      footer={null}
    >
      <ActualizarForm />
    </AuthShell>
  );
}
