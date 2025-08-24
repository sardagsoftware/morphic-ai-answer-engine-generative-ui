import { Suspense } from 'react'
import Link from 'next/link'

import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'

import { ChatHistorySection } from './sidebar/chat-history-section'
import { ChatHistorySkeleton } from './sidebar/chat-history-skeleton'
import { IconLogo } from './ui/icons'

export default function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="flex flex-row justify-between items-center">
          <Link href="/" className="flex items-center gap-2 px-2 py-3">
          <IconLogo className={cn('size-5')} />
          <span className="font-semibold text-sm">AitBondie - IQ Sahibi Lideriniz.Olarak</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="flex flex-col px-2 py-4 h-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/ai-code-explain" className="flex items-center gap-2">
                <span>Kod Açıklama Modülü</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <Plus className="size-4" />
                <span>Yeni</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/ai-assistant" className="flex items-center gap-2">
                  {/* Farklı bir ikon eklemek isterseniz buraya ekleyebilirsiniz */}
                  <span>Yapay Zeka Asistanı</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<ChatHistorySkeleton />}>
            <ChatHistorySection />
          </Suspense>
        </div>
        <SidebarFooter>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/ai-summarizer" className="flex items-center gap-2">
                    <span>Metin Özetleyici</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/ai-image-analyzer" className="flex items-center gap-2">
                    <span>Görselden İçerik Analizi</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/ai-voice-assistant" className="flex items-center gap-2">
                    <span>Sesli Komut Asistanı</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/ai-sentiment" className="flex items-center gap-2">
                    <span>Duygu Analizi</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          <div className="text-xs text-muted-foreground">© 2025 AitBondie. Tüm hakları saklıdır.</div>
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
