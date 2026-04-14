import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LeetTrack — Track Your LeetCode Progress',
  description: 'Track and compare your LeetCode progress across multiple accounts. Find your true unique problem count.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
      <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}