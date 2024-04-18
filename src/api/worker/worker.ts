import { parentPort } from 'node:worker_threads'

parentPort?.on('message', (task: string) => {
  console.log(`Worker ${process.pid} started task`, task)
  setTimeout(() => {
    console.log(`Worker ${process.pid} finished task`, task)
    parentPort?.postMessage(task)
  }, 1000)
})
