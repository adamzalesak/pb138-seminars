import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/$id')({
  // TODO (Task 4): Add a loader that prefetches course data with React Query
  // Hint: loader: ({ context: { queryClient }, params }) =>
  //         queryClient.ensureQueryData(getCoursesByIdQueryOptions(params.id))
  //
  // TODO (Task 4): Add pendingComponent, errorComponent, notFoundComponent
  component: CourseDetailPage,
})

function CourseDetailPage() {
  const { id } = Route.useParams()

  // TODO (Task 2): Display course details using useGetCoursesById(id) or useSuspenseQuery
  // TODO (Task 2): Add a Link back to the courses list
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Course Detail</h1>
      <p className="text-muted-foreground">
        TODO: Display details for course ID: {id}
      </p>
    </div>
  )
}
