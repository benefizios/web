-- 0003: categoría del beneficio + zona de la sucursal (para la vista de miembro)
alter table public.benefits add column if not exists category text;
alter table public.branches add column if not exists zone text;
