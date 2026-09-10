-- contact messages from portfolio forms
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  message text not null,
  intent text not null check (intent in ('talk', 'collaborate')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- inserts only via edge function (service role); no public policies
