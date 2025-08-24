import { generateId } from 'ai'

import { getModels } from '@/lib/config/models'

import HomeClient from './home-client'

export default async function Page() {
  const id = generateId()
  const models = await getModels()
  return <HomeClient id={id} models={models} />
}
