import { useQueryClient } from '@tanstack/react-query'
import { useGetStudents, getStudentsQueryKey } from '../generated/hooks/useGetStudents'
import { usePostStudents } from '../generated/hooks/usePostStudents'

export function StudentsPage() {
  // TODO 3a: Fetch and display students.
  //
  // 1. Call useGetStudents() to get { data, isLoading, isError }
  //    (same pattern as CoursesPage uses useGetCourses)
  // 2. Handle loading and error states
  // 3. Render each student's name (firstName + lastName), email, and UCO
  //
  // Reference: CoursesPage.tsx

  // TODO 4: Add a form to create a new student.
  //
  // 1. Create state variables for firstName, lastName, email, and uco (useState)
  // 2. Get the query client: const queryClient = useQueryClient()
  // 3. Create a mutation using the generated hook:
  //      const mutation = usePostStudents({
  //        mutation: {
  //          onSuccess: () => {
  //            queryClient.invalidateQueries({ queryKey: getStudentsQueryKey() })
  //            // reset form fields here
  //          },
  //        },
  //      })
  // 4. Build a <form> with four Input fields (from @/components/ui/input)
  //    and a submit Button (from @/components/ui/button)
  // 5. On submit, call mutation.mutate({ data: { firstName, lastName, email, uco } })
  // 6. Show mutation.error below the form when submission fails
  //    (e.g. the server rejects an invalid UCO format)
  //
  // Imports you need (useQueryClient, usePostStudents, getStudentsQueryKey)
  // are already at the top of this file.

  return (
    <div>
      <h2 className="mb-6">Students</h2>
      {/* Replace this with your implementation */}
      <p>Not implemented yet.</p>
    </div>
  )
}
