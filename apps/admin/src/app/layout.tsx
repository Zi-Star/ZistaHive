import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zista Admin Dashboard',
  description: 'Admin dashboard for managing Zista platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
