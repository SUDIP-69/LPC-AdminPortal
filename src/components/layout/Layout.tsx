import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from './Sidebar'
import { LogOut } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-60 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-20 bg-transparent h-16 flex items-center justify-end px-6">
          <button
            onClick={logout}
            className="flex bg-white p-2 rounded-md drop-shadow-md items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            Sign out
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
