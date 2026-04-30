import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useGetCourses } from '@/generated/hooks/useGetCourses'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CourseCard } from './-components/CourseCard'

const courseSearchSchema = z.object({
  semester: z.enum(['spring', 'fall']).optional(),
})

export const Route = createFileRoute('/courses/')({
  validateSearch: courseSearchSchema,
  component: CoursesPage,
})

function CoursesPage() {
  const { semester } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data: courses, isLoading, isError } = useGetCourses(semester ? { semester } : undefined)

  if (isLoading) {
    return <p>Loading courses…</p>
  }

  if (isError) {
    return <p className="text-destructive">Failed to load courses. Is the server running?</p>
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Select
          value={semester ?? 'all'}
          onValueChange={(value) =>
            navigate({
              search: {
                semester: value === 'all' ? undefined : (value as 'spring' | 'fall'),
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
