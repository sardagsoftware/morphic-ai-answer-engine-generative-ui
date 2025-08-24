import { generateId } from 'ai'

import { getModels } from '@/lib/config/models'

import { Chat } from '@/components/chat'
import MatrixCode from '@/components/matrix-code'

export default async function Page() {
  const id = generateId()
  const models = await getModels()
  return (
    <>
      <MatrixCode color="#00FF41" bg="#18181b" height={80} />
      <Chat id={id} models={models} />
    </>
  )
}
