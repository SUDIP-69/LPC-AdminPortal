import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import '../styles/globals.css'

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'

  return (
    <>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <Toaster position="top-right" />
    </>
  )
}

export default function App(props: AppProps) {
  return (
    <SessionProvider session={props.pageProps.session}>
      <AppContent {...props} />
    </SessionProvider>
  )
} 