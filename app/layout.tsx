import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { poppins } from '@/components/fonts'



export const metadata: Metadata = {
  title: 'Blog.ly',
  description: 'A blog about everything.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
        </ThemeProvider>
       
        </body>
    </html>
  )
}
