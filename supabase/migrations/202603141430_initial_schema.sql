create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.tenants (
  id uuid primary key,
  name text not null,
  slug text not null unique,
  default_region text not null,
  critical_alarm_threshold integer not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  full_name text,
  role text not null default 'operator',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscription_plans (
  id uuid primary key,
  code text not null unique,
  name text not null,
  price_monthly_cents integer not null,
  site_limit integer not null,
  base_station_limit integer not null,
  support_tier text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  plan_id uuid not null references public.subscription_plans (id),
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled')),
  seats integer not null default 1,
  started_at date not null,
  renews_at date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id)
);

create table if not exists public.sites (
  id uuid primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  code text not null,
  region text not null,
  uptime numeric(5,2) not null default 0,
  subscribers integer not null default 0,
  status text not null check (status in ('online', 'degraded', 'offline')),
  technology text not null,
  coverage_percent integer not null default 0,
  monthly_energy_cost_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create table if not exists public.base_stations (
  id uuid primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  site_id uuid not null references public.sites (id) on delete cascade,
  code text not null,
  vendor text not null,
  power_level integer not null check (power_level between 0 and 100),
  backhaul_usage integer not null check (backhaul_usage between 0 and 100),
  status text not null check (status in ('online', 'degraded', 'offline')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create table if not exists public.alarms (
  id uuid primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  site_id uuid not null references public.sites (id) on delete cascade,
  base_station_id uuid references public.base_stations (id) on delete set null,
  title text not null,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  category text not null,
  acknowledged boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  subscription_id uuid references public.subscriptions (id) on delete set null,
  account_name text not null,
  amount_cents integer not null,
  due_date date not null,
  status text not null check (status in ('paid', 'pending', 'overdue')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.network_snapshots (
  id uuid primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  label text not null,
  coverage integer not null check (coverage between 0 and 100),
  utilization integer not null check (utilization between 0 and 100),
  energy_cost_cents integer not null,
  snapshot_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_tenant_id on public.profiles (tenant_id);
create index if not exists idx_sites_tenant_id on public.sites (tenant_id);
create index if not exists idx_base_stations_tenant_id on public.base_stations (tenant_id);
create index if not exists idx_base_stations_site_id on public.base_stations (site_id);
create index if not exists idx_alarms_tenant_id on public.alarms (tenant_id);
create index if not exists idx_alarms_site_id on public.alarms (site_id);
create index if not exists idx_invoices_tenant_id on public.invoices (tenant_id);
create index if not exists idx_snapshots_tenant_id on public.network_snapshots (tenant_id);

drop trigger if exists tenants_set_updated_at on public.tenants;
create trigger tenants_set_updated_at before update on public.tenants
for each row execute function public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists subscription_plans_set_updated_at on public.subscription_plans;
create trigger subscription_plans_set_updated_at before update on public.subscription_plans
for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions
for each row execute function public.set_updated_at();

drop trigger if exists sites_set_updated_at on public.sites;
create trigger sites_set_updated_at before update on public.sites
for each row execute function public.set_updated_at();

drop trigger if exists base_stations_set_updated_at on public.base_stations;
create trigger base_stations_set_updated_at before update on public.base_stations
for each row execute function public.set_updated_at();

drop trigger if exists alarms_set_updated_at on public.alarms;
create trigger alarms_set_updated_at before update on public.alarms
for each row execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists network_snapshots_set_updated_at on public.network_snapshots;
create trigger network_snapshots_set_updated_at before update on public.network_snapshots
for each row execute function public.set_updated_at();

alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.sites enable row level security;
alter table public.base_stations enable row level security;
alter table public.alarms enable row level security;
alter table public.invoices enable row level security;
alter table public.network_snapshots enable row level security;

create policy "profiles_select_self" on public.profiles
for select using (auth.uid() = id);

create policy "profiles_update_self" on public.profiles
for update using (auth.uid() = id);
