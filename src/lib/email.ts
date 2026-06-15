/**
 * Envío de correos vía Resend (API HTTP, sin SDK).
 * Solo servidor: usa RESEND_API_KEY.
 */
type SendArgs = { to: string | string[]; subject: string; html: string };

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://benefizios.com";

/**
 * Envuelve el contenido en el diseño de marca de Benefizios.
 * Tablas + estilos inline para compatibilidad con clientes de correo.
 */
export function brandedEmail({
  heading,
  body,
  ctaText,
  ctaUrl,
  footnote,
}: {
  heading: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  footnote?: string;
}): string {
  const button =
    ctaText && ctaUrl
      ? `<tr><td style="padding:8px 0 4px">
           <a href="${ctaUrl}" style="display:inline-block;background:#232323;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:15px">${ctaText}</a>
         </td></tr>`
      : "";
  return `<!doctype html>
<html lang="es"><body style="margin:0;background:#f2f2f2">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:32px 12px;font-family:Arial,Helvetica,sans-serif">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #eee">
      <tr><td style="background:#ffcb03;padding:22px 32px">
        <img src="${SITE}/logo-benefizios.png" alt="Benefizios" height="24" style="display:block;border:0;height:24px">
      </td></tr>
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 12px;font-size:22px;line-height:1.25;color:#232323">${heading}</h1>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#555">${body}</p>
        <table role="presentation" cellpadding="0" cellspacing="0">${button}</table>
        ${footnote ? `<p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#999">${footnote}</p>` : ""}
      </td></tr>
    </table>
    <p style="max-width:480px;margin:16px auto 0;font-size:11px;color:#aaa;text-align:center">
      Benefizios · Tu decisión inteligente
    </p>
  </td></tr>
</table>
</body></html>`;
}

export async function sendEmail({ to, subject, html }: SendArgs): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "no-reply@benefizios.com";
  if (!key) {
    console.warn("[email] RESEND_API_KEY ausente; no se envía el correo.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: `Benefizios <${from}>`, to, subject, html }),
    });
    if (!res.ok) {
      console.error("[email] Resend respondió", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[email] error al enviar:", e);
    return false;
  }
}

/** Aviso al admin: hay un beneficio nuevo para revisar. */
export async function notifyAdminNewBenefit(args: {
  business: string;
  title: string;
  branches: number;
}): Promise<boolean> {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to) {
    console.warn("[email] ADMIN_NOTIFY_EMAIL ausente; no se notifica.");
    return false;
  }
  return sendEmail({
    to,
    subject: `Nuevo beneficio para aprobar: ${args.business}`,
    html: brandedEmail({
      heading: "Nuevo beneficio cargado",
      body: `<b>${args.business}</b> cargó el beneficio “${args.title}” con ${args.branches} sucursal(es). Espera tu aprobación.`,
      ctaText: "Revisar en el panel",
      ctaUrl: `${SITE}/admin`,
    }),
  });
}
