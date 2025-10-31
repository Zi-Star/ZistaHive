import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zista - Stay Busy. Stay Smart.',
  description: 'All-in-one productivity app for smart Kenyan youth. Tools, learning, games & rewards in one hive.',
  keywords: ['productivity', 'tools', 'learning', 'Kenya', 'youth', 'rewards'],
  authors: [{ name: 'Ziramzis' }],
  creator: 'Z-Star | Life in Motion',
  manifest: '/manifest.json',
  themeColor: '#FFC300',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
