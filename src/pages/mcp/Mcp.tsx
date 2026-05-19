import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageWrapper from "../../components/PageWrapper";

const markdownContent = `---
name: supabase-postgres-best-practices
description: Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations.
license: MIT
metadata:
  author: supabase
  version: "1.1.1"
  organization: Supabase
  date: January 2026
  abstract: Comprehensive Postgres performance optimization guide for developers using Supabase and Postgres. Contains performance rules across 8 categories, prioritized by impact from critical (query performance, connection management) to incremental (advanced features). Each rule includes detailed explanations, incorrect vs. correct SQL examples, query plan analysis, and specific performance metrics to guide automated optimization and code generation.
---

# Supabase Postgres Best Practices

Comprehensive performance optimization guide for Postgres, maintained by Supabase. Contains rules across 8 categories, prioritized by impact to guide automated query optimization and schema design.

## When to Apply

Reference these guidelines when:
- Writing SQL queries or designing schemas
- Implementing indexes or query optimization
- Reviewing database performance issues
- Configuring connection pooling or scaling
- Optimizing for Postgres-specific features
- Working with Row-Level Security (RLS)

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Query Performance | CRITICAL | \`query-\` |
| 2 | Connection Management | CRITICAL | \`conn-\` |
| 3 | Security & RLS | CRITICAL | \`security-\` |
| 4 | Schema Design | HIGH | \`schema-\` |
| 5 | Concurrency & Locking | MEDIUM-HIGH | \`lock-\` |
| 6 | Data Access Patterns | MEDIUM | \`data-\` |
| 7 | Monitoring & Diagnostics | LOW-MEDIUM | \`monitor-\` |
| 8 | Advanced Features | LOW | \`advanced-\` |

## How to Use

Read individual rule files for detailed explanations and SQL examples:

\`\`\`
references/query-missing-indexes.md
references/query-partial-indexes.md
references/_sections.md
\`\`\`

Each rule file contains:
- Brief explanation of why it matters
- Incorrect SQL example with explanation
- Correct SQL example with explanation
- Optional EXPLAIN output or metrics
- Additional context and references
- Supabase-specific notes (when applicable)

## References

- https://www.postgresql.org/docs/current/
- https://supabase.com/docs
- https://wiki.postgresql.org/wiki/Performance_Optimization
- https://supabase.com/docs/guides/database/overview
- https://supabase.com/docs/guides/auth/row-level-security

---

# Writing Guidelines for Postgres References
This document provides guidelines for creating effective Postgres best practice references that work well with AI agents and LLMs.

## Key Principles
### 1. Concrete Transformation Patterns
Show exact SQL rewrites. Avoid philosophical advice.

**Good:** "Use WHERE id = ANY(ARRAY[...]) instead of WHERE id IN (SELECT ...)" **Bad:** "Design good schemas"

### 2. Error-First Structure
Always show the problematic pattern first, then the solution. This trains agents to recognize anti-patterns.

**Incorrect (sequential queries):** [bad example]

**Correct (batched query):** [good example]

### 3. Quantified Impact
Include specific metrics. Helps agents prioritize fixes.

**Good:** "10x faster queries", "50% smaller index", "Eliminates N+1" **Bad:** "Faster", "Better", "More efficient"

### 4. Self-Contained Examples
Examples should be complete and runnable (or close to it). Include CREATE TABLE if context is needed.

\`\`\`sql
-- Include table definition when needed for clarity
CREATE TABLE users (
  id bigint PRIMARY KEY,
  email text NOT NULL,
  deleted_at timestamptz
);

-- Now show the index
CREATE INDEX users_active_email_idx ON users(email) WHERE deleted_at IS NULL;
\`\`\`

### 5. Semantic Naming
Use meaningful table/column names. Names carry intent for LLMs.

**Good:** users, email, created_at, is_active **Bad:** table1, col1, field, flag

## Code Example Standards
### SQL Formatting
\`\`\`sql
-- Use lowercase keywords, clear formatting
CREATE INDEX CONCURRENTLY users_email_idx
  ON users(email)
  WHERE deleted_at IS NULL;

-- Not cramped or ALL CAPS
CREATE INDEX CONCURRENTLY USERS_EMAIL_IDX ON USERS(EMAIL) WHERE DELETED_AT IS NULL;
\`\`\`

### Comments
- Explain why, not what
- Highlight performance implications
- Point out common pitfalls

### Language Tags
- \`sql\` - Standard SQL queries
- \`plpgsql\` - Stored procedures/functions
- \`typescript\` - Application code (when needed)
- \`python\` - Application code (when needed)

### When to Include Application Code
**Default: SQL Only**

Most references should focus on pure SQL patterns. This keeps examples portable.

Include Application Code When:

- Connection pooling configuration
- Transaction management in application context
- ORM anti-patterns (N+1 in Prisma/TypeORM)
- Prepared statement usage

Format for Mixed Examples:

**Incorrect (N+1 in application):**

\`\`\`typescript
for (const user of users) {
  const posts = await db.query("SELECT * FROM posts WHERE user_id = $1", [
    user.id,
  ]);
}
\`\`\`
**Correct (batch query):**

\`\`\`typescript
const posts = await db.query("SELECT * FROM posts WHERE user_id = ANY($1)", [
  userIds,
]);
\`\`\`

## Impact Level Guidelines
| Level | Improvement | Use When |
|-------|-------------|----------|
| CRITICAL | 10-100x | Missing indexes, connection exhaustion, sequential scans on large tables |
| HIGH | 5-20x | Wrong index types, poor partitioning, missing covering indexes |
| MEDIUM-HIGH | 2-5x | N+1 queries, inefficient pagination, RLS optimization |
| MEDIUM | 1.5-3x | Redundant indexes, query plan instability |
| LOW-MEDIUM | 1.2-2x | VACUUM tuning, configuration tweaks |
| LOW | Incremental | Advanced patterns, edge cases |

## Reference Standards
**Primary Sources:**

- Official Postgres documentation
- Supabase documentation
- Postgres wiki
- Established blogs (2ndQuadrant, Crunchy Data)

## Review Checklist
Before submitting a reference:

- [ ] Title is clear and action-oriented
- [ ] Impact level matches the performance gain
- [ ] impactDescription includes quantification
- [ ] Explanation is concise (1-2 sentences)
- [ ] Has at least 1 Incorrect SQL example
- [ ] Has at least 1 Correct SQL example
- [ ] SQL uses semantic naming
- [ ] Comments explain why, not what
- [ ] Trade-offs mentioned if applicable
- [ ] Reference links included
- [ ] pnpm test passes

## Section Definitions
This file defines the rule categories for Postgres best practices. Rules are automatically assigned to sections based on their filename prefix.

1. **Query Performance (query)**
   - *Impact:* CRITICAL
   - *Description:* Slow queries, missing indexes, inefficient query plans. The most common source of Postgres performance issues.
2. **Connection Management (conn)**
   - *Impact:* CRITICAL
   - *Description:* Connection pooling, limits, and serverless strategies. Critical for applications with high concurrency or serverless deployments.
3. **Security & RLS (security)**
   - *Impact:* CRITICAL
   - *Description:* Row-Level Security policies, privilege management, and authentication patterns.
4. **Schema Design (schema)**
   - *Impact:* HIGH
   - *Description:* Table design, index strategies, partitioning, and data type selection. Foundation for long-term performance.
5. **Concurrency & Locking (lock)**
   - *Impact:* MEDIUM-HIGH
   - *Description:* Transaction management, isolation levels, deadlock prevention, and lock contention patterns.
6. **Data Access Patterns (data)**
   - *Impact:* MEDIUM
   - *Description:* N+1 query elimination, batch operations, cursor-based pagination, and efficient data fetching.
7. **Monitoring & Diagnostics (monitor)**
   - *Impact:* LOW-MEDIUM
   - *Description:* Using \`pg_stat_statements\`, \`EXPLAIN ANALYZE\`, metrics collection, and performance diagnostics.
8. **Advanced Features (advanced)**
   - *Impact:* LOW
   - *Description:* Full-text search, JSONB optimization, PostGIS, extensions, and advanced Postgres features.

---

---
title: Clear, Action-Oriented Title (e.g., "Use Partial Indexes for Filtered Queries")
impact: MEDIUM
impactDescription: 5-20x query speedup for filtered queries
tags: indexes, query-optimization, performance
---

## Use Partial Indexes for Filtered Queries

[1-2 sentence explanation of the problem and why it matters. Focus on performance impact.]

**Incorrect (describe the problem):**

\`\`\`sql
-- Comment explaining what makes this slow/problematic
CREATE INDEX users_email_idx ON users(email);

SELECT * FROM users WHERE email = 'user@example.com' AND deleted_at IS NULL;
-- This scans deleted records unnecessarily
\`\`\`

**Correct (describe the solution):**

\`\`\`sql
-- Comment explaining why this is better
CREATE INDEX users_active_email_idx ON users(email) WHERE deleted_at IS NULL;

SELECT * FROM users WHERE email = 'user@example.com' AND deleted_at IS NULL;
-- Only indexes active users, 10x smaller index, faster queries
\`\`\`

[Optional: Additional context, edge cases, or trade-offs]

Reference: [Postgres Docs](https://www.postgresql.org/docs/current/)

---

---
title: Use tsvector for Full-Text Search
impact: MEDIUM
impactDescription: 100x faster than LIKE, with ranking support
tags: full-text-search, tsvector, gin, search
---

## Use tsvector for Full-Text Search

LIKE with wildcards can't use indexes. Full-text search with tsvector is orders of magnitude faster.

**Incorrect (LIKE pattern matching):**

\`\`\`sql
-- Cannot use index, scans all rows
select * from articles where content like '%postgresql%';

-- Case-insensitive makes it worse
select * from articles where lower(content) like '%postgresql%';
\`\`\`

**Correct (full-text search with tsvector):**

\`\`\`sql
-- Add tsvector column and index
alter table articles add column search_vector tsvector
  generated always as (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,''))) stored;

create index articles_search_idx on articles using gin (search_vector);

-- Fast full-text search
select * from articles
where search_vector @@ to_tsquery('english', 'postgresql & performance');

-- With ranking
select *, ts_rank(search_vector, query) as rank
from articles, to_tsquery('english', 'postgresql') query
where search_vector @@ query
order by rank desc;
\`\`\`

Search multiple terms:

\`\`\`sql
-- AND: both terms required
to_tsquery('postgresql & performance')

-- OR: either term
to_tsquery('postgresql | mysql')

-- Prefix matching
to_tsquery('post:*')
\`\`\`

Reference: [Full Text Search](https://supabase.com/docs/guides/database/full-text-search)
---

---
title: Index JSONB Columns for Efficient Querying
impact: MEDIUM
impactDescription: 10-100x faster JSONB queries with proper indexing
tags: jsonb, gin, indexes, json
---

## Index JSONB Columns for Efficient Querying

JSONB queries without indexes scan the entire table. Use GIN indexes for containment queries.

**Incorrect (no index on JSONB):**

\`\`\`sql
create table products (
  id bigint primary key,
  attributes jsonb
);

-- Full table scan for every query
select * from products where attributes @> '{"color": "red"}';
select * from products where attributes->>'brand' = 'Nike';
\`\`\`

**Correct (GIN index for JSONB):**

\`\`\`sql
-- GIN index for containment operators (@>, ?, ?&, ?|)
create index products_attrs_gin on products using gin (attributes);

-- Now containment queries use the index
select * from products where attributes @> '{"color": "red"}';

-- For specific key lookups, use expression index
create index products_brand_idx on products ((attributes->>'brand'));
select * from products where attributes->>'brand' = 'Nike';
\`\`\`

Choose the right operator class:

\`\`\`sql
-- jsonb_ops (default): supports all operators, larger index
create index idx1 on products using gin (attributes);

-- jsonb_path_ops: only @> operator, but 2-3x smaller index
create index idx2 on products using gin (attributes jsonb_path_ops);
\`\`\`

Reference: [JSONB Indexes](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)


---
title: Configure Idle Connection Timeouts
impact: HIGH
impactDescription: Reclaim 30-50% of connection slots from idle clients
tags: connections, timeout, idle, resource-management
---

## Configure Idle Connection Timeouts

Idle connections waste resources. Configure timeouts to automatically reclaim them.

**Incorrect (connections held indefinitely):**

\`\`\`sql
-- No timeout configured
show idle_in_transaction_session_timeout;  -- 0 (disabled)

-- Connections stay open forever, even when idle
select pid, state, state_change, query
from pg_stat_activity
where state = 'idle in transaction';
-- Shows transactions idle for hours, holding locks
\`\`\`

**Correct (automatic cleanup of idle connections):**

\`\`\`sql
-- Terminate connections idle in transaction after 30 seconds
alter system set idle_in_transaction_session_timeout = '30s';

-- Terminate completely idle connections after 10 minutes
alter system set idle_session_timeout = '10min';

-- Reload configuration
select pg_reload_conf();
\`\`\`

For pooled connections, configure at the pooler level:

\`\`\`ini
# pgbouncer.ini
server_idle_timeout = 60
client_idle_timeout = 300
\`\`\`

Reference: [Connection Timeouts](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-IDLE-IN-TRANSACTION-SESSION-TIMEOUT)


---
title: Set Appropriate Connection Limits
impact: CRITICAL
impactDescription: Prevent database crashes and memory exhaustion
tags: connections, max-connections, limits, stability
---

## Set Appropriate Connection Limits

Too many connections exhaust memory and degrade performance. Set limits based on available resources.

**Incorrect (unlimited or excessive connections):**

\`\`\`sql
-- Default max_connections = 100, but often increased blindly
show max_connections;  -- 500 (way too high for 4GB RAM)

-- Each connection uses 1-3MB RAM
-- 500 connections * 2MB = 1GB just for connections!
-- Out of memory errors under load
\`\`\`

**Correct (calculate based on resources):**

\`\`\`sql
-- Formula: max_connections = (RAM in MB / 5MB per connection) - reserved
-- For 4GB RAM: (4096 / 5) - 10 = ~800 theoretical max
-- But practically, 100-200 is better for query performance

-- Recommended settings for 4GB RAM
alter system set max_connections = 100;

-- Also set work_mem appropriately
-- work_mem * max_connections should not exceed 25% of RAM
alter system set work_mem = '8MB';  -- 8MB * 100 = 800MB max
\`\`\`

Monitor connection usage:

\`\`\`sql
select count(*), state from pg_stat_activity group by state;
\`\`\`

Reference: [Database Connections](https://supabase.com/docs/guides/platform/performance#connection-management)



---
title: Use Connection Pooling for All Applications
impact: CRITICAL
impactDescription: Handle 10-100x more concurrent users
tags: connection-pooling, pgbouncer, performance, scalability
---

## Use Connection Pooling for All Applications

Postgres connections are expensive (1-3MB RAM each). Without pooling, applications exhaust connections under load.

**Incorrect (new connection per request):**

\`\`\`sql
-- Each request creates a new connection
-- Application code: db.connect() per request
-- Result: 500 concurrent users = 500 connections = crashed database

-- Check current connections
select count(*) from pg_stat_activity;  -- 487 connections!
\`\`\`

**Correct (connection pooling):**

\`\`\`sql
-- Use a pooler like PgBouncer between app and database
-- Application connects to pooler, pooler reuses a small pool to Postgres

-- Configure pool_size based on: (CPU cores * 2) + spindle_count
-- Example for 4 cores: pool_size = 10

-- Result: 500 concurrent users share 10 actual connections
select count(*) from pg_stat_activity;  -- 10 connections
\`\`\`

Pool modes:

- **Transaction mode**: connection returned after each transaction (best for most apps)
- **Session mode**: connection held for entire session (needed for prepared statements, temp tables)

Reference: [Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

---
title: Use Prepared Statements Correctly with Pooling
impact: HIGH
impactDescription: Avoid prepared statement conflicts in pooled environments
tags: prepared-statements, connection-pooling, transaction-mode
---

## Use Prepared Statements Correctly with Pooling

Prepared statements are tied to individual database connections. In transaction-mode pooling, connections are shared, causing conflicts.

**Incorrect (named prepared statements with transaction pooling):**

\`\`\`sql
-- Named prepared statement
prepare get_user as select * from users where id = $1;

-- In transaction mode pooling, next request may get different connection
execute get_user(123);
-- ERROR: prepared statement "get_user" does not exist
\`\`\`

**Correct (use unnamed statements or session mode):**

\`\`\`sql
-- Option 1: Use unnamed prepared statements (most ORMs do this automatically)
-- The query is prepared and executed in a single protocol message

-- Option 2: Deallocate after use in transaction mode
prepare get_user as select * from users where id = $1;
execute get_user(123);
deallocate get_user;

-- Option 3: Use session mode pooling (port 5432 vs 6543)
-- Connection is held for entire session, prepared statements persist
\`\`\`

Check your driver settings:

\`\`\`sql
-- Many drivers use prepared statements by default
-- Node.js pg: { prepare: false } to disable
-- JDBC: prepareThreshold=0 to disable
\`\`\`

Reference: [Prepared Statements with Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pool-modes)



---
title: Batch INSERT Statements for Bulk Data
impact: MEDIUM
impactDescription: 10-50x faster bulk inserts
tags: batch, insert, bulk, performance, copy
---

## Batch INSERT Statements for Bulk Data

Individual INSERT statements have high overhead. Batch multiple rows in single statements or use COPY.

**Incorrect (individual inserts):**

\`\`\`sql
-- Each insert is a separate transaction and round trip
insert into events (user_id, action) values (1, 'click');
insert into events (user_id, action) values (1, 'view');
insert into events (user_id, action) values (2, 'click');
-- ... 1000 more individual inserts

-- 1000 inserts = 1000 round trips = slow
\`\`\`

**Correct (batch insert):**

\`\`\`sql
-- Multiple rows in single statement
insert into events (user_id, action) values
  (1, 'click'),
  (1, 'view'),
  (2, 'click'),
  -- ... up to ~1000 rows per batch
  (999, 'view');

-- One round trip for 1000 rows
\`\`\`

For large imports, use COPY:

\`\`\`sql
-- COPY is fastest for bulk loading
copy events (user_id, action, created_at)
from '/path/to/data.csv'
with (format csv, header true);

-- Or from stdin in application
copy events (user_id, action) from stdin with (format csv);
1,click
1,view
2,click
\\.
\`\`\`

Reference: [COPY](https://www.postgresql.org/docs/current/sql-copy.html)



---
title: Eliminate N+1 Queries with Batch Loading
impact: MEDIUM-HIGH
impactDescription: 10-100x fewer database round trips
tags: n-plus-one, batch, performance, queries
---

## Eliminate N+1 Queries with Batch Loading

N+1 queries execute one query per item in a loop. Batch them into a single query using arrays or JOINs.

**Incorrect (N+1 queries):**

\`\`\`sql
-- First query: get all users
select id from users where active = true;  -- Returns 100 IDs

-- Then N queries, one per user
select * from orders where user_id = 1;
select * from orders where user_id = 2;
select * from orders where user_id = 3;
-- ... 97 more queries!

-- Total: 101 round trips to database
\`\`\`

**Correct (single batch query):**

\`\`\`sql
-- Collect IDs and query once with ANY
select * from orders where user_id = any(array[1, 2, 3, ...]);

-- Or use JOIN instead of loop
select u.id, u.name, o.*
from users u
left join orders o on o.user_id = u.id
where u.active = true;

-- Total: 1 round trip
\`\`\`

Application pattern:

\`\`\`sql
-- Instead of looping in application code:
-- for user in users: db.query("SELECT * FROM orders WHERE user_id = $1", user.id)

-- Pass array parameter:
select * from orders where user_id = any($1::bigint[]);
-- Application passes: [1, 2, 3, 4, 5, ...]
\`\`\`

Reference: [N+1 Query Problem](https://supabase.com/docs/guides/database/query-optimization)
---

---
title: Use Cursor-Based Pagination Instead of OFFSET
impact: MEDIUM-HIGH
impactDescription: Consistent O(1) performance regardless of page depth
tags: pagination, cursor, keyset, offset, performance
---

## Use Cursor-Based Pagination Instead of OFFSET

OFFSET-based pagination scans all skipped rows, getting slower on deeper pages. Cursor pagination is O(1).

**Incorrect (OFFSET pagination):**

\`\`\`sql
-- Page 1: scans 20 rows
select * from products order by id limit 20 offset 0;

-- Page 100: scans 2000 rows to skip 1980
select * from products order by id limit 20 offset 1980;

-- Page 10000: scans 200,000 rows!
select * from products order by id limit 20 offset 199980;
\`\`\`

**Correct (cursor/keyset pagination):**

\`\`\`sql
-- Page 1: get first 20
select * from products order by id limit 20;
-- Application stores last_id = 20

-- Page 2: start after last ID
select * from products where id > 20 order by id limit 20;
-- Uses index, always fast regardless of page depth

-- Page 10000: same speed as page 1
select * from products where id > 199980 order by id limit 20;
\`\`\`

For multi-column sorting:

\`\`\`sql
-- Cursor must include all sort columns
select * from products
where (created_at, id) > ('2024-01-15 10:00:00', 12345)
order by created_at, id
limit 20;
\`\`\`

Reference: [Pagination](https://supabase.com/docs/guides/database/pagination)



---
title: Use UPSERT for Insert-or-Update Operations
impact: MEDIUM
impactDescription: Atomic operation, eliminates race conditions
tags: upsert, on-conflict, insert, update
---

## Use UPSERT for Insert-or-Update Operations

Using separate SELECT-then-INSERT/UPDATE creates race conditions. Use INSERT ... ON CONFLICT for atomic upserts.

**Incorrect (check-then-insert race condition):**

\`\`\`sql
-- Race condition: two requests check simultaneously
select * from settings where user_id = 123 and key = 'theme';
-- Both find nothing

-- Both try to insert
insert into settings (user_id, key, value) values (123, 'theme', 'dark');
-- One succeeds, one fails with duplicate key error!
\`\`\`

**Correct (atomic UPSERT):**

\`\`\`sql
-- Single atomic operation
insert into settings (user_id, key, value)
values (123, 'theme', 'dark')
on conflict (user_id, key)
do update set value = excluded.value, updated_at = now();

-- Returns the inserted/updated row
insert into settings (user_id, key, value)
values (123, 'theme', 'dark')
on conflict (user_id, key)
do update set value = excluded.value
returning *;
\`\`\`

Insert-or-ignore pattern:

\`\`\`sql
-- Insert only if not exists (no update)
insert into page_views (page_id, user_id)
values (1, 123)
on conflict (page_id, user_id) do nothing;
\`\`\`

Reference: [INSERT ON CONFLICT](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT)



---
title: Use Advisory Locks for Application-Level Locking
impact: MEDIUM
impactDescription: Efficient coordination without row-level lock overhead
tags: advisory-locks, coordination, application-locks
---

## Use Advisory Locks for Application-Level Locking

Advisory locks provide application-level coordination without requiring database rows to lock.

**Incorrect (creating rows just for locking):**

\`\`\`sql
-- Creating dummy rows to lock on
create table resource_locks (
  resource_name text primary key
);

insert into resource_locks values ('report_generator');

-- Lock by selecting the row
select * from resource_locks where resource_name = 'report_generator' for update;
\`\`\`

**Correct (advisory locks):**

\`\`\`sql
-- Session-level advisory lock (released on disconnect or unlock)
select pg_advisory_lock(hashtext('report_generator'));
-- ... do exclusive work ...
select pg_advisory_unlock(hashtext('report_generator'));

-- Transaction-level lock (released on commit/rollback)
begin;
select pg_advisory_xact_lock(hashtext('daily_report'));
-- ... do work ...
commit;  -- Lock automatically released
\`\`\`

Try-lock for non-blocking operations:

\`\`\`sql
-- Returns immediately with true/false instead of waiting
select pg_try_advisory_lock(hashtext('resource_name'));

-- Use in application
if (acquired) {
  -- Do work
  select pg_advisory_unlock(hashtext('resource_name'));
} else {
  -- Skip or retry later
}
\`\`\`

Reference: [Advisory Locks](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS)



---
title: Prevent Deadlocks with Consistent Lock Ordering
impact: MEDIUM-HIGH
impactDescription: Eliminate deadlock errors, improve reliability
tags: deadlocks, locking, transactions, ordering
---

## Prevent Deadlocks with Consistent Lock Ordering

Deadlocks occur when transactions lock resources in different orders. Always
acquire locks in a consistent order.

**Incorrect (inconsistent lock ordering):**

\`\`\`sql
-- Transaction A                    -- Transaction B
begin;                              begin;
update accounts                     update accounts
set balance = balance - 100         set balance = balance - 50
where id = 1;                       where id = 2;  -- B locks row 2

update accounts                     update accounts
set balance = balance + 100         set balance = balance + 50
where id = 2;  -- A waits for B     where id = 1;  -- B waits for A

-- DEADLOCK! Both waiting for each other
\`\`\`

**Correct (lock rows in consistent order first):**

\`\`\`sql
-- Explicitly acquire locks in ID order before updating
begin;
select * from accounts where id in (1, 2) order by id for update;

-- Now perform updates in any order - locks already held
update accounts set balance = balance - 100 where id = 1;
update accounts set balance = balance + 100 where id = 2;
commit;
\`\`\`

Alternative: use a single statement to update atomically:

\`\`\`sql
-- Single statement acquires all locks atomically
begin;
update accounts
set balance = balance + case id
  when 1 then -100
  when 2 then 100
end
where id in (1, 2);
commit;
\`\`\`

Detect deadlocks in logs:

\`\`\`sql
-- Check for recent deadlocks
select * from pg_stat_database where deadlocks > 0;

-- Enable deadlock logging
set log_lock_waits = on;
set deadlock_timeout = '1s';
\`\`\`

Reference:
[Deadlocks](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-DEADLOCKS)



---
title: Keep Transactions Short to Reduce Lock Contention
impact: MEDIUM-HIGH
impactDescription: 3-5x throughput improvement, fewer deadlocks
tags: transactions, locking, contention, performance
---

## Keep Transactions Short to Reduce Lock Contention

Long-running transactions hold locks that block other queries. Keep transactions as short as possible.

**Incorrect (long transaction with external calls):**

\`\`\`sql
begin;
select * from orders where id = 1 for update;  -- Lock acquired

-- Application makes HTTP call to payment API (2-5 seconds)
-- Other queries on this row are blocked!

update orders set status = 'paid' where id = 1;
commit;  -- Lock held for entire duration
\`\`\`

**Correct (minimal transaction scope):**

\`\`\`sql
-- Validate data and call APIs outside transaction
-- Application: response = await paymentAPI.charge(...)

-- Only hold lock for the actual update
begin;
update orders
set status = 'paid', payment_id = $1
where id = $2 and status = 'pending'
returning *;
commit;  -- Lock held for milliseconds
\`\`\`

Use \`statement_timeout\` to prevent runaway transactions:

\`\`\`sql
-- Abort queries running longer than 30 seconds
set statement_timeout = '30s';

-- Or per-session
set local statement_timeout = '5s';
\`\`\`

Reference: [Transaction Management](https://www.postgresql.org/docs/current/tutorial-transactions.html)



---
title: Use SKIP LOCKED for Non-Blocking Queue Processing
impact: MEDIUM-HIGH
impactDescription: 10x throughput for worker queues
tags: skip-locked, queue, workers, concurrency
---

## Use SKIP LOCKED for Non-Blocking Queue Processing

When multiple workers process a queue, SKIP LOCKED allows workers to process different rows without waiting.

**Incorrect (workers block each other):**

\`\`\`sql
-- Worker 1 and Worker 2 both try to get next job
begin;
select * from jobs where status = 'pending' order by created_at limit 1 for update;
-- Worker 2 waits for Worker 1's lock to release!
\`\`\`

**Correct (SKIP LOCKED for parallel processing):**

\`\`\`sql
-- Each worker skips locked rows and gets the next available
begin;
select * from jobs
where status = 'pending'
order by created_at
limit 1
for update skip locked;

-- Worker 1 gets job 1, Worker 2 gets job 2 (no waiting)

update jobs set status = 'processing' where id = $1;
commit;
\`\`\`

Complete queue pattern:

\`\`\`sql
-- Atomic claim-and-update in one statement
update jobs
set status = 'processing', worker_id = $1, started_at = now()
where id = (
  select id from jobs
  where status = 'pending'
  order by created_at
  limit 1
  for update skip locked
)
returning *;
\`\`\`

Reference: [SELECT FOR UPDATE SKIP LOCKED](https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE)
---
title: Use EXPLAIN ANALYZE to Diagnose Slow Queries
impact: LOW-MEDIUM
impactDescription: Identify exact bottlenecks in query execution
tags: explain, analyze, diagnostics, query-plan
---

## Use EXPLAIN ANALYZE to Diagnose Slow Queries

EXPLAIN ANALYZE executes the query and shows actual timings, revealing the true performance bottlenecks.

**Incorrect (guessing at performance issues):**

\`\`\`sql
-- Query is slow, but why?
select * from orders where customer_id = 123 and status = 'pending';
-- "It must be missing an index" - but which one?
\`\`\`

**Correct (use EXPLAIN ANALYZE):**

\`\`\`sql
explain (analyze, buffers, format text)
select * from orders where customer_id = 123 and status = 'pending';

-- Output reveals the issue:
-- Seq Scan on orders (cost=0.00..25000.00 rows=50 width=100) (actual time=0.015..450.123 rows=50 loops=1)
--   Filter: ((customer_id = 123) AND (status = 'pending'::text))
--   Rows Removed by Filter: 999950
--   Buffers: shared hit=5000 read=15000
-- Planning Time: 0.150 ms
-- Execution Time: 450.500 ms
\`\`\`

Key things to look for:

\`\`\`sql
-- Seq Scan on large tables = missing index
-- Rows Removed by Filter = poor selectivity or missing index
-- Buffers: read >> hit = data not cached, needs more memory
-- Nested Loop with high loops = consider different join strategy
-- Sort Method: external merge = work_mem too low
\`\`\`

Reference: [EXPLAIN](https://supabase.com/docs/guides/database/inspect)



---
title: Enable pg_stat_statements for Query Analysis
impact: LOW-MEDIUM
impactDescription: Identify top resource-consuming queries
tags: pg-stat-statements, monitoring, statistics, performance
---

## Enable pg_stat_statements for Query Analysis

pg_stat_statements tracks execution statistics for all queries, helping identify slow and frequent queries.

**Incorrect (no visibility into query patterns):**

\`\`\`sql
-- Database is slow, but which queries are the problem?
-- No way to know without pg_stat_statements
\`\`\`

**Correct (enable and query pg_stat_statements):**

\`\`\`sql
-- Enable the extension
create extension if not exists pg_stat_statements;

-- Find slowest queries by total time
select
  calls,
  round(total_exec_time::numeric, 2) as total_time_ms,
  round(mean_exec_time::numeric, 2) as mean_time_ms,
  query
from pg_stat_statements
order by total_exec_time desc
limit 10;

-- Find most frequent queries
select calls, query
from pg_stat_statements
order by calls desc
limit 10;

-- Reset statistics after optimization
select pg_stat_statements_reset();
\`\`\`

Key metrics to monitor:

\`\`\`sql
-- Queries with high mean time (candidates for optimization)
select query, mean_exec_time, calls
from pg_stat_statements
where mean_exec_time > 100  -- > 100ms average
order by mean_exec_time desc;
\`\`\`

Reference: [pg_stat_statements](https://supabase.com/docs/guides/database/extensions/pg_stat_statements)



---
title: Maintain Table Statistics with VACUUM and ANALYZE
impact: MEDIUM
impactDescription: 2-10x better query plans with accurate statistics
tags: vacuum, analyze, statistics, maintenance, autovacuum
---

## Maintain Table Statistics with VACUUM and ANALYZE

Outdated statistics cause the query planner to make poor decisions. VACUUM reclaims space, ANALYZE updates statistics.

**Incorrect (stale statistics):**

\`\`\`sql
-- Table has 1M rows but stats say 1000
-- Query planner chooses wrong strategy
explain select * from orders where status = 'pending';
-- Shows: Seq Scan (because stats show small table)
-- Actually: Index Scan would be much faster
\`\`\`

**Correct (maintain fresh statistics):**

\`\`\`sql
-- Manually analyze after large data changes
analyze orders;

-- Analyze specific columns used in WHERE clauses
analyze orders (status, created_at);

-- Check when tables were last analyzed
select
  relname,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  last_autoanalyze
from pg_stat_user_tables
order by last_analyze nulls first;
\`\`\`

Autovacuum tuning for busy tables:

\`\`\`sql
-- Increase frequency for high-churn tables
alter table orders set (
  autovacuum_vacuum_scale_factor = 0.05,     -- Vacuum at 5% dead tuples (default 20%)
  autovacuum_analyze_scale_factor = 0.02     -- Analyze at 2% changes (default 10%)
);

-- Check autovacuum status
select * from pg_stat_progress_vacuum;
\`\`\`

Reference: [VACUUM](https://supabase.com/docs/guides/database/database-size#vacuum-operations)

---
title: Create Composite Indexes for Multi-Column Queries
impact: HIGH
impactDescription: 5-10x faster multi-column queries
tags: indexes, composite-index, multi-column, query-optimization
---

## Create Composite Indexes for Multi-Column Queries

When queries filter on multiple columns, a composite index is more efficient than separate single-column indexes.

**Incorrect (separate indexes require bitmap scan):**

\`\`\`sql
-- Two separate indexes
create index orders_status_idx on orders (status);
create index orders_created_idx on orders (created_at);

-- Query must combine both indexes (slower)
select * from orders where status = 'pending' and created_at > '2024-01-01';
\`\`\`

**Correct (composite index):**

\`\`\`sql
-- Single composite index (leftmost column first for equality checks)
create index orders_status_created_idx on orders (status, created_at);

-- Query uses one efficient index scan
select * from orders where status = 'pending' and created_at > '2024-01-01';
\`\`\`

**Column order matters** - place equality columns first, range columns last:

\`\`\`sql
-- Good: status (=) before created_at (>)
create index idx on orders (status, created_at);

-- Works for: WHERE status = 'pending'
-- Works for: WHERE status = 'pending' AND created_at > '2024-01-01'
-- Does NOT work for: WHERE created_at > '2024-01-01' (leftmost prefix rule)
\`\`\`

Reference: [Multicolumn Indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html)



---
title: Use Covering Indexes to Avoid Table Lookups
impact: MEDIUM-HIGH
impactDescription: 2-5x faster queries by eliminating heap fetches
tags: indexes, covering-index, include, index-only-scan
---

## Use Covering Indexes to Avoid Table Lookups

Covering indexes include all columns needed by a query, enabling index-only scans that skip the table entirely.

**Incorrect (index scan + heap fetch):**

\`\`\`sql
create index users_email_idx on users (email);

-- Must fetch name and created_at from table heap
select email, name, created_at from users where email = 'user@example.com';
\`\`\`

**Correct (index-only scan with INCLUDE):**

\`\`\`sql
-- Include non-searchable columns in the index
create index users_email_idx on users (email) include (name, created_at);

-- All columns served from index, no table access needed
select email, name, created_at from users where email = 'user@example.com';
\`\`\`

Use INCLUDE for columns you SELECT but don't filter on:

\`\`\`sql
-- Searching by status, but also need customer_id and total
create index orders_status_idx on orders (status) include (customer_id, total);

select status, customer_id, total from orders where status = 'shipped';
\`\`\`

Reference: [Index-Only Scans](https://www.postgresql.org/docs/current/indexes-index-only-scans.html)



---
title: Choose the Right Index Type for Your Data
impact: HIGH
impactDescription: 10-100x improvement with correct index type
tags: indexes, btree, gin, gist, brin, hash, index-types
---

## Choose the Right Index Type for Your Data

Different index types excel at different query patterns. The default B-tree isn't always optimal.

**Incorrect (B-tree for JSONB containment):**

\`\`\`sql
-- B-tree cannot optimize containment operators
create index products_attrs_idx on products (attributes);
select * from products where attributes @> '{"color": "red"}';
-- Full table scan - B-tree doesn't support @> operator
\`\`\`

**Correct (GIN for JSONB):**

\`\`\`sql
-- GIN supports @>, ?, ?&, ?| operators
create index products_attrs_idx on products using gin (attributes);
select * from products where attributes @> '{"color": "red"}';
\`\`\`

Index type guide:

\`\`\`sql
-- B-tree (default): =, <, >, BETWEEN, IN, IS NULL
create index users_created_idx on users (created_at);

-- GIN: arrays, JSONB, full-text search
create index posts_tags_idx on posts using gin (tags);

-- GiST: geometric data, range types, nearest-neighbor (KNN) queries
create index locations_idx on places using gist (location);

-- BRIN: large time-series tables (10-100x smaller)
create index events_time_idx on events using brin (created_at);

-- Hash: equality-only (slightly faster than B-tree for =)
create index sessions_token_idx on sessions using hash (token);
\`\`\`

Reference: [Index Types](https://www.postgresql.org/docs/current/indexes-types.html)



---
title: Add Indexes on WHERE and JOIN Columns
impact: CRITICAL
impactDescription: 100-1000x faster queries on large tables
tags: indexes, performance, sequential-scan, query-optimization
---

## Add Indexes on WHERE and JOIN Columns

Queries filtering or joining on unindexed columns cause full table scans, which become exponentially slower as tables grow.

**Incorrect (sequential scan on large table):**

\`\`\`sql
-- No index on customer_id causes full table scan
select * from orders where customer_id = 123;

-- EXPLAIN shows: Seq Scan on orders (cost=0.00..25000.00 rows=100 width=85)
\`\`\`

**Correct (index scan):**

\`\`\`sql
-- Create index on frequently filtered column
create index orders_customer_id_idx on orders (customer_id);

select * from orders where customer_id = 123;

-- EXPLAIN shows: Index Scan using orders_customer_id_idx (cost=0.42..8.44 rows=100 width=85)
\`\`\`

For JOIN columns, always index the foreign key side:

\`\`\`sql
-- Index the referencing column
create index orders_customer_id_idx on orders (customer_id);

select c.name, o.total
from customers c
join orders o on o.customer_id = c.id;
\`\`\`

Reference: [Query Optimization](https://supabase.com/docs/guides/database/query-optimization)

---
title: Use Partial Indexes for Filtered Queries
impact: HIGH
impactDescription: 5-20x smaller indexes, faster writes and queries
tags: indexes, partial-index, query-optimization, storage
---

## Use Partial Indexes for Filtered Queries

Partial indexes only include rows matching a WHERE condition, making them smaller and faster when queries consistently filter on the same condition.

**Incorrect (full index includes irrelevant rows):**

\`\`\`sql
-- Index includes all rows, even soft-deleted ones
create index users_email_idx on users (email);

-- Query always filters active users
select * from users where email = 'user@example.com' and deleted_at is null;
\`\`\`

**Correct (partial index matches query filter):**

\`\`\`sql
-- Index only includes active users
create index users_active_email_idx on users (email)
where deleted_at is null;

-- Query uses the smaller, faster index
select * from users where email = 'user@example.com' and deleted_at is null;
\`\`\`

Common use cases for partial indexes:

\`\`\`sql
-- Only pending orders (status rarely changes once completed)
create index orders_pending_idx on orders (created_at)
where status = 'pending';

-- Only non-null values
create index products_sku_idx on products (sku)
where sku is not null;
\`\`\`

Reference: [Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html)



---
title: Add Constraints Safely in Migrations
impact: HIGH
impactDescription: Prevents migration failures and enables idempotent schema changes
tags: constraints, migrations, schema, alter-table
---

## Add Constraints Safely in Migrations

PostgreSQL does not support \`ADD CONSTRAINT IF NOT EXISTS\`. Migrations using this syntax will fail.

**Incorrect (causes syntax error):**

\`\`\`sql
-- ERROR: syntax error at or near "not" (SQLSTATE 42601)
alter table public.profiles
add constraint if not exists profiles_birthchart_id_unique unique (birthchart_id);
\`\`\`

**Correct (idempotent constraint creation):**

\`\`\`sql
-- Use DO block to check before adding
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_birthchart_id_unique'
    and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
    add constraint profiles_birthchart_id_unique unique (birthchart_id);
  end if;
end $$;
\`\`\`

For all constraint types:

\`\`\`sql
-- Check constraints
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'check_age_positive'
  ) then
    alter table users add constraint check_age_positive check (age > 0);
  end if;
end $$;

-- Foreign keys
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_birthchart_id_fkey'
  ) then
    alter table profiles
    add constraint profiles_birthchart_id_fkey
    foreign key (birthchart_id) references birthcharts(id);
  end if;
end $$;
\`\`\`

Check if constraint exists:

\`\`\`sql
-- Query to check constraint existence
select conname, contype, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.profiles'::regclass;

-- contype values:
-- 'p' = PRIMARY KEY
-- 'f' = FOREIGN KEY
-- 'u' = UNIQUE
-- 'c' = CHECK
\`\`\`

Reference: [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)


---
title: Choose Appropriate Data Types
impact: HIGH
impactDescription: 50% storage reduction, faster comparisons
tags: data-types, schema, storage, performance
---

## Choose Appropriate Data Types

Using the right data types reduces storage, improves query performance, and prevents bugs.

**Incorrect (wrong data types):**

\`\`\`sql
create table users (
  id int,                    -- Will overflow at 2.1 billion
  email varchar(255),        -- Unnecessary length limit
  created_at timestamp,      -- Missing timezone info
  is_active varchar(5),      -- String for boolean
  price varchar(20)          -- String for numeric
);
\`\`\`

**Correct (appropriate data types):**

\`\`\`sql
create table users (
  id bigint generated always as identity primary key,  -- 9 quintillion max
  email text,                     -- No artificial limit, same performance as varchar
  created_at timestamptz,         -- Always store timezone-aware timestamps
  is_active boolean default true, -- 1 byte vs variable string length
  price numeric(10,2)             -- Exact decimal arithmetic
);
\`\`\`

Key guidelines:

\`\`\`sql
-- IDs: use bigint, not int (future-proofing)
-- Strings: use text, not varchar(n) unless constraint needed
-- Time: use timestamptz, not timestamp
-- Money: use numeric, not float (precision matters)
-- Enums: use text with check constraint or create enum type
\`\`\`

Reference: [Data Types](https://www.postgresql.org/docs/current/datatype.html)



---
title: Index Foreign Key Columns
impact: HIGH
impactDescription: 10-100x faster JOINs and CASCADE operations
tags: foreign-key, indexes, joins, schema
---

## Index Foreign Key Columns

Postgres does not automatically index foreign key columns. Missing indexes cause slow JOINs and CASCADE operations.

**Incorrect (unindexed foreign key):**

\`\`\`sql
create table orders (
  id bigint generated always as identity primary key,
  customer_id bigint references customers(id) on delete cascade,
  total numeric(10,2)
);

-- No index on customer_id!
-- JOINs and ON DELETE CASCADE both require full table scan
select * from orders where customer_id = 123;  -- Seq Scan
delete from customers where id = 123;          -- Locks table, scans all orders
\`\`\`

**Correct (indexed foreign key):**

\`\`\`sql
create table orders (
  id bigint generated always as identity primary key,
  customer_id bigint references customers(id) on delete cascade,
  total numeric(10,2)
);

-- Always index the FK column
create index orders_customer_id_idx on orders (customer_id);

-- Now JOINs and cascades are fast
select * from orders where customer_id = 123;  -- Index Scan
delete from customers where id = 123;          -- Uses index, fast cascade
\`\`\`

Find missing FK indexes:

\`\`\`sql
select
  conrelid::regclass as table_name,
  a.attname as fk_column
from pg_constraint c
join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any(c.conkey)
where c.contype = 'f'
  and not exists (
    select 1 from pg_index i
    where i.indrelid = c.conrelid and a.attnum = any(i.indkey)
  );
\`\`\`

Reference: [Foreign Keys](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)



---
title: Use Lowercase Identifiers for Compatibility
impact: MEDIUM
impactDescription: Avoid case-sensitivity bugs with tools, ORMs, and AI assistants
tags: naming, identifiers, case-sensitivity, schema, conventions
---

## Use Lowercase Identifiers for Compatibility

PostgreSQL folds unquoted identifiers to lowercase. Quoted mixed-case identifiers require quotes forever and cause issues with tools, ORMs, and AI assistants that may not recognize them.

**Incorrect (mixed-case identifiers):**

\`\`\`sql
-- Quoted identifiers preserve case but require quotes everywhere
CREATE TABLE "Users" (
  "userId" bigint PRIMARY KEY,
  "firstName" text,
  "lastName" text
);

-- Must always quote or queries fail
SELECT "firstName" FROM "Users" WHERE "userId" = 1;

-- This fails - Users becomes users without quotes
SELECT firstName FROM Users;
-- ERROR: relation "users" does not exist
\`\`\`

**Correct (lowercase snake_case):**

\`\`\`sql
-- Unquoted lowercase identifiers are portable and tool-friendly
CREATE TABLE users (
  user_id bigint PRIMARY KEY,
  first_name text,
  last_name text
);

-- Works without quotes, recognized by all tools
SELECT first_name FROM users WHERE user_id = 1;
\`\`\`

Common sources of mixed-case identifiers:

\`\`\`sql
-- ORMs often generate quoted camelCase - configure them to use snake_case
-- Migrations from other databases may preserve original casing
-- Some GUI tools quote identifiers by default - disable this

-- If stuck with mixed-case, create views as a compatibility layer
CREATE VIEW users AS SELECT "userId" AS user_id, "firstName" AS first_name FROM "Users";
\`\`\`

Reference: [Identifiers and Key Words](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS)



---
title: Select Optimal Primary Key Strategy
impact: HIGH
impactDescription: Better index locality, reduced fragmentation
tags: primary-key, identity, uuid, serial, schema
---

## Select Optimal Primary Key Strategy

Primary key choice affects insert performance, index size, and replication
efficiency.

**Incorrect (problematic PK choices):**

\`\`\`sql
-- identity is the SQL-standard approach
create table users (
  id serial primary key  -- Works, but IDENTITY is recommended
);

-- Random UUIDs (v4) cause index fragmentation
create table orders (
  id uuid default gen_random_uuid() primary key  -- UUIDv4 = random = scattered inserts
);
\`\`\`

**Correct (optimal PK strategies):**

\`\`\`sql
-- Use IDENTITY for sequential IDs (SQL-standard, best for most cases)
create table users (
  id bigint generated always as identity primary key
);

-- For distributed systems needing UUIDs, use UUIDv7 (time-ordered)
-- Requires pg_uuidv7 extension: create extension pg_uuidv7;
create table orders (
  id uuid default uuid_generate_v7() primary key  -- Time-ordered, no fragmentation
);

-- Alternative: time-prefixed IDs for sortable, distributed IDs (no extension needed)
create table events (
  id text default concat(
    to_char(now() at time zone 'utc', 'YYYYMMDDHH24MISSMS'),
    gen_random_uuid()::text
  ) primary key
);
\`\`\`

Guidelines:

- Single database: \`bigint identity\` (sequential, 8 bytes, SQL-standard)
- Distributed/exposed IDs: UUIDv7 (requires pg_uuidv7) or ULID (time-ordered, no
  fragmentation)
- \`serial\` works but \`identity\` is SQL-standard and preferred for new
  applications
- Avoid random UUIDs (v4) as primary keys on large tables (causes index
  fragmentation)

Reference:
[Identity Columns](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-PARMS-GENERATED-IDENTITY)



---
title: Apply Principle of Least Privilege
impact: MEDIUM
impactDescription: Reduced attack surface, better audit trail
tags: privileges, security, roles, permissions
---

## Apply Principle of Least Privilege

Grant only the minimum permissions required. Never use superuser for application queries.

**Incorrect (overly broad permissions):**

\`\`\`sql
-- Application uses superuser connection
-- Or grants ALL to application role
grant all privileges on all tables in schema public to app_user;
grant all privileges on all sequences in schema public to app_user;

-- Any SQL injection becomes catastrophic
-- drop table users; cascades to everything
\`\`\`

**Correct (minimal, specific grants):**

\`\`\`sql
-- Create role with no default privileges
create role app_readonly nologin;

-- Grant only SELECT on specific tables
grant usage on schema public to app_readonly;
grant select on public.products, public.categories to app_readonly;

-- Create role for writes with limited scope
create role app_writer nologin;
grant usage on schema public to app_writer;
grant select, insert, update on public.orders to app_writer;
grant usage on sequence orders_id_seq to app_writer;
-- No DELETE permission

-- Login role inherits from these
create role app_user login password 'xxx';
grant app_writer to app_user;
\`\`\`

Revoke public defaults:

\`\`\`sql
-- Revoke default public access
revoke all on schema public from public;
revoke all on all tables in schema public from public;
\`\`\`

Reference: [Roles and Privileges](https://supabase.com/blog/postgres-roles-and-privileges)



---
title: Enable Row Level Security for Multi-Tenant Data
impact: CRITICAL
impactDescription: Database-enforced tenant isolation, prevent data leaks
tags: rls, row-level-security, multi-tenant, security
---

## Enable Row Level Security for Multi-Tenant Data

Row Level Security (RLS) enforces data access at the database level, ensuring users only see their own data.

**Incorrect (application-level filtering only):**

\`\`\`sql
-- Relying only on application to filter
select * from orders where user_id = $current_user_id;

-- Bug or bypass means all data is exposed!
select * from orders;  -- Returns ALL orders
\`\`\`

**Correct (database-enforced RLS):**

\`\`\`sql
-- Enable RLS on the table
alter table orders enable row level security;

-- Create policy for users to see only their orders
create policy orders_user_policy on orders
  for all
  using (user_id = current_setting('app.current_user_id')::bigint);

-- Force RLS even for table owners
alter table orders force row level security;

-- Set user context and query
set app.current_user_id = '123';
select * from orders;  -- Only returns orders for user 123
\`\`\`

Policy for authenticated role:

\`\`\`sql
create policy orders_user_policy on orders
  for all
  to authenticated
  using (user_id = auth.uid());
\`\`\`

Reference: [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)



---
title: Optimize RLS Policies for Performance
impact: HIGH
impactDescription: 5-10x faster RLS queries with proper patterns
tags: rls, performance, security, optimization
---

## Optimize RLS Policies for Performance

Poorly written RLS policies can cause severe performance issues. Use subqueries and indexes strategically.

**Incorrect (function called for every row):**

\`\`\`sql
create policy orders_policy on orders
  using (auth.uid() = user_id);  -- auth.uid() called per row!

-- With 1M rows, auth.uid() is called 1M times
\`\`\`

**Correct (wrap functions in SELECT):**

\`\`\`sql
create policy orders_policy on orders
  using ((select auth.uid()) = user_id);  -- Called once, cached

-- 100x+ faster on large tables
\`\`\`

Use security definer functions for complex checks:

\`\`\`sql
-- Create helper function (runs as definer, bypasses RLS)
create or replace function is_team_member(team_id bigint)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.team_members
    where team_id = $1 and user_id = (select auth.uid())
  );
$$;

-- Use in policy (indexed lookup, not per-row check)
create policy team_orders_policy on orders
  using ((select is_team_member(team_id)));
\`\`\`

Always add indexes on columns used in RLS policies:

\`\`\`sql
create index orders_user_id_idx on orders (user_id);
\`\`\`

Reference: [RLS Performance](https://supabase.com/docs/guides/database/postgres/row-level-security#rls-performance-recommendations)
`;

export default function Mcp() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Best Practices</h1>
        <div className="prose prose-invert prose-headings:font-display prose-a:text-blue-400 hover:prose-a:text-blue-300 text-left markdown-body">
          <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
        </div>
      </div>
    </PageWrapper>
  );
}

