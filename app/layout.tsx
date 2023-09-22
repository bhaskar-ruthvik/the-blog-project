import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { poppins } from '@/components/fonts'
import Head from 'next/head'


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
       <Head>
    <link rel="shortcut icon" href="/images/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>

</Head>
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
