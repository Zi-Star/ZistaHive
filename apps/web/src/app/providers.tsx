'use client'

import { SessionProvider } from 'next-auth/react'
import { useState, useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render SessionProvider on the client side
  if (!isClient) {
    return <>{children}</>
  }

  return <SessionProvider>{children}</SessionProvider>
}