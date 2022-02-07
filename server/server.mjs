import express, { json } from 'express'
import cors from 'cors'
import { join, resolve } from 'path'
import { initialize } from './repository.mjs'
import router from './router.mjs'
express()
  .use(cors())
  .use(json())
  .use(express.static(join(resolve(), 'public')))
  .use('/models', router)
  .listen(process.env.PORT || 8080, async () => {
    try {
      await initialize()
    } catch (error) {
      console.error(error)
    }
  })
