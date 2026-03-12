// This page demonstrates how to use generated hooks from the OpenAPI spec.
//
// Kubb generates `useGetCourses` from the OpenAPI spec:
//   src/generated/hooks/useGetCourses.ts

import { useGetCourses } from '../generated/hooks/useGetCourses'
import type { Course } from '../generated/types/Course'

function CourseCard({ course }: { course: Course }) {
  const occupancy = Math.round((course.enrolled / course.capacity) * 100)

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <strong style={{ fontSize: '1rem' }}>
          {course.code} – {course.name}
        </strong>
        <span style={{ fontSize: '0.8rem', color: '#666' }}>
          {course.credits} credits
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.875rem', color: '#444' }}>{course.description}</p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {course.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: '#e8f0fe',
              color: '#1a73e8',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: '0.75rem',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        {course.semester.charAt(0).toUpperCase() + course.semester.slice(1)} {course.year}
        &nbsp;·&nbsp;
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
    return <p style={{ color: 'red' }}>Failed to load courses. Is the server running?</p>
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Courses</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
