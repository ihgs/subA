'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { RecoilRoot } from 'recoil'
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div style={{ marginLeft: 50, marginTop: 10, marginRight: 50 }}>
          <RecoilRoot>{children}</RecoilRoot>
        </div>
      </body>
    </html>
  )
}
