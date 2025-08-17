import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
// service
import { login } from '../service/login.service'

const App = styled('main')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  color: '#424242',
})

const Container = styled('div')({
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const Title = styled('h1')({
  fontSize: '24px',
  fontWeight: 600,
  textAlign: 'left',
})

const Label = styled('label')({
  fontSize: '12px',
  fontWeight: 500,
  marginBottom: '4px',
})

const InputBox = styled('input')({
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #d9d9d9',
  fontSize: '12px',
})

const ForgotPassword = styled('a')({
  fontSize: '12px',
  color: '#1976d2',
  textDecoration: 'none',
  marginLeft: 'auto',
  cursor: 'pointer',
  '&:hover': { textDecoration: 'underline' },
})

const Button = styled('button')({
  width: '100%',
  padding: '10px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 500,
  '&:hover': { backgroundColor: '#1565c0' },
})

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Please enter both email and password')
      return
    }
    try {
      setLoading(true)
      const res = await login(username, password)
      localStorage.setItem('token', res.token)
      navigate('/workflows')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <App>
      <Container>
        <Title>Sign in</Title>

        <form onSubmit={handleSubmit}>
          <div>
            <Label>Email</Label>
            <InputBox
              type='email'
              placeholder='Email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Label>Password</Label>
              <ForgotPassword>Forgot password?</ForgotPassword>
            </div>
            <InputBox
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>
          )}

          <Button
            type='submit'
            disabled={loading}
            style={{ marginTop: '16px' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Container>
    </App>
  )
}

export default Login
