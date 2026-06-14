-- 0002_membership_and_businesses.sql
-- Membresía (3 estados) + negocios/beneficios/sucursales + rol admin.
-- Idempotente.

-- ── Membresía y rol en profiles ──────────────────────────────
alter table public.profiles
  add column if not exists membership_status text not null default 'inactive',
  add column if not exists membership_activated_at timestamptz,
  add column if not exists role text not null default 'member';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_membership_status_chk') then
    alter table public.profiles add constraint profiles_membership_status_chk
      check (membership_status in ('inactive', 'active'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'profiles_role_chk') then
    alter table public.profiles add constraint profiles_role_chk
      check (role in ('member', 'admin'));
  end if;
end $$;

-- ── Negocios (marcas que ofrecen beneficios) ─────────────────
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users (id) on delete set null,
  name text not null,
  website text,
  contact_email text,
  created_at timestamptz not null default now()
);

-- ── Beneficios (un beneficio, muchas sucursales) ─────────────
create table if not exists public.benefits (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  title text not null,
  description text,
  code_type text not null default 'qr',
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id)
);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'benefits_code_type_chk') then
    alter table public.benefits add constraint benefits_code_type_chk
      check (code_type in ('qr', 'barcode', 'text'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'benefits_status_chk') then
    alter table public.benefits add constraint benefits_status_chk
      check (status in ('pending', 'approved', 'rejected'));
  end if;
end $$;

-- ── Sucursales (con coordenadas para "cerca de ti") ──────────
create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  name text,
  address text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);

-- RLS: por ahora todo acceso es server-side (service_role).
-- Las políticas finas (miembro activo ve aprobados, negocio ve lo suyo,
-- admin ve todo) se definen cuando construyamos esos flujos.
alter table public.businesses enable row level security;
alter table public.benefits enable row level security;
alter table public.branches enable row level security;
