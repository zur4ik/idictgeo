import type { TranslationItem } from '../types/data.js'
import connectRedis from './connectRedis.js'

export default async function saveTranslation(
  word: string,
  translation: TranslationItem,
): Promise<void> {
  console.log(`Saving translation for: ${word}`)

  // connect to redis
  const client = await connectRedis()

  // save translation
  await client.hSet(`dictionary:translations:${word}`, { ...translation })
}
