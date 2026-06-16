import QrCode from "./QrCode";
import Barcode from "./Barcode";
import LiveClock from "./LiveClock";

/** Tarjeta de redención estilo ticket: código + holograma animado + hora en vivo. */
export default function RedeemCode({
  codeType,
  seed,
}: {
  codeType: string;
  seed: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl">
      <div className="relative px-8 pb-8 pt-9">
        <div className="relative mx-auto w-fit">
          {codeType === "barcode" ? (
            <Barcode value={seed} className="h-28 w-64" />
          ) : codeType === "text" ? (
            <div className="rounded-2xl bg-mist px-8 py-10 text-center">
              <p className="font-display text-lg font-bold text-ink">
                Muestra esta pantalla
              </p>
              <p className="mt-1 text-sm text-ink/60">al momento de pagar</p>
            </div>
          ) : (
            <QrCode value={seed} className="h-56 w-56" />
          )}

          {/* Lámina holográfica sobre el código (no sobre el texto) */}
          {codeType !== "text" && (
            <div className="holo-shine pointer-events-none absolute -inset-1 rounded-xl" />
          )}
        </div>
      </div>

      {/* Perforación del ticket + reloj en vivo */}
      <div className="relative border-t border-dashed border-black/15 bg-mist/30 px-8 py-5">
        <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#fdedb6]" />
        <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#fdedb6]" />
        <LiveClock />
      </div>
    </div>
  );
}
