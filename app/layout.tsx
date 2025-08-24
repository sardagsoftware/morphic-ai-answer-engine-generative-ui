import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Analytics } from '@vercel/analytics/next'

import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

import AppSidebar from '@/components/app-sidebar'
import ArtifactRoot from '@/components/artifact/artifact-root'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'AitBondie - IQ Sahibi Lideriniz.Olarak'
const description = ''

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/aitbondie-favicon.svg',
    apple: '/aitbondie-favicon.png'
  },
  openGraph: {
    title,
    description,
    url: 'https://www.aitbondie.ai',
    siteName: 'AitBondie',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 627,
        alt: 'AitBondie'
      }
    ],
    locale: 'tr_TR',
    type: 'website'
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '',
    site: '@aitbondie',
    images: ['/opengraph-image.png']
  },
  alternates: {
    canonical: 'https://www.aitbondie.ai',
    languages: {
      tr: 'https://www.aitbondie.ai',
      en: 'https://www.aitbondie.ai/en'
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  keywords: ['AitBondie', 'Yapay Zeka', 'AI', 'Cevap Motoru', 'Lider', 'Chatbot', 'Türkiye', 'OpenAI', 'Anthropic', 'Google Gemini', 'xAI', 'Fireworks', 'Groq', 'Ollama', 'IQ', 'Soru Cevap', 'Arama Motoru'],
  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  let user = null
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = await createClient()
    const {
      data: { user: supabaseUser }
    } = await supabase.auth.getUser()
    user = supabaseUser
  }

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen flex flex-col font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen>
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <Header user={user} />
              <main className="flex flex-1 min-h-0">
                <ArtifactRoot>{children}</ArtifactRoot>
              </main>
            </div>
          </SidebarProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
