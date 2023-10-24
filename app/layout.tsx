import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { poppins } from '@/components/fonts'






export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' type='image/x-icon' href='images/favicon.ico' sizes='any'></link>
        <link
  rel="apple-touch-icon"
  href="images/apple-icon.png"
  type="image/png"
  sizes="any"
/>
   
      </head>
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
