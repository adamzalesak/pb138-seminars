// This page demonstrates how to use generated hooks from the OpenAPI spec.
//
// Kubb generates `useGetCourses` from the OpenAPI spec:
//   src/generated/hooks/useGetCourses.ts

import { useGetCourses } from '../generated/hooks/useGetCourses'
import type { Course } from '../generated/types/Course'

function CourseCard({ course }: { course: Course }) {
  const occupancy = Math.round((course.enrolled / course.capacity) * 100)

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
      <div className="flex items-baseline justify-between">
        <strong>{course.code} – {course.name}</strong>
        <span className="text-xs text-muted-foreground">{course.credits} credits</span>
      </div>

      <p className="m-0 text-sm text-muted-foreground">{course.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {course.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        {course.semester.charAt(0).toUpperCase() + course.semester.slice(1)} {course.year}
        {' · '}
        {course.enrolled}/{course.capacity} enrolled ({occupancy}%)
      </div>
    </div>
  )
}

export function CoursesPage() {
  const { data: courses, isLoading, isError } = useGetCourses()

  // TODO 3b: Add a semester filter.
  //
  // 1. Create a state variable for the selected semester (useState)
  // 2. Pass it to the hook: useGetCourses({ semester: ... })
  // 3. Render a Select (from @/components/ui/select) above the course grid
  //    with options: All semesters / Spring / Fall
  //
  // The hook will automatically refetch when the parameters change.

  if (isLoading) {
    return <p>Loading courses…</p>
  }

  if (isError) {
    return <p className="text-destructive">Failed to load courses. Is the server running?</p>
  }

  return (
    <div>
      <h1 className="mb-6">Courses</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
