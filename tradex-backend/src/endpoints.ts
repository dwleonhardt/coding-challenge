import { Router, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { getPolls, newPoll } from './db'
import { loadConfig } from './config'
import { allEntities } from './schema'
import { NewPollRequest } from './types'
import { Connection } from 'typeorm'

export async function initEndpoints(db: Connection): Promise<Router> {
  const router = Router()

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())

  router.get('/', async (req: Request, res: Response) => {
    res.send('TradeX Challenge API is Running')
  })

  router.post('/poll', async (req: Request, res: Response) => {
    const { title } = req.body
    const pollRequest: NewPollRequest = { title }
    const query = await newPoll(db, pollRequest)
    const { poll } = query.identifiers[0]
    res.status(400).send(poll)
  })

  router.get('/polls', async (req: Request, res: Response) => {
    const polls = await getPolls(db)
    res.send(polls)
  })

  router.delete('/poll', async (req: Request, res: Response) => {

  })
  return router
}
