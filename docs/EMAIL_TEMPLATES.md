# Plantillas de correo (Supabase Auth)

Los correos de **confirmación de cuenta** y **recuperación de contraseña** los
envía Supabase, así que su diseño y su enlace se configuran en el dashboard:
**Authentication → Email Templates**.

> El enlace apunta a **`/auth/confirm`** (la ruta que funciona). El fondo es un
> degradado amarillo de marca (fuerte arriba → claro), con el logo sobre la
> tarjeta blanca.

## 1) Site URL y Redirect URLs

**Authentication → URL Configuration:**

- **Site URL:** `https://benefizios.com`
- **Redirect URLs:** `https://benefizios.com/**` (y `http://localhost:3000/**` para local)

## 2) Plantilla "Confirm signup"

```html
<!doctype html>
<html lang="es"><body style="margin:0;background-color:#ffe49a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffe49a;background-image:linear-gradient(180deg,#ffcb03 0%,#ffdc5e 26%,#ffeeb3 55%,#fff8df 100%);padding:56px 14px;font-family:Arial,Helvetica,sans-serif">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fff;border-radius:24px;overflow:hidden;border:1px solid rgba(0,0,0,0.05)">
      <tr><td style="padding:34px 32px 6px" align="center">
        <img src="https://benefizios.com/logo-benefizios.png" alt="Benefizios" height="34" style="display:block;border:0;height:34px">
      </td></tr>
      <tr><td style="padding:14px 36px 36px" align="center">
        <h1 style="margin:0 0 12px;font-size:23px;color:#232323">Confirma tu cuenta</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555">Gracias por unirte a Benefizios. Confirma tu correo para activar tu cuenta y empezar a ahorrar.</p>
        <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/cuenta" style="display:inline-block;background:#232323;color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:15px">Confirmar mi correo</a>
        <p style="margin:24px 0 0;font-size:12px;color:#999">Si no creaste esta cuenta, puedes ignorar este correo.</p>
      </td></tr>
    </table>
    <p style="max-width:480px;margin:18px auto 0;font-size:11px;color:#8a7a3a;text-align:center">Benefizios · Tu decisión inteligente</p>
  </td></tr>
</table>
</body></html>
```

## 3) Plantilla "Reset Password"

```html
<!doctype html>
<html lang="es"><body style="margin:0;background-color:#ffe49a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffe49a;background-image:linear-gradient(180deg,#ffcb03 0%,#ffdc5e 26%,#ffeeb3 55%,#fff8df 100%);padding:56px 14px;font-family:Arial,Helvetica,sans-serif">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fff;border-radius:24px;overflow:hidden;border:1px solid rgba(0,0,0,0.05)">
      <tr><td style="padding:34px 32px 6px" align="center">
        <img src="https://benefizios.com/logo-benefizios.png" alt="Benefizios" height="34" style="display:block;border:0;height:34px">
      </td></tr>
      <tr><td style="padding:14px 36px 36px" align="center">
        <h1 style="margin:0 0 12px;font-size:23px;color:#232323">Restablece tu contraseña</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555">Recibimos una solicitud para cambiar tu contraseña. Haz clic para crear una nueva.</p>
        <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/actualizar-contrasena" style="display:inline-block;background:#232323;color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:bold;font-size:15px">Crear nueva contraseña</a>
        <p style="margin:24px 0 0;font-size:12px;color:#999">Si no lo solicitaste, ignora este correo; tu contraseña no cambia.</p>
      </td></tr>
    </table>
    <p style="max-width:480px;margin:18px auto 0;font-size:11px;color:#8a7a3a;text-align:center">Benefizios · Tu decisión inteligente</p>
  </td></tr>
</table>
</body></html>
```

## 4) (Opcional) Magic Link / Invite / Change Email

Mismo diseño cambiando el `type`: `magiclink`, `invite`, `email_change`.

Nuestros correos propios usan el mismo diseño desde `src/lib/email.ts`
(`brandedEmail`).
