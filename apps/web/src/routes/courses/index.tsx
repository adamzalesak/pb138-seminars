import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useGetCourses } from '@/generated/hooks/useGetCourses'
import type { Course } from '@/generated/types/Course'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const courseSearchSchema = z.object({
  semester: z.enum(['spring', 'fall']).optional(),
})

export const Route = createFileRoute('/courses/')({
  validateSearch: courseSearchSchema,
  component: CoursesPage,
})

function CourseCard({ course }: { course: Course }) {
  const occupancy = Math.round((course.enrolled / course.capacity) * 100)

  return (
    <Link
      to="/courses/$id"
      params={{ id: course.id }}
      className="flex flex-col gap-2 rounded-lg border border-border p-4 transition-colors hover:border-foreground"
    >
      <div className="flex items-baseline justify-between">
        <strong>
          {course.code} – {course.name}
        </strong>
        <span className="text-xs text-muted-foreground">
          {course.credits} credits
        </span>
      </div>

      <p className="m-0 text-sm text-muted-foreground">{course.description}</p>

      <div className="text-xs text-muted-foreground">
        {course.semester.charAt(0).toUpperCase() + course.semester.slice(1)}{' '}
        {course.year}
        {' · '}
        {course.enrolled}/{course.capacity} enrolled ({occupancy}%)
      </div>
    </Link>
  )
}

function CoursesPage() {
  const { semester } = Route.useSearch()
  const navigate = Route.useNavigate()

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCourses(semester ? { semester } : undefined)

  if (isLoading) {
    return <p>Loading courses…</p>
  }

  if (isError) {
    return (
      <p className="text-destructive">
        Failed to load courses. Is the server running?
      </p>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Select
          value={semester ?? 'all'}
          onValueChange={(value) =>
            navigate({
              search: {
                semester:
                  value === 'all' ? undefined : (value as 'spring' | 'fall'),
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All semesters</SelectItem>
            <SelectItem value="spring">Spring</SelectItem>
            <SelectItem value="fall">Fall</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
