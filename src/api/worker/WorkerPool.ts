import { Worker } from 'worker_threads'
import { fileURLToPath } from 'node:url'
import { isMainThread } from 'node:worker_threads'
import worker from './worker.js'
import os from 'node:os'

export default class WorkerPool {
  workerPath: string
  workers: Worker[]
  freeWorkers: Worker[]
  taskQueue: string[]
  cpuNum: number
  workerNum: number

  constructor(numberOfWorkers?: number) {
    this.workerPath = fileURLToPath(import.meta.url)
    this.workers = []
    this.freeWorkers = []
    this.taskQueue = []
    this.cpuNum = os.cpus().length
    this.workerNum = numberOfWorkers
      ? Math.min(numberOfWorkers, this.cpuNum)
      : this.cpuNum

    for (let i = 0; i < this.workerNum; i++) {
      const worker = new Worker(this.workerPath)

      worker.on('message', (result) => this.handleMessage(worker, result))
      worker.on('error', (err) => console.error(`Worker error: ${err}`, err))
      worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker stopped with exit code ${code}`)
      })
      this.workers.push(worker)
      this.freeWorkers.push(worker)
    }
  }

  handleMessage(worker: Worker, result: string) {
    console.log(`Worker ${worker.threadId} finished task`, result)
    this.freeWorkers.push(worker)

    // check if pool finished all tasks
    if (
      this.taskQueue.length === 0 &&
      this.freeWorkers.length === this.workers.length
    ) {
      console.log('All tasks finished')
      this.destroy()
    } else {
      this.next()
    }
  }

  next() {
    if (this.taskQueue.length > 0 && this.freeWorkers.length > 0) {
      const task = this.taskQueue.shift()
      if (task) {
        this.runTask(task)
      }
    }
  }

  runTask(task: string) {
    const worker = this.freeWorkers.pop()
    if (worker) {
      console.log(`Worker ${worker.threadId} started task`)
      worker.postMessage(task)
    } else {
      this.taskQueue.push(task)
    }
  }

  getPoolStatus() {
    return {
      workers: this.workers.length,
      freeWorkers: this.freeWorkers.length,
      taskQueue: this.taskQueue.length,
    }
  }

  destroy() {
    for (const worker of this.workers) {
      worker
        .terminate()
        .then(() => console.log(`Worker ${worker.threadId} terminated`))
    }
  }
}

// run worker if not in main thread
if (!isMainThread) {
  worker()
}
