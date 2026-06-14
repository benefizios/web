# Roadmap de producto · Benefizios

Notas de funcionalidades futuras. **Nada de esto está implementado todavía** —
es contexto para ir preparando el diseño y la arquitectura.

## Beneficios y establecimientos

- [ ] **Catálogo de establecimientos con beneficios.** El usuario ve los
      comercios que ofrecen beneficios.
- [ ] **Gating por membresía.** Los beneficios solo son visibles si el usuario
      está **logueado y con membresía activa**. Sin eso, se muestran bloqueados
      (ver `components/prueba/LockedBenefits.tsx` como referencia visual).
- [ ] **Código por beneficio.** Cada beneficio muestra un código para redimir:
      **QR** o **código de barras**, según lo que elija el negocio. (También
      puede ser texto descriptivo.)

## Validación / redención (lado negocio)

- [ ] **Usuario validador por defecto.** El negocio escanea el código del
      usuario con **nuestra app en perfil de negocio**.
- [ ] **Integración con sistema propio.** Si el negocio ya tiene un lector de
      códigos, podemos implementar/integrar su código ahí en lugar del
      validador propio.
- [ ] **Perfil de negocio** (alta, gestión de beneficios, vista de validación).

## Geolocalización

- [ ] **Coordenadas por negocio.** Cada negocio carga las coordenadas de sus
      ubicaciones.
- [ ] **Beneficios cerca de ti.** Desde la app, el usuario ve los
      establecimientos con beneficios cercanos (mapa / lista por cercanía).

## Pasarela de pago (acordado: se puede simular para presentar)

- [ ] Cobro de membresía recurrente (tarjeta).
- [ ] Pago a referidores (monto fijo a la tarjeta del que refiere).
- [ ] Para la demo alcanza con **simular** el flujo de pago.

## Diseño

- [x] Dirección visual "audaz y amarilla" en evaluación → `/prueba`
      (tipografía Bricolage Grotesque + Hanken Grotesk, color committed,
      beneficios bloqueados, logos de comercios de ejemplo).
