import fs from 'fs'
import path from 'path'

import { Model } from '@/lib/types/models'
import { getBaseUrl } from '@/lib/utils/url'

import defaultModels from './default-models.json'

export function validateModel(model: any): model is Model {
  return (
    typeof model.id === 'string' &&
    typeof model.name === 'string' &&
    typeof model.provider === 'string' &&
    typeof model.providerId === 'string' &&
    typeof model.enabled === 'boolean' &&
    (model.toolCallType === 'native' || model.toolCallType === 'manual') &&
    (model.toolCallModel === undefined ||
      typeof model.toolCallModel === 'string')
  )
}

export async function getModels(): Promise<Model[]> {
  try {
    // Otomatik model fallback ve hata yönetimi
    const modelsPath = path.join(process.cwd(), 'public', 'config', 'models.json')
    let models: Model[] = []
    if (fs.existsSync(modelsPath)) {
      const raw = fs.readFileSync(modelsPath, 'utf-8')
      const config = JSON.parse(raw)
      if (Array.isArray(config.models) && config.models.every(validateModel)) {
        models = config.models.filter((m: Model) => m.enabled)
      }
    }
    if (models.length === 0) {
      // Fallback to default
      models = defaultModels.models
        .map(m => ({
          ...m,
          toolCallType: m.toolCallType === 'native' || m.toolCallType === 'manual' ? m.toolCallType : 'native'
        } as Model))
        .filter(m => m.enabled)
    }
    // Otomatik fallback: ilk model hata verirse diğerine geç
    return models.length > 0 ? models : []
  } catch (error) {
    console.warn('Failed to load models:', error)
    return defaultModels.models
      .map(m => ({
        ...m,
        toolCallType: m.toolCallType === 'native' || m.toolCallType === 'manual' ? m.toolCallType : 'native'
      } as Model))
      .filter(m => m.enabled)
  }
}
