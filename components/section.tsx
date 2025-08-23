'use client'

import React from 'react'

import {
  BookCheck,
  Check,
  File,
  Film,
  Image,
  MessageCircleMore,
  Newspaper,
  Repeat2,
  Search
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { StatusIndicator } from './ui/status-indicator'
import { ToolBadge } from './tool-badge'

type SectionProps = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  title?: string
  separator?: boolean
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  title,
  separator = false
}) => {
  const iconSize = 16
  const iconClassName = 'mr-1.5 text-muted-foreground'
  let icon: React.ReactNode
  let type: 'text' | 'badge' = 'text'
  // Support both English and Turkish title keys; map to display label and icon/type
  const titleKey = title || ''
  const mapping: Record<string, { label: string; icon: React.ReactNode; type?: 'text' | 'badge' }> = {
    Images: { label: 'Görüntüler', icon: <Image size={iconSize} className={iconClassName} /> },
    Görüntüler: { label: 'Görüntüler', icon: <Image size={iconSize} className={iconClassName} /> },
    Videos: { label: 'Videolar', icon: <Film size={iconSize} className={iconClassName} />, type: 'badge' },
    Videolar: { label: 'Videolar', icon: <Film size={iconSize} className={iconClassName} />, type: 'badge' },
    Sources: { label: 'Kaynaklar', icon: <Newspaper size={iconSize} className={iconClassName} />, type: 'badge' },
    Kaynaklar: { label: 'Kaynaklar', icon: <Newspaper size={iconSize} className={iconClassName} />, type: 'badge' },
    Answer: { label: 'Cevap', icon: <BookCheck size={iconSize} className={iconClassName} /> },
    Cevap: { label: 'Cevap', icon: <BookCheck size={iconSize} className={iconClassName} /> },
    Related: { label: 'İlgili', icon: <Repeat2 size={iconSize} className={iconClassName} /> },
    İlgili: { label: 'İlgili', icon: <Repeat2 size={iconSize} className={iconClassName} /> },
    'Follow-up': { label: 'Takip', icon: <MessageCircleMore size={iconSize} className={iconClassName} /> },
    Takip: { label: 'Takip', icon: <MessageCircleMore size={iconSize} className={iconClassName} /> },
    Content: { label: 'İçerik', icon: <File size={iconSize} className={iconClassName} />, type: 'badge' },
    İçerik: { label: 'İçerik', icon: <File size={iconSize} className={iconClassName} />, type: 'badge' }
  }

  const resolved = mapping[titleKey]
  if (resolved) {
    icon = resolved.icon
    type = resolved.type || 'text'
    // overwrite title with localized label
    title = resolved.label
  } else {
    icon = <Search size={iconSize} className={iconClassName} />
  }

  return (
    <>
      {separator && <Separator className="my-2 bg-primary/10" />}
      <section
        className={cn(
          ` ${size === 'sm' ? 'py-1' : size === 'lg' ? 'py-4' : 'py-2'}`,
          className
        )}
      >
        {title && type === 'text' && (
          <h2 className="flex items-center leading-none py-2">
            {icon}
            {title}
          </h2>
        )}
        {title && type === 'badge' && (
          <Badge variant="secondary" className="mb-2">
            {icon}
            {title}
          </Badge>
        )}
        {children}
      </section>
    </>
  )
}

export function ToolArgsSection({
  children,
  tool,
  number
}: {
  children: React.ReactNode
  tool: string
  number?: number
}) {
  return (
    <Section
      size="sm"
      className="py-0 flex items-center justify-between w-full"
    >
      <ToolBadge tool={tool}>{children}</ToolBadge>
      {number && number > 0 && (
        <StatusIndicator icon={Check} iconClassName="text-green-500">
          {number} sonuç
        </StatusIndicator>
      )}
    </Section>
  )
}
