alter table public.wave_audit_leads
  add column if not exists submission_id uuid,
  add column if not exists report_version smallint not null default 1,
  add column if not exists delivery_status text not null default 'stored';

update public.wave_audit_leads
set submission_id = gen_random_uuid()
where submission_id is null;

alter table public.wave_audit_leads
  alter column submission_id set not null,
  alter column submission_id set default gen_random_uuid();

create unique index if not exists wave_audit_leads_submission_id_idx
  on public.wave_audit_leads (submission_id);

alter table public.wave_audit_leads
  drop constraint if exists wave_audit_leads_report_version_check,
  add constraint wave_audit_leads_report_version_check
    check (report_version between 1 and 100),
  drop constraint if exists wave_audit_leads_delivery_status_check,
  add constraint wave_audit_leads_delivery_status_check
    check (delivery_status in ('stored', 'pending', 'sent', 'failed'));

revoke all on table public.wave_audit_leads from anon, authenticated;
grant insert (
  submission_id,
  email,
  answers,
  score,
  top_category,
  opportunities,
  recommended_agent,
  confidence_label,
  source,
  report_version
) on table public.wave_audit_leads to anon, authenticated;
