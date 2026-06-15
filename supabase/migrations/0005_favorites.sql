-- 0005: beneficios favoritos por usuario
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  benefit_id uuid not null references public.benefits (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, benefit_id)
);
alter table public.favorites enable row level security;
-- Acceso server-side (service_role). Políticas finas si se necesitan luego.
