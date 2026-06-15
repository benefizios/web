/**
 * Envío de correos vía Resend (API HTTP, sin SDK).
 * Solo servidor: usa RESEND_API_KEY.
 */
type SendArgs = { to: string | string[]; subject: string; html: string };

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
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://benefizios.com";
  return sendEmail({
    to,
    subject: `Nuevo beneficio para aprobar: ${args.business}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px">
        <h2 style="margin:0 0 8px">Nuevo beneficio cargado</h2>
        <p style="color:#555;margin:0 0 16px">Un negocio cargó un beneficio que espera tu aprobación.</p>
        <table style="font-size:14px;color:#222">
          <tr><td style="padding:2px 12px 2px 0;color:#888">Negocio</td><td><b>${args.business}</b></td></tr>
          <tr><td style="padding:2px 12px 2px 0;color:#888">Beneficio</td><td>${args.title}</td></tr>
          <tr><td style="padding:2px 12px 2px 0;color:#888">Sucursales</td><td>${args.branches}</td></tr>
        </table>
        <p style="margin:20px 0 0">
          <a href="${site}/admin" style="background:#232323;color:#fff;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600">Revisar en el panel</a>
        </p>
      </div>
    `,
  });
}
