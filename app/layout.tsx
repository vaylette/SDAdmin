import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const helvetica = localFont({ 
  src: [
    {
      path: '../public/fonts/helvetica/HelveticaNowDisplay-RegIta.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/fonts/helvetica/HelveticaNowDisplay-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/helvetica/HelveticaNowDisplay-MedIta.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../public/fonts/helvetica/HelveticaNowDisplay-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/helvetica/HelveticaNowDisplay-BoldIta.woff2',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../public/fonts/helvetica/HelveticaNowDisplay-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--font-helvetica-now-display'
})

export const metadata: Metadata = {
  title: 'SmartDarasa - Dashboard',
  description: 'This is the SmartDarasa admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${helvetica.variable} font-sans hidden lg:block`}>
        <main className='min-w-screen min-h-screen'>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
