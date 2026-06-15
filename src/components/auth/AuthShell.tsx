import Image from "next/image";
import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[480px]">
        <div className="brand-glow absolute inset-0" />
      </div>

      <div className="relative w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center" aria-label="Inicio">
          <Image
            src="/logo-benefizios.png"
            alt="Benefizios"
            width={160}
            height={45}
            className="h-8 w-auto"
            priority
            unoptimized
          />
        </Link>

        <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-xl">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-1 text-sm text-ink/55">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-ink/55">{footer}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  defaultValue,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        defaultValue={value === undefined ? defaultValue : undefined}
        className="w-full rounded-xl border border-haze bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
      />
    </label>
  );
}
