'use client'

import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// No transition wrapper - Next.js handles navigation natively with prefetching
// This component exists for compatibility but just passes through children
export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>
}