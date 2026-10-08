# Al-Qalam Global Academy — Architecture Overview

## Design Principles
Al-Qalam Global Academy is architected as a production-ready, medium-scale Academy Management Platform designed for modular maintainability and cloud independence.

### Separation of Concerns (Layered Architecture)
The application strictly enforces isolation of concerns:

```
UI / React Server & Client Components
              ↓
      API Route Handlers
              ↓
     Zod Input Validation
              ↓
  Centralized Permission Checks
              ↓
       Service Layer
              ↓
      Repository Layer
              ↓
         Prisma ORM
              ↓
    Standard PostgreSQL Engine
```

1. **Zero Database Queries in UI**: Prisma and database access are strictly forbidden in UI components.
2. **Standard PostgreSQL Portability**: The database engine is completely decoupled from hosting vendors. The platform operates on standard PostgreSQL connection URLs (`DATABASE_URL`), allowing seamless migration between Supabase, AWS RDS, Azure PostgreSQL, Neon, DigitalOcean, or self-hosted Docker instances without altering a single line of business code.
3. **Application-Owned Authentication**: Custom Argon2id password hashing, HTTP-only secure cookies, and session management inside standard PostgreSQL tables.

---

## Role Permissions & Workflows

### 1. Admin Portal (`/admin`)
- Complete student onboarding and profile management
- Faculty teacher directory with Islamic qualifications
- Course curriculum & program catalog
- Live class scheduling with Zoom and Google Meet links
- Attendance logs and topic coverage tracking
- Official Certificate issuance with verification codes
- Audit logging of all critical administrative actions

### 2. Teacher Portal (`/teacher`)
- Daily class schedule and 1-click meeting launcher
- Live class feedback workflow:
  1. Conduct live session externally (Zoom / Google Meet)
  2. Mark student attendance (`PRESENT`, `ABSENT`, `LATE`)
  3. Record topic & Surah covered
  4. Post feedback note (visible to student & parent)
  5. Update syllabus progress metrics
- Homework assignment reviews & evaluation grading

### 3. Student Portal (`/student`)
- Next live class highlight banner with 1-click join
- Enrolled courses overview and real-time progress bars
- Teacher feedback notes timeline
- Class timetable and attendance records
- Homework submission and assessment marks review
- Verified Certificate viewer with print and download
