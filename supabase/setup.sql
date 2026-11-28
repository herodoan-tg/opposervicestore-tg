-- OPPO Shop Dashboard: Supabase schema + Row Level Security
-- 1) Create the first user in Supabase Dashboard > Authentication > Users.
-- 2) Run this entire script in SQL Editor. It promotes hung.doan@oppo-aed.vn to admin.
-- 3) Add employee accounts under Authentication > Users; they default to member/read-only.

create table if not exists public.dashboard_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'member' check (role in ('admin','member')),
  created_at timestamptz not null default now()
);

create or replace function public.dashboard_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.dashboard_profiles p
    where p.user_id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.dashboard_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.dashboard_profiles(user_id,email,display_name,role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    'member'
  )
  on conflict (user_id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists dashboard_auth_user_created on auth.users;
create trigger dashboard_auth_user_created
after insert on auth.users
for each row execute procedure public.dashboard_handle_new_user();

insert into public.dashboard_profiles(user_id,email,display_name,role)
select id,email,coalesce(raw_user_meta_data->>'name',split_part(email,'@',1)),'member'
from auth.users
on conflict (user_id) do update set email=excluded.email;

update public.dashboard_profiles
set role='admin', display_name='Quản trị viên'
where lower(email)=lower('hung.doan@oppo-aed.vn');

create table if not exists public.dashboard_state (
  id text primary key check (id = 'main'),
  data jsonb not null,
  targets jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.dashboard_profiles enable row level security;
alter table public.dashboard_state enable row level security;

drop policy if exists "Users can read own profile or admins read all" on public.dashboard_profiles;
create policy "Users can read own profile or admins read all"
on public.dashboard_profiles for select to authenticated
using (user_id = auth.uid() or public.dashboard_is_admin());

drop policy if exists "Admins can manage profiles" on public.dashboard_profiles;
create policy "Admins can manage profiles"
on public.dashboard_profiles for all to authenticated
using (public.dashboard_is_admin())
with check (public.dashboard_is_admin());

drop policy if exists "Authenticated users can read dashboard" on public.dashboard_state;
create policy "Authenticated users can read dashboard"
on public.dashboard_state for select to authenticated
using (true);

drop policy if exists "Admins can insert dashboard" on public.dashboard_state;
create policy "Admins can insert dashboard"
on public.dashboard_state for insert to authenticated
with check (public.dashboard_is_admin() and updated_by = auth.uid());

drop policy if exists "Admins can update dashboard" on public.dashboard_state;
create policy "Admins can update dashboard"
on public.dashboard_state for update to authenticated
using (public.dashboard_is_admin())
with check (public.dashboard_is_admin() and updated_by = auth.uid());

grant usage on schema public to authenticated;
grant select on public.dashboard_profiles to authenticated;
grant insert, update, select on public.dashboard_state to authenticated;
