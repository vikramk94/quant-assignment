import axios from 'axios'

const axiosObj = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVICE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosObj
