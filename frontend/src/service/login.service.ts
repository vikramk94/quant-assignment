import axiosObj from './axios'

export const clearToken = () => {
  localStorage.removeItem('ACCESS_TOKEN')
}

export const storeToken = (token: string) => {
  localStorage.setItem('ACCESS_TOKEN', token)
}

export const getAccessToken = () => {
  return localStorage.getItem('ACCESS_TOKEN')
}


export const login = async (username: string, password: string) => {
  try {
    const response = await axiosObj.post('/login', { username, password })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to login' }
  }
}
