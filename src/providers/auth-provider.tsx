'use client'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { status } = useSession()
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && path === '/login') {
      router.push('/')
    }
  }, [status, router, path])

  return <>{children}</>
}
