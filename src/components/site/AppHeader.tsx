import Image from "next/image";
import Link from "next/link";

/** Barra superior para usuarios con sesión: logo + menú. */
export default function AppHeader({
  active,
}: {
  active?: "beneficios" | "refiere" | "cuenta";
}) {
  const item = (current: boolean) =>
    `text-sm font-semibold transition-colors ${
      current ? "text-ink" : "text-ink/55 hover:text-ink"
    }`;

  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/beneficios" aria-label="Beneficios">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={130}
            height={36}
            className="h-6 w-auto"
            unoptimized
          />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/beneficios" className={item(active === "beneficios")}>
            Beneficios
          </Link>
          <Link href="/refiere" className={item(active === "refiere")}>
            Refiere y gana
          </Link>
          <Link href="/cuenta" className={item(active === "cuenta")}>
            Mi cuenta
          </Link>
        </nav>
      </div>
    </header>
  );
}
