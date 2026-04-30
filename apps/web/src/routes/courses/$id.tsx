import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getCoursesByIdQueryOptions } from '@/generated/hooks/useGetCoursesById'

export const Route = createFileRoute('/courses/$id')({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(getCoursesByIdQueryOptions(id)),
  component: CourseDetailPage,
  pendingComponent: () => <p className="text-muted-foreground">Loading course…</p>,
  errorComponent: ({ error }) => (
    <div>
      <p className="mb-4 text-destructive">Failed to load course: {error.message}</p>
      <Link to="/courses" className="text-sm underline">
        Back to courses
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div>
      <p className="mb-4 text-muted-foreground">Course not found.</p>
      <Link to="/courses" className="text-sm underline">
        Back to courses
      </Link>
    </div>
  ),
})

function CourseDetailPage() {
  const { id } = Route.useParams()
  const { data: course } = useSuspenseQuery(getCoursesByIdQueryOptions(id))

  const occupancy = Math.round((course.enrolled / course.capacity) * 100)

  return (
    <div>
      <Link
        to="/courses"
        className="mb-4 inline-block text-sm text-muted-foreground underline hover:text-foreground"
      >
        ← Back to courses
      </Link>

      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-xl font-bold">
          {course.code} – {course.name}
        </h2>
        <span className="text-sm text-muted-foreground">{course.credits} credits</span>
      </div>

      <p className="mb-4 text-muted-foreground">{course.description}</p>

      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Semester</dt>
        <dd>
          {course.semester.charAt(0).toUpperCase() + course.semester.slice(1)} {course.year}
        </dd>

        <dt className="text-muted-foreground">Enrollment</dt>
        <dd>
          {course.enrolled}/{course.capacity} ({occupancy}%)
        </dd>

        <dt className="text-muted-foreground">Instructor ID</dt>
        <dd className="font-mono text-xs">{course.instructorId}</dd>
      </dl>
    </div>
  )
}
