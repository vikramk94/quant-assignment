import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASS

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())

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
  {
    id: 'wf003',
    name: 'Monthly Data Cleanup',
    status: 'Failed',
    startTime: '2025-06-30T05:30:00Z',
    owner: 'USA',
  },
  {
    id: 'wf004',
    name: 'Real-time Analytics Stream',
    status: 'Running',
    startTime: '2025-07-03T09:15:00Z',
    owner: 'Germany',
  },
  {
    id: 'wf005',
    name: 'Quarterly Backup',
    status: 'Pending',
    startTime: '2025-07-05T00:00:00Z',
    owner: 'UK',
  },
  {
    id: 'wf006',
    name: 'Customer Report Generation',
    status: 'Completed',
    startTime: '2025-07-01T11:45:00Z',
    owner: 'Canada',
  },
  {
    id: 'wf007',
    name: 'AI Model Training',
    status: 'Running',
    startTime: '2025-07-03T07:50:00Z',
    owner: 'India',
  },
  {
    id: 'wf008',
    name: 'Log Archival',
    status: 'Failed',
    startTime: '2025-06-29T20:00:00Z',
    owner: 'Australia',
  },
  {
    id: 'wf009',
    name: 'Data Quality Check',
    status: 'Completed',
    startTime: '2025-07-02T04:00:00Z',
    owner: 'India',
  },
  {
    id: 'wf010',
    name: 'Security Audit Workflow',
    status: 'Pending',
    startTime: '2025-07-06T10:00:00Z',
    owner: 'Singapore',
  },
]

// Root health check
app.get('/', (req: Request, res: Response) => {
  res.send('Backend API is running...')
})

// Mock login
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


// Get all workflows with pagination
app.get('/api/workflows', (req: Request, res: Response) => {
  let { page = '1', limit = '10' } = req.query

  const pageNum = parseInt(page as string, 10)
  const limitNum = parseInt(limit as string, 10)

  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum

  const paginatedWorkflows = workflows.slice(startIndex, endIndex)

  // response structure
  res.json({
    total: workflows.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(workflows.length / limitNum),
    data: paginatedWorkflows,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
