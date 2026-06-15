"use client";

import { useActionState, useState } from "react";
import { submitBusiness, type NegocioState } from "./actions";

const inputClass =
  "w-full rounded-xl border border-haze bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand";
const labelClass = "mb-1.5 block text-sm font-medium text-ink/80";

let branchSeq = 1;

export default function NegociosForm() {
  const [state, action, pending] = useActionState<NegocioState, FormData>(
    submitBusiness,
    undefined,
  );
  const [branches, setBranches] = useState<number[]>([0]);

  if (state?.success) {
    return (
      <div className="rounded-3xl border border-brand/40 bg-cream p-8 text-center">
        <p className="text-4xl">📨</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink">
          ¡Recibimos tu beneficio!
        </h2>
        <p className="mt-2 text-ink/60">
          Nuestro equipo lo revisa y te avisamos por correo cuando esté
          publicado. Gracias por sumarte.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {/* Negocio */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-ink">
          Tu negocio
        </legend>
        <label className="block">
          <span className={labelClass}>Nombre del negocio</span>
          <input name="name" required placeholder="Cafético" className={inputClass} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Sitio web (opcional)</span>
            <input name="website" placeholder="https://…" className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Correo de contacto</span>
            <input
              name="contact_email"
              type="email"
              required
              placeholder="hola@tunegocio.com"
              className={inputClass}
            />
          </label>
        </div>
      </fieldset>

      {/* Beneficio */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-ink">
          El beneficio
        </legend>
        <label className="block">
          <span className={labelClass}>¿Qué descuento ofreces?</span>
          <input
            name="title"
            required
            placeholder="2x1 en cafés de lunes a viernes"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Detalles (opcional)</span>
          <textarea
            name="description"
            rows={2}
            placeholder="Condiciones, vigencia, restricciones…"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>¿Cómo se redime?</span>
          <select name="code_type" className={inputClass} defaultValue="qr">
            <option value="qr">Código QR</option>
            <option value="barcode">Código de barras</option>
            <option value="text">Texto (mostrar en el local)</option>
          </select>
        </label>
      </fieldset>

      {/* Sucursales */}
      <fieldset className="space-y-3">
        <legend className="font-display text-lg font-bold text-ink">
          Sucursales
        </legend>
        <p className="text-sm text-ink/55">
          Dónde se puede usar el beneficio. Podrás cargar las coordenadas exactas
          después.
        </p>
        {branches.map((id, i) => (
          <div key={id} className="grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
            <input
              name="branch_name"
              placeholder={`Sucursal ${i + 1}`}
              className={inputClass}
            />
            <input
              name="branch_address"
              placeholder="Dirección"
              className={inputClass}
            />
            {branches.length > 1 && (
              <button
                type="button"
                onClick={() => setBranches((b) => b.filter((x) => x !== id))}
                className="rounded-xl border border-haze px-3 text-sm text-ink/50 transition-colors hover:bg-mist"
                aria-label="Quitar sucursal"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setBranches((b) => [...b, branchSeq++])}
          className="text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
        >
          + Agregar otra sucursal
        </button>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink py-3.5 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar para revisión"}
      </button>
      <p className="text-center text-xs text-ink/40">
        Participar es gratis. Revisamos cada beneficio antes de publicarlo.
      </p>
    </form>
  );
}
