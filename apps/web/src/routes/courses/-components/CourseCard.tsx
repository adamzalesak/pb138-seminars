import { Link } from '@tanstack/react-router'
import type { Course } from '@/generated/types/Course'

export function CourseCard({ course }: { course: Course }) {
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
        <span className="text-xs text-muted-foreground">{course.credits} credits</span>
      </div>

      <p className="m-0 text-sm text-muted-foreground">{course.description}</p>

      <div className="text-xs text-muted-foreground">
        {course.semester.charAt(0).toUpperCase() + course.semester.slice(1)} {course.year}
        {' · '}
        {course.enrolled}/{course.capacity} enrolled ({occupancy}%)
      </div>
    </Link>
  )
}
