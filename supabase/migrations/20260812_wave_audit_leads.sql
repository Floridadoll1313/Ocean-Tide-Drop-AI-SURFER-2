create table if not exists public.wave_audit_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  answers jsonb not null,
  score integer not null check (score between 0 and 100),
  top_category text not null,
  opportunities jsonb not null default '[]'::jsonb,
  recommended_agent text not null,
  confidence_label text not null,
  source text not null default 'wave-audit',
  created_at timestamptz not null default now()
);

create index if not exists wave_audit_leads_created_at_idx
  on public.wave_audit_leads (created_at desc);

create index if not exists wave_audit_leads_email_idx
  on public.wave_audit_leads (lower(email));

alter table public.wave_audit_leads enable row level security;

revoke all on table public.wave_audit_leads from anon, authenticated;
grant insert on table public.wave_audit_leads to anon, authenticated;

drop policy if exists "Allow public Wave Audit lead inserts" on public.wave_audit_leads;
create policy "Allow public Wave Audit lead inserts"
  on public.wave_audit_leads
  for insert
  to anon, authenticated
  with check (
    source = 'wave-audit'
    and score between 0 and 100
    and length(trim(email)) > 3
  );
