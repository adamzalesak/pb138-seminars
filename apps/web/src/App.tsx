import { CoursesPage } from './pages/CoursesPage'
import { StudentsPage } from './pages/StudentsPage'

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <CoursesPage />
      <hr style={{ margin: '2rem 0' }} />
      <StudentsPage />
    </div>
  )
}

export default App
