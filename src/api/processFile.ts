import readline from 'readline'
import * as fs from 'node:fs'
import events from 'events'

type WordProcessorCallback = (data: string) => void

export default async function processFile(
  path: string,
  processor: WordProcessorCallback,
): Promise<void> {
  let wordCounter = 0

  // set timer
  console.time(`Processing words took:`)

  try {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity,
    })

    // process word
    lineReader.on('line', (word: string) => {
      wordCounter++
      if (typeof processor === 'function') {
        processor(word)
      }
    })

    // wait for end of file
    await events.once(lineReader, 'close')

    // log stats
    console.log(`Total words processed: ${wordCounter}`)
    console.timeEnd(`Processing words took:`)

    // calc memory usage
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    console.log(
      `Used approximately ${Math.round(used * 100) / 100} MB of memory`,
    )
  } catch (error) {
    console.error(`Error reading file: ${error}`)
  }
}
