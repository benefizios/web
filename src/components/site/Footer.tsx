import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Image
              src="/logo-benefizios.png"
              alt="Benefizios"
              width={150}
              height={42}
              unoptimized
              className="h-7 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm text-ink/50">
              Tu decisión inteligente. Descuentos de uso cotidiano con una sola
              membresía.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a href="#beneficios" className="text-ink/60 hover:text-ink">
              Benefizios
            </a>
            <a href="#como-funciona" className="text-ink/60 hover:text-ink">
              Cómo funciona
            </a>
            <a href="#referidos" className="text-ink/60 hover:text-ink">
              Referidos
            </a>
            <a href="#preguntas" className="text-ink/60 hover:text-ink">
              Preguntas
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Próximamente
            </span>
            <div className="flex gap-2">
              <span className="rounded-lg border border-haze px-3 py-2 text-xs font-medium text-ink/50">
                ▸ App Store
              </span>
              <span className="rounded-lg border border-haze px-3 py-2 text-xs font-medium text-ink/50">
                ▸ Google Play
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-ink/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Benefizios. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link href="/login" className="hover:text-ink">
              Iniciar sesión
            </Link>
            <Link href="/registro" className="hover:text-ink">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
