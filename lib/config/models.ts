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
    // First attempt: read the models.json file directly from the public directory.
    try {
      const modelsPath = path.join(process.cwd(), 'public', 'config', 'models.json')
      if (fs.existsSync(modelsPath)) {
        const raw = fs.readFileSync(modelsPath, 'utf-8')
        const config = JSON.parse(raw)
        if (Array.isArray(config.models) && config.models.every(validateModel)) {
          console.log('Successfully loaded models from public/config/models.json')
          return config.models
        }
      } else {
        console.warn('models.json not found at', modelsPath)
      }
    } catch (fsError: any) {
      console.warn('Failed to read models from filesystem:', fsError?.message || fsError)
    }

    // If filesystem read fails, fall back to fetching via base URL (server environment)
    const baseUrlObj = await getBaseUrl()
    const modelUrl = new URL('/config/models.json', baseUrlObj)
    console.log('Attempting to fetch models from URL:', modelUrl.toString())

    try {
      const response = await fetch(modelUrl, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json'
        }
      })

      if (!response.ok) {
        console.warn(
          `HTTP error when fetching models: ${response.status} ${response.statusText}`
        )
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()

      // Check if the response starts with HTML doctype
      if (text.trim().toLowerCase().startsWith('<!doctype')) {
        console.warn('Received HTML instead of JSON when fetching models')
        throw new Error('Received HTML instead of JSON')
      }

      const config = JSON.parse(text)
      if (Array.isArray(config.models) && config.models.every(validateModel)) {
        console.log('Successfully loaded models from URL')
        return config.models
      }
    } catch (error: any) {
      // Fallback to default models if fetch fails
      console.warn(
        'Fetch failed, falling back to default models:',
        error.message || 'Unknown error'
      )

      if (
        Array.isArray(defaultModels.models) &&
        defaultModels.models.every(validateModel)
      ) {
        console.log('Successfully loaded default models')
        return defaultModels.models
      }
    }
  } catch (error) {
    console.warn('Failed to load models:', error)
  }

  // Last resort: return empty array
  console.warn('All attempts to load models failed, returning empty array')
  return []
}
