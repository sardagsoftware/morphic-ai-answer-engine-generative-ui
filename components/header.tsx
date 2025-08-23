"use client"

// External
import React from 'react'
// Local (sibling)
import Link from 'next/link'

import { User } from '@supabase/supabase-js'

import { cn } from '@/lib/utils'

// Internal (absolute)
import { useSidebar } from '@/components/ui/sidebar'

import GuestMenu from './guest-menu'
import UserMenu from './user-menu'

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
      <div />

      <nav className="flex items-center gap-4">
        {/* Only show user menu / guest menu per request */}
        <div className="ml-2">
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </div>
      </nav>
    </header>
  )
}

export default Header
