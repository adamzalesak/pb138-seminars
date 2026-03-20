import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/students/')({
  component: StudentsPage,
})

function StudentsPage() {
  // TODO (Task 1): Move the StudentsPage content here
  // Use the existing components and hooks from the old pages/StudentsPage.tsx as reference
  // Hint: useGetStudents(), usePostStudents(), Input, Button components
  //
  // TODO (Task 3): Extract the heading into a layout route (students/route.tsx)
  // The layout should render a heading + <Outlet /> for child content
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Students</h1>
      <p className="text-muted-foreground">
        TODO: Implement the students list and add student form.
      </p>
    </div>
  )
}
