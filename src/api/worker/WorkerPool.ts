import { Worker } from 'worker_threads'

export default class WorkerPool {
  workerPath: string
  workers: Worker[]
  freeWorkers: Worker[]
  taskQueue: string[]

  constructor(workerPath: string, numberOfWorkers: number = 1) {
    this.workerPath = workerPath
    this.workers = []
    this.freeWorkers = []
    this.taskQueue = []

    for (let i = 0; i < numberOfWorkers; i++) {
      const worker = new Worker(workerPath, {
        eval: true,
        workerData: null,
        execArgv: ['-r', 'ts-node/register'],
      })

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
    this.next()
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

  destroy() {
    for (const worker of this.workers) {
      worker
        .terminate()
        .then(() => console.log(`Worker ${worker.threadId} terminated`))
    }
  }
}
