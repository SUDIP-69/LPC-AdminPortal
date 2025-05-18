import { useState, useCallback } from 'react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

interface UseApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
  execute: (config?: AxiosRequestConfig) => Promise<void>
}

export function useApi<T>(url: string): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const execute = useCallback(
    async (config?: AxiosRequestConfig) => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios(url, {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...config?.headers,
          },
        })
        setData(response.data)
      } catch (err) {
        const error = err as AxiosError
        setError(
          error.response?.data?.message ||
            error.message ||
            'An error occurred while fetching data'
        )
      } finally {
        setLoading(false)
      }
    },
    [url]
  )

  return { data, error, loading, execute }
}

// Example usage:
/*
const { data, error, loading, execute } = useApi<User[]>('/api/users')

// GET request
useEffect(() => {
  execute()
}, [execute])

// POST request
const createUser = async (userData: UserData) => {
  await execute({
    method: 'POST',
    data: userData,
  })
}

// PUT request
const updateUser = async (userId: string, userData: UserData) => {
  await execute({
    method: 'PUT',
    url: `/api/users/${userId}`,
    data: userData,
  })
}

// DELETE request
const deleteUser = async (userId: string) => {
  await execute({
    method: 'DELETE',
    url: `/api/users/${userId}`,
  })
}
*/ 