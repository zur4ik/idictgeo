import { parentPort } from 'worker_threads'

export default function worker() {
  parentPort?.on('message', (task: string) => {
    console.log(`Worker ${process.pid} started task`, task)
    setTimeout(() => {
      console.log(`Worker ${process.pid} finished task`, task)
      parentPort?.postMessage(task)
    }, 1000)
  })
}
