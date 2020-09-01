import * as express from 'express'
const app: express.Application = express()
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import { initEndpoints } from './endpoints'

export async function startExpress(app: express.Application): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    try {
      const server = app.listen(3000, (err: Error) => {
        if (err) return reject(err)
        dotenv.config()
        /* tslint:disable-next-line */
        console.log('App listening http://localhost:3000')
        resolve(server)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function startApi(): Promise<any> {
  const endpoints = await initEndpoints()
  const app = express()
  app.use(cors())
  app.use('/', endpoints)

  return await startExpress(app)
}
