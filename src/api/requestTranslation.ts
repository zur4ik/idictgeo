import type { TranslationResponse } from '../types/data.js'
import { ENDPOINTS, USER_AGENT } from '../types/consts.js'

export default async function requestTranslation(
  word: string,
): Promise<TranslationResponse | null> {
  const response = await fetch(
    `${ENDPOINTS.TRANSLATE}?from=en&to=ka&str=${word}`,
    {
      cache: 'default',
      credentials: 'omit',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        'User-Agent': USER_AGENT,
      },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'https://www.translate.ge/',
      referrerPolicy: 'strict-origin-when-cross-origin',
    },
  )

  // check response status
  if (!response.ok) {
    console.error(`Failed to fetch translation for: ${word}`)
    return null
  }

  // return response data
  return response.json()
}
