import { useQuery } from '@tanstack/react-query'
import { getStudentsQueryOptions } from '../generated/hooks/useGetStudents'

export function StudentsPage() {
  // TODO 3a: Fetch and display students.
  //
  // 1. Call useQuery with getStudentsQueryOptions()
  //    (same pattern as CoursesPage uses getCoursesQueryOptions)
  // 2. Handle loading and error states
  // 3. Render each student's name (firstName + lastName), email, and UCO
  //
  // Reference: CoursesPage.tsx

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Students</h2>
      {/* Replace this with your implementation */}
      <p>Not implemented yet.</p>
    </div>
  )
}
