import { generateId } from 'ai'

import { getModels } from '@/lib/config/models'

import { Chat } from '@/components/chat'
import MatrixCode from '@/components/matrix-code'

export default async function Page() {
  const id = generateId()
  const models = await getModels()
  return (
    <>
      {/* Döngüsel bilgi ticker */}
      <div className="w-full max-w-4xl mx-auto mt-2">
        {/* @ts-expect-error Server Component'ten Client Component'e geçiş */}
        {typeof window !== 'undefined' && require('@/components/info-ticker').default()}
      </div>
      <MatrixCode color="#fff" bg="#222" height={80} />
      <Chat id={id} models={models} />
    </>
  )
}
