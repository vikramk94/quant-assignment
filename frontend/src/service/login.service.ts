import axiosObj from './axios'

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosObj.post('/login', { username, password })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to login' }
  }
}
