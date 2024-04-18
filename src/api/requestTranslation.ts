import axios from 'axios'
import type { TranslationResponse } from '../types/data.js'

export default async function requestTranslation(
  word: string,
): Promise<TranslationResponse | null> {
  try {
    const response = await axios.get(
      'https://beta2.translate.ge/api/translate',
      {
        params: {
          from: 'en',
          to: 'ka',
          str: word,
        },
        headers: {
          Pragma: 'no-cache',
          Accept: 'application/json, text/plain, */*',
          'Sec-Fetch-Site': 'same-site',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Sec-Fetch-Mode': 'cors',
          'Cache-Control': 'no-cache',
          Origin: 'https://www.translate.ge',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
          Referer: 'https://www.translate.ge/',
          Connection: 'keep-alive',
          Host: 'beta2.translate.ge',
          'Sec-Fetch-Dest': 'empty',
        },
      },
    )

    return response.data
  } catch (err) {
    return null
  }
}
