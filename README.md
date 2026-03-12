# PB138 – REST API Assignment

A full-stack TypeScript monorepo. The backend is an **Elysia** REST API with **Zod** validation and auto-generated **OpenAPI** docs; the frontend is a **React + Vite** app that consumes it via generated React Query hooks.

## Prerequisites

- **Bun** — install from https://bun.sh

## Getting started

```bash
# 1. Install dependencies
bun install

# 2. Start both apps in watch mode
bun run dev
```

| URL | What |
|---|---|
| http://localhost:3000 | REST API |
| http://localhost:3000/api-docs | Scalar API docs — explore and test all endpoints |
| http://localhost:5173 | React frontend |

## Scripts

Run from the repo root:

| Command | Description |
|---|---|
| `bun install` | Install all workspace dependencies |
| `bun run generate` | Generate OpenAPI spec (server) and TypeScript types + React Query hooks (web) |
| `bun run dev` | Start both apps in watch mode (runs `generate` automatically first) |
| `bun run build` | Build all packages for production |

To target a single package: `bun run --filter server dev`, `bun run --filter web dev`, etc.

## Project structure

```
apps/
  server/   Elysia REST API
  web/      React + Vite frontend
```

### Backend layers

Each module (`students`, `courses`, `instructors`) has the same file structure:

| Layer | File | Responsibility |
|---|---|---|
| **Types** | `*.types.ts` | Plain TypeScript interfaces — domain data shapes, no dependencies |
| **Schema** | `*.schema.ts` | Zod schemas for request validation and OpenAPI spec generation |
| **Repository** | `*.repository.ts` | Data access (in-memory array) |
| **Service** | `*.service.ts` | Business logic (filtering, transformations) |
| **Routes** | `*.routes.ts` | HTTP layer: route definitions + handlers via Elysia |

Request flow: **HTTP request → Routes → Service → Repository**

Dependencies flow one way:
- `types` ← `service`, `repository` (domain layer — no external deps)
- `schema` ← `routes` (API layer — depends on Zod)
- Services and repositories know nothing about Zod or HTTP.

### Code generation

`bun run generate` runs two steps (via Turbo):

1. **Server** — starts the Elysia app, fetches the OpenAPI spec from the `/api-docs/json` endpoint, and writes it to `apps/server/openapi.json`
2. **Web** — kubb reads `openapi.json` and produces `apps/web/src/generated/` (TypeScript types, axios clients, React Query hooks)

Both outputs are checked into git. Running `bun run dev` regenerates them once before starting the servers. If you change the API (routes, schemas), run `bun run generate` manually to update them.

---

## Student tasks

The **`students` module** is fully implemented and serves as a **reference**. Read through all its files before starting.

### Task 1 — Course filtering

**File:** `apps/server/src/modules/courses/courses.service.ts`

The `getAll` function receives a `filter` object but currently ignores it and returns all courses. Implement the four filters marked with `// TODO`:

| TODO | Filter | What to do |
|---|---|---|
| 1a | `filter.semester` | Keep only courses matching the given semester |
| 1b | `filter.tags` | Keep only courses that have **all** of the requested tags |
| 1c | `filter.minCredits` / `maxCredits` | Keep only courses within the credit range (inclusive) |
| 1d | `filter.instructorId` | Keep only courses taught by that instructor |

**Hint:** Each filter is a simple `if` + `Array.filter()`. Check the `students` module's repository for a similar pattern.

### Task 2 — Instructor creation

The `POST /instructors` endpoint exists but throws `Not implemented`. You need to edit two files:

**Step 2a — Validation** (`apps/server/src/modules/instructors/instructor.schema.ts`)

`CreateInstructorBodySchema` currently accepts any strings. Add validation constraints:
- `firstName`, `lastName` — non-empty, max 50 characters
- `email` — valid email format
- `department` — non-empty

Reference: `CreateStudentBodySchema` in `apps/server/src/modules/students/student.schema.ts`

**Step 2b — Service** (`apps/server/src/modules/instructors/instructors.service.ts`)

Implement the `create` function — pass the data to `instructorsRepository.create()` and return the result.

Reference: `create` in `apps/server/src/modules/students/students.service.ts`

### Task 3 — Frontend integration

The React frontend uses generated React Query hooks from the OpenAPI spec. `CoursesPage.tsx` is the **reference** — read it first.

**Task 3a — Student list** (`apps/web/src/pages/StudentsPage.tsx`)

Display all students by calling `useGetStudents()`. Handle loading/error states and render each student's name, email, and UCO.

Reference: `CoursesPage.tsx` — same pattern, different entity.

**Task 3b — Semester filter** (`apps/web/src/pages/CoursesPage.tsx`)

Add a semester filter to the courses page:
1. Add a `semester` state variable (`useState`)
2. Pass it to the hook: `useGetCourses({ semester: ... })`
3. Render a `Select` (from `@/components/ui/select`) above the course grid with options: All semesters / Spring / Fall

### Task 4 — Create student form

**File:** `apps/web/src/pages/StudentsPage.tsx`

Add a form below the student list that creates a new student via the API. This teaches you how to **send data** (not just read it) and keep the UI in sync.

1. Create state variables for `firstName`, `lastName`, `email`, and `uco` (`useState`)
2. Create a mutation using the generated `usePostStudents` hook with an `onSuccess` callback that invalidates the student list cache (`queryClient.invalidateQueries`) and resets the form fields
3. Build a `<form>` with four `Input` fields (from `@/components/ui/input`) and a submit `Button` (from `@/components/ui/button`)
4. On submit, call `mutation.mutate({ data: { firstName, lastName, email, uco } })`
5. Display `mutation.error` below the form when the server rejects the input (e.g. invalid UCO format)

All imports you need (`useQueryClient`, `usePostStudents`, `getStudentsQueryKey`) are already at the top of the file.

Reference: The TODO comment in `StudentsPage.tsx` contains a code skeleton for the mutation setup.

### Verifying your work

1. `bun run dev`
2. Open http://localhost:3000/api-docs
3. Test your backend endpoints in Scalar:
   - **Task 1:** Try `GET /courses` with different query parameters (`semester`, `tags`, `minCredits`, etc.)
   - **Task 2:** Try `POST /instructors` with both valid and invalid bodies — check that validation rejects bad input
4. Open http://localhost:5173
5. Test your frontend changes:
   - **Task 3a:** Student list should display below the courses
   - **Task 3b:** Semester dropdown should filter the course list
   - **Task 4:** Submit the form with valid data — the student should appear in the list. Submit with an invalid UCO (e.g. `abc`) — an error should appear
