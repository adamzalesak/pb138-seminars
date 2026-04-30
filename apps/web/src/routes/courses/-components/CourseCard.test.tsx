import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import type { Course } from '@/generated/types/Course'
import { CourseCard } from './CourseCard'

// CourseCard wraps its content in a TanStack Router <Link>. For unit testing
// the presentation, we don't need a full router — replace Link with a div so
// render() works without a RouterProvider.
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}))

const fixture: Course = {
  id: 'course-1',
  code: 'CB-101',
  name: 'Intro to Bun',
  description: 'A whirlwind tour of Bun.',
  credits: 3,
  instructorId: 'instructor-1',
  semester: 'fall',
  year: 2026,
  capacity: 30,
  enrolled: 15,
}

test('renders course code and name', () => {
  render(<CourseCard course={fixture} />)
  expect(screen.getByText(/CB-101 – Intro to Bun/)).toBeInTheDocument()
})

test('renders credits suffix', () => {
  render(<CourseCard course={fixture} />)
  expect(screen.getByText('3 credits')).toBeInTheDocument()
})

test('computes occupancy percentage', () => {
  render(<CourseCard course={{ ...fixture, enrolled: 15, capacity: 30 }} />)
  expect(screen.getByText(/50%/)).toBeInTheDocument()
})
