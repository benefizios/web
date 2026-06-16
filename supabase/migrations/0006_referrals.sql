-- 0006_referrals.sql · Programa de referidos
-- Cada perfil tiene un código único para compartir y guarda quién lo refirió.
-- Idempotente: se puede correr varias veces sin romper.

-- ── Columnas ─────────────────────────────────────────────────
alter table public.profiles
  add column if not exists referral_code text,
  add column if not exists referred_by uuid references public.profiles (id);

-- ── Generador de códigos cortos y únicos ─────────────────────
-- 8 caracteres, sin letras/números ambiguos (0/O, 1/I, etc.).
create or replace function public.gen_referral_code()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  code text;
  i int;
  libre boolean;
begin
  loop
    code := '';
    for i in 1..8 loop
      code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    select not exists (select 1 from public.profiles where referral_code = code)
      into libre;
    exit when libre;
  end loop;
  return code;
end;
$$;

-- ── Backfill de perfiles existentes (uno por uno para no colisionar) ──
do $$
declare
  r record;
begin
  for r in select id from public.profiles where referral_code is null loop
    update public.profiles
      set referral_code = public.gen_referral_code()
      where id = r.id;
  end loop;
end $$;

-- Unicidad (los NULL no chocan entre sí en Postgres).
create unique index if not exists profiles_referral_code_key
  on public.profiles (referral_code);

-- ── El trigger ahora asigna código y resuelve al referidor ───
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  ref_code text;
  ref_id uuid;
begin
  ref_code := nullif(trim(new.raw_user_meta_data ->> 'ref'), '');
  if ref_code is not null then
    select id into ref_id
      from public.profiles
      where referral_code = upper(ref_code);
  end if;

  insert into public.profiles (id, full_name, email, referral_code, referred_by)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    public.gen_referral_code(),
    ref_id
  );
  return new;
end;
$$;
