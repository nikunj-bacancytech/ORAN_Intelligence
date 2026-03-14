alter table public.tenants alter column id set default gen_random_uuid();
alter table public.subscription_plans alter column id set default gen_random_uuid();
alter table public.subscriptions alter column id set default gen_random_uuid();
alter table public.sites alter column id set default gen_random_uuid();
alter table public.base_stations alter column id set default gen_random_uuid();
alter table public.alarms alter column id set default gen_random_uuid();
alter table public.invoices alter column id set default gen_random_uuid();
alter table public.network_snapshots alter column id set default gen_random_uuid();
