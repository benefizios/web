# Plantillas de correo (Supabase Auth)

Los correos de **confirmación de cuenta** y **recuperación de contraseña** los
envía Supabase, así que su diseño y su enlace se configuran en el dashboard:
**Authentication → Email Templates**.

> ⚠️ El bug de "enlace inválido / vencido" era porque las plantillas seguían con
> el enlace por defecto (apuntaba a `…supabase.co/auth/v1/verify`). Estas
> plantillas apuntan a **`/auth/confirm`**, que es la ruta que funciona.

## 1) Site URL y Redirect URLs

**Authentication → URL Configuration:**

- **Site URL:** `https://benefizios.com`  ← con **https** (estaba en http)
- **Redirect URLs:** agregar `https://benefizios.com/**` (y `http://localhost:3000/**` para local)

## 2) Plantilla "Confirm signup"

Pegar tal cual en el cuerpo (HTML) de la plantilla:

```html
<!doctype html>
<html lang="es"><body style="margin:0;background:#f2f2f2">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:32px 12px;font-family:Arial,Helvetica,sans-serif">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #eee">
      <tr><td style="background:#ffcb03;padding:22px 32px">
        <img src="https://benefizios.com/logo-benefizios.png" alt="Benefizios" height="24" style="display:block;border:0;height:24px">
      </td></tr>
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 12px;font-size:22px;color:#232323">Confirma tu cuenta</h1>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#555">Gracias por unirte a Benefizios. Confirma tu correo para activar tu cuenta y empezar a ahorrar.</p>
        <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/cuenta" style="display:inline-block;background:#232323;color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:15px">Confirmar mi correo</a>
        <p style="margin:24px 0 0;font-size:12px;color:#999">Si no creaste esta cuenta, puedes ignorar este correo.</p>
      </td></tr>
    </table>
    <p style="max-width:480px;margin:16px auto 0;font-size:11px;color:#aaa;text-align:center">Benefizios · Tu decisión inteligente</p>
  </td></tr>
</table>
</body></html>
```

## 3) Plantilla "Reset Password"

```html
<!doctype html>
<html lang="es"><body style="margin:0;background:#f2f2f2">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:32px 12px;font-family:Arial,Helvetica,sans-serif">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #eee">
      <tr><td style="background:#ffcb03;padding:22px 32px">
        <img src="https://benefizios.com/logo-benefizios.png" alt="Benefizios" height="24" style="display:block;border:0;height:24px">
      </td></tr>
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 12px;font-size:22px;color:#232323">Restablece tu contraseña</h1>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#555">Recibimos una solicitud para cambiar tu contraseña. Haz clic para crear una nueva.</p>
        <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/actualizar-contrasena" style="display:inline-block;background:#232323;color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:15px">Crear nueva contraseña</a>
        <p style="margin:24px 0 0;font-size:12px;color:#999">Si no lo solicitaste, ignora este correo; tu contraseña no cambia.</p>
      </td></tr>
    </table>
    <p style="max-width:480px;margin:16px auto 0;font-size:11px;color:#aaa;text-align:center">Benefizios · Tu decisión inteligente</p>
  </td></tr>
</table>
</body></html>
```

## 4) (Opcional) Magic Link / Invite / Change Email

Si los usás, mismo diseño cambiando el `type`:
- Magic Link → `type=magiclink`
- Invite → `type=invite`
- Change Email → `type=email_change`

Nuestros correos propios (avisos al admin, etc.) ya usan el mismo diseño desde
`src/lib/email.ts` (`brandedEmail`).
