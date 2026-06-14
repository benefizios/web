"use client";

import { useFormStatus } from "react-dom";

/** Botón de submit que muestra estado de carga vía useFormStatus. */
export default function SubmitButton({
  children,
  pendingLabel,
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (pendingLabel ?? "Procesando…") : children}
    </button>
  );
}
