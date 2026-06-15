-- 0004: guardar el email en profiles (para detectar registros duplicados)
alter table public.profiles add column if not exists email text;

-- backfill de usuarios existentes
update public.profiles p set email = u.email
from auth.users u where u.id = p.id and p.email is null;

-- el trigger ahora también guarda el email
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  return new;
end;
$$;
