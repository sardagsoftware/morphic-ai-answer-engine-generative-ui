'use client'

import { useState, useTransition } from 'react'

import { toast } from 'sonner'

import { clearChats } from '@/lib/actions/chat'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { Spinner } from './ui/spinner'

type ClearHistoryProps = {
  empty: boolean
}

export function ClearHistory({ empty }: ClearHistoryProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full" disabled={empty}>
          Geçmişi Temizle
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. Geçmişiniz kalıcı olarak silinecek ve verileriniz
            sunucularımızdan kaldırılacaktır.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>İptal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={event => {
              event.preventDefault()
              startTransition(async () => {
                const result = await clearChats()
                if (result?.error) {
                  toast.error(result.error)
                } else {
                  toast.success('Geçmiş temizlendi')
                }
                setOpen(false)
              })
            }}
          >
            {isPending ? <Spinner /> : 'Temizle'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
