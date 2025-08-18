import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'
import Login from './pages/login'
import WorkflowTable from './pages/workflowTable'
import { getAccessToken } from './service/login.service'

export const ProtectedRoutes = () => {
  const isLoggedIn = getAccessToken()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/workflows" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/workflows" element={<WorkflowTable />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
