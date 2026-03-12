import { CoursesPage } from './pages/CoursesPage'
import { StudentsPage } from './pages/StudentsPage'

function App() {
  return (
    <div className="mx-auto max-w-[900px] p-8 font-sans">
      <CoursesPage />
      <hr className="my-8" />
      <StudentsPage />
    </div>
  )
}

export default App
