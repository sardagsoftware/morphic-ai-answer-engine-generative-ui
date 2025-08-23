'use client'

import { useState, useTransition } from 'react'

import { Share } from 'lucide-react'
import { toast } from 'sonner'

import { shareChat } from '@/lib/actions/chat'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Spinner } from './ui/spinner'

interface ChatShareProps {
  chatId: string
  className?: string
}

export function ChatShare({ chatId, className }: ChatShareProps) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [shareUrl, setShareUrl] = useState('')

  const handleShare = async () => {
    startTransition(() => {
      setOpen(true)
    })
    const result = await shareChat(chatId)
    if (!result) {
      toast.error('Paylaşım yapılamadı')
      return
    }

    if (!result.sharePath) {
      toast.error('Panoya kopyalanacak bağlantı bulunamadı')
      return
    }

    const url = new URL(result.sharePath, window.location.href)
    setShareUrl(url.toString())
  }

  const handleCopy = () => {
    if (shareUrl) {
      copyToClipboard(shareUrl)
  toast.success('Bağlantı panoya kopyalandı')
      setOpen(false)
    } else {
  toast.error('Kopyalanacak bağlantı yok')
    }
  }

  return (
    <div className={className}>
      <Dialog
        open={open}
        onOpenChange={open => setOpen(open)}
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-description"
      >
        <DialogTrigger asChild>
          <Button
            className={cn('rounded-full')}
            size="icon"
            variant={'ghost'}
            onClick={() => setOpen(true)}
          >
            <Share size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Arama sonucunun bağlantısını paylaş</DialogTitle>
            <DialogDescription>
              Bağlantıya sahip herkes bu arama sonucunu görüntüleyebilir.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="items-center">
            {!shareUrl && (
              <Button onClick={handleShare} disabled={pending} size="sm">
                {pending ? <Spinner /> : 'Bağlantı al'}
              </Button>
            )}
            {shareUrl && (
              <Button onClick={handleCopy} disabled={pending} size="sm">
                {'Bağlantıyı kopyala'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
