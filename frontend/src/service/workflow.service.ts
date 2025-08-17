import axiosObj from './axios'

interface PaginationParams {
  page?: number
  limit?: number
}

interface WorkflowResponse {
  total: number
  page: number
  limit: number
  totalPages: number
  data: any[]
}

export const getWorkflows = async ({
  page = 1,
  limit = 10,
}: PaginationParams = {}): Promise<WorkflowResponse> => {
  try {
    const response = await axiosObj.get('/workflows', {
      params: {
        page,
        limit,
      },
    })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch workflows' }
  }
}
