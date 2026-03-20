import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/')({
  component: CoursesPage,
})

function CoursesPage() {
  // TODO (Task 1): Move the CoursesPage content here
  // Use the existing components and hooks from the old pages/CoursesPage.tsx as reference
  // Hint: useGetCourses(), Select component for semester filter
  // Also add a <Link> to each course's detail page: /courses/$id
  //
  // TODO (Task 2): Replace useState semester filter with search params
  // 1. Add validateSearch with z.object({ semester: z.enum(["spring", "fall"]).optional() })
  // 2. Use Route.useSearch() instead of useState
  // 3. Use Route.useNavigate() to update search params
  //
  // TODO (Task 3): Extract the heading into a layout route (courses/route.tsx)
  // The layout should render a heading + <Outlet /> for child content
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Courses</h1>
      <p className="text-muted-foreground">
        TODO: Implement the courses list with semester filter.
      </p>
    </div>
  )
}
