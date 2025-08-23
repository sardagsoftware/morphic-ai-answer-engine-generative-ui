'use client'

// import Link from 'next/link' // No longer needed directly here for Sign In button
import React from 'react'

import { User } from '@supabase/supabase-js'

import { cn } from '@/lib/utils'

import { useSidebar } from '@/components/ui/sidebar'

// import { Button } from './ui/button' // No longer needed directly here for Sign In button
import GuestMenu from './guest-menu' // Import the new GuestMenu component
import UserMenu from './user-menu'
import AnimatedLogo from './animated-logo'

interface HeaderProps {
  user: User | null
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { open } = useSidebar()
  return (
    <header
      className={cn(
        'sticky top-0 right-0 p-3 flex justify-between items-center z-30 bg-background/70 backdrop-blur-md transition-[width] duration-200 ease-linear',
        open ? 'md:w-[calc(100%-var(--sidebar-width))]' : 'md:w-full',
        'w-full'
      )}
    >
      <div className="flex items-center gap-3">
        <AnimatedLogo className="h-8 w-auto" />
      </div>

      <nav className="flex items-center gap-4">
        {/* Desktop / tablet: show full labels; mobile: show icons only */}
        <a href="/login" className="hidden sm:inline-flex items-center px-3 py-1 rounded hover:bg-muted/60">
          Giriş Yap
        </a>

        {/* Theme toggle placeholder - keep existing theme component if present */}
        <div className="hidden sm:inline-flex items-center px-3 py-1 rounded hover:bg-muted/60">
          Tema
        </div>

        <a href="/links" className="hidden sm:inline-flex items-center px-3 py-1 rounded hover:bg-muted/60">
          Bağlantılar
        </a>

        {/* Mobile: small icon buttons */}
        <div className="flex sm:hidden items-center gap-2">
          <a href="/login" aria-label="Giriş" className="p-2 rounded hover:bg-muted/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5v10z" />
            </svg>
          </a>
          <button aria-label="Tema" className="p-2 rounded hover:bg-muted/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
              <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Right-most: user menu / guest menu */}
        <div className="ml-2">
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </div>
      </nav>
    </header>
  )
}

export default Header
