alter table public.sites
  add column if not exists is_active boolean not null default true;

alter table public.base_stations
  add column if not exists is_active boolean not null default true;
