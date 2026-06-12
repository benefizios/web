-- 0001_init.sql · Esquema inicial de Benefizios
-- Idempotente: se puede correr varias veces sin romper.

-- ── profiles ─────────────────────────────────────────────────
-- Un perfil por usuario de auth. Se crea automáticamente al registrarse.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "perfil: ver el propio" on public.profiles;
create policy "perfil: ver el propio"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "perfil: editar el propio" on public.profiles;
create policy "perfil: editar el propio"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: crear el perfil cuando se da de alta un usuario en auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── waitlist ─────────────────────────────────────────────────
-- Emails de la lista de espera de la landing.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;
-- Sin políticas a propósito: nadie accede directo desde el cliente.
-- Las altas se hacen en el servidor con la service_role key.
