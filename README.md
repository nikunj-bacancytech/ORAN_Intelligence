# ORAN Intelligence

Production-ready scaffold for a telecom network operations SaaS MVP.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres
- Vercel deployment target

## Structure

```text
app/            Routes, layouts, API handlers
components/     Shared UI primitives and layout components
features/       Feature modules by domain
lib/            Supabase, auth, config, and utilities
supabase/       Migrations, seed SQL, and demo datasets
types/          Shared domain and database types
```

## Getting Started

1. Install dependencies with `npm install`
2. Copy `.env.example` values into `.env.local`
3. Apply the SQL in `supabase/migrations/202603141430_initial_schema.sql`
4. Run the seed in `supabase/seed.sql`
5. Run `npm run dev`

## Database

The app now reads from Supabase database tables only. Local setup artifacts live in:

- `supabase/migrations/202603141430_initial_schema.sql`
- `supabase/seed.sql`

## Feature Areas

- dashboard
- sites
- base-stations
- alarms
- billing
- analytics
- settings
