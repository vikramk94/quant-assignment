import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import WorkflowTable from './pages/workflowTable'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/workflows' element={<WorkflowTable />} />
      </Routes>
    </Router>
  )
}

export default App
