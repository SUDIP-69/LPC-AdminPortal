import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await signOut({ redirect: false })
      router.push('/login')
    } catch (error) {
      throw error
    }
  }, [router])

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
} 