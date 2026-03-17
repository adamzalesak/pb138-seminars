# PB138 – Seminar 05: Databases & Drizzle

A TypeScript monorepo with an **Elysia** REST API connected to **PostgreSQL** via **Drizzle ORM**.

## Prerequisites

- **Bun** — install from https://bun.sh
- **Docker** — for running PostgreSQL

## Getting started

```bash
# 1. Install dependencies
bun i

# 2. Start PostgreSQL
docker compose up -d

# 3. Copy environment variables
cp apps/server/.env.example apps/server/.env

# 4. Apply database migrations
bun run db:generate && bun run db:migrate

# 5. Start the server in watch mode
bun run dev
```

| URL | What |
|---|---|
| http://localhost:3000 | REST API |
| http://localhost:3000/api-docs | Scalar API docs — explore and test all endpoints |
| https://local.drizzle.studio | Drizzle Studio — browse your database |

## Scripts

Run from the repo root:

| Command | Description |
|---|---|
| `bun install` | Install all workspace dependencies |
| `bun run dev` | Start the server in watch mode |
| `bun run build` | Build for production |

Database scripts (run from `apps/server/`):

| Command | Description |
|---|---|
| `bun run db:generate` | Generate a migration from schema changes |
| `bun run db:migrate` | Apply pending migrations |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run db:seed` | Seed the database with test data |

## Project structure

```
docker-compose.yml          PostgreSQL service
apps/
  server/
    drizzle.config.ts       Drizzle Kit configuration
    drizzle/                Generated SQL migrations
    src/
      db/
        schema.ts           Drizzle table definitions (source of truth)
        index.ts            Database connection
        seed.ts             Seed script (Faker.js)
      modules/
        students/           Students module (TODO)
        courses/            Courses module (TODO)
        instructors/        Instructors module (reference implementation)
        enrollments/        Enrollments module (TODO — transaction)
```

### Backend layers

Each module follows the same architecture:

| Layer | File | Responsibility |
|---|---|---|
| **Types** | `*.types.ts` | Plain TypeScript interfaces |
| **Schema** | `*.schema.ts` | Zod schemas for validation and OpenAPI |
| **Repository** | `*.repository.ts` | Data access via Drizzle — receives `db` (db instance or tx) as first argument |
| **Service** | `*.service.ts` | Business logic, transactions, imports `db` |
| **Routes** | `*.routes.ts` | HTTP handlers via Elysia |

Request flow: **HTTP request → Routes → Service → Repository → Database**

The **instructors** module is fully implemented — use it as a reference for all tasks.

---

## Tasks

### Task 1 — Complete the Schema

**File:** `apps/server/src/db/schema.ts`

Students and instructors tables are defined. Complete the remaining two:

- **`courses`** — code, name, description, credits, instructorId (FK → instructors), semester, year, capacity
- **`enrollments`** — studentId (FK → students), courseId (FK → courses), enrolledAt, unique constraint on (studentId, courseId)

Then regenerate and apply migrations:

```bash
bun run db:generate
bun run db:migrate
```

**Verify:** Open Drizzle Studio (`bun run db:studio`) — all 4 tables should appear.

### Task 2 — Students Repository

**File:** `apps/server/src/modules/students/students.repository.ts`

Replace the stubs with Drizzle queries. Use **instructors.repository.ts** as a reference. Each method receives `db` (the database or transaction instance) as the first argument — use it instead of importing `db` directly:

| Method | Hint |
|---|---|
| `findAll(db)` | `db.select().from(...)` |
| `findById(db, id)` | `.where(eq(...))`, return first or undefined |
| `create(db, data)` | `.insert(...).values(data).returning()` |

**Verify:** Scalar → `POST /students` to create, then `GET /students`

### Task 3 — Courses Repository

**File:** `apps/server/src/modules/courses/courses.repository.ts`

The `findAll` query (LEFT JOIN + count for enrolled students) is already provided. Complete the remaining parts:

| What | Hint |
|---|---|
| `findAll` — filter conditions | Build a `conditions` array from the `filter` object using `eq`, `gte`, `lte`, then pass to `.where(and(...conditions))` |
| `findById(db, id)` | Same join pattern as `findAll`, but with a `.where(eq(..., id))` filter. Return `undefined` if not found. |
| `create(db, data)` | `.insert(...).values(data).returning()` — a new course always has `enrolled: 0`. |

**Verify:** Scalar → `POST /courses` to create, then `GET /courses?semester=spring`

### Task 4 — Seed Script

**File:** `apps/server/src/db/seed.ts`

Instructors & students are already seeded. Complete the script — add courses and enrollments.

```bash
cd apps/server && bun run db:seed
```

**Verify:** Open Drizzle Studio — all tables should have data.

### Task 5 — Bulk Enrollment (Transaction)

**Files:** `enrollments.repository.ts` (data access) + `enrollments.service.ts` (transaction)

Implement bulk enrollment — enroll a student into multiple courses at once.

1. **Repository** — implement `createEnrollment(db, studentId, courseId)` to insert a single enrollment row.
2. **Service** — implement `bulkEnroll` using `db.transaction()`. Inside the callback, call `enrollmentsRepository.createEnrollment(tx, ...)` for each courseId. If any insert fails (e.g. duplicate or invalid FK), all are rolled back. Return the number of enrollments created.

**Verify:** `POST /students/:id/enroll` with `{ "courseIds": ["...", "..."] }`, then check Drizzle Studio.

### Task 6 — Course Transfer (Serializable Transaction)

**Files:** `enrollments.repository.ts` (data access) + `enrollments.service.ts` (transaction)

Implement `transferEnrollment` — transfer a student from one course to another **only if** the target course has available capacity.

This must use a **serializable** transaction (`isolationLevel: 'serializable'`) because it reads the current enrollment count, compares it against the course capacity, and then writes — a classic read-then-write pattern that is vulnerable to race conditions under lower isolation levels.

1. **Repository** — implement `deleteEnrollment(db, studentId, courseId)` and `countByCourse(db, courseId)`.
2. **Service** — implement `transferEnrollment` using `db.transaction(async (tx) => { ... }, { isolationLevel: 'serializable' })`. Inside the callback, use repository methods with `tx`:
   1. `coursesRepository.findById(tx, toCourseId)` — throw `'Target course not found'` if missing.
   2. `enrollmentsRepository.countByCourse(tx, toCourseId)` — throw `'Target course is full'` if count ≥ capacity.
   3. `enrollmentsRepository.deleteEnrollment(tx, studentId, fromCourseId)` — throw `'Student is not enrolled in the source course'` if nothing was deleted.
   4. `enrollmentsRepository.createEnrollment(tx, studentId, toCourseId)`.

**Verify:** `POST /students/:id/transfer` with `{ "fromCourseId": "...", "toCourseId": "..." }`, then check Drizzle Studio. Try transferring to a full course — it should fail with a 409 error.
