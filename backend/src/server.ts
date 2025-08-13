import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const ADMIN_USER = process.env.ADMIN_USER 
const ADMIN_PASS = process.env.ADMIN_PASS

// mock data 
interface Workflow {
  id: string
  name: string
  status: string
  startTime: string
  owner: string
}

const workflows: Workflow[] = [
  {
    id: 'wf001',
    name: 'Daily ETL Pipeline',
    status: 'Running',
    startTime: '2025-07-03T08:00:00Z',
    owner: 'India',
  },
  {
    id: 'wf002',
    name: 'Weekly Sync',
    status: 'Completed',
    startTime: '2025-07-02T06:00:00Z',
    owner: 'India',
  },
]

// Routes
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string
    password: string
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: 'mock-jwt-token' })
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' })
})

// Get all workflows
app.get('/api/workflows', (req: Request, res: Response) => {
  res.json(workflows)
})

// Root health check
app.get('/', (req: Request, res: Response) => {
  res.send('Backend API is running...')
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
