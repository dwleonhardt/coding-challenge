import { Router, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { initializeDatabase, newPoll } from './db'
import { loadConfig } from './config'
import { allEntities } from './schema'
import { NewPollRequest } from './types'

export async function initEndpoints(): Promise<Router> {
  const router = Router()
  const config = { ...loadConfig(), entities: allEntities }
  const db = await initializeDatabase(config)

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())

  router.get('/', async (req: Request, res: Response) => {
    res.send('TradeX Challenge API is Running')
  })

  router.post('/poll', async (req: Request, res: Response) => {
    const { title } = req.body
    const pollRequest: NewPollRequest = { title }
    const poll = await newPoll(db, pollRequest)
    res.send(poll)
  })

  return router
}
