# Database Portability & Migration Guide

## Zero Supabase Dependency Principle
Al-Qalam Global Academy is designed to run against standard PostgreSQL. Supabase is merely one optional cloud hosting option.

### Moving Between PostgreSQL Providers
To migrate your database from Supabase to AWS RDS, Azure, Neon, or Self-Hosted Docker:

1. **Create New PostgreSQL Database Instance** (e.g., AWS RDS PostgreSQL 16).
2. **Update Environment Variable**:
   ```bash
   DATABASE_URL="postgresql://username:password@your-new-host:5432/alqalam_db?schema=public"
   ```
3. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate deploy
   ```
4. **Seed Development Data (Optional / Dev Only)**:
   ```bash
   npx tsx prisma/seed.ts
   ```
5. **Deploy Next.js Application**.
6. **Verify System Health**:
   - Authentication & Login
   - Cloudinary Asset Access
   - Brevo Transactional Email Delivery

### Rollback Strategy
- Schema migrations are tracked in standard SQL files under `prisma/migrations/`.
- In case of rollback, execute the down SQL script corresponding to the migration version or restore from PostgreSQL point-in-time recovery (PITR).
