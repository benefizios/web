/**
 * Marca "benefizios" como token tipográfico.
 * Siempre en minúscula, en negrita y con la tipografía del logo (Poppins),
 * para que se lea como marca y no como una palabra mal escrita.
 *
 * Uso: <Brand /> → "benefizios"  ·  <Brand>benefizio</Brand> → singular
 */
export default function Brand({
  children = "benefizios",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-display font-extrabold lowercase tracking-tight ${className}`}>
      {children}
    </span>
  );
}
