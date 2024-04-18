// import requestTranslation from './api/requestTranslation.js'
//
// const translation = await requestTranslation('hello')
//
// console.log(translation)

import WorkerPool from './api/worker/WorkerPool.js'

// test worker pool
const pool = new WorkerPool(4)
for (let i = 0; i < 100; i++) {
  pool.runTask(`task ${i}`)
}

console.log(pool.getPoolStatus())
