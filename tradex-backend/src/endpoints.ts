import { Router, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { deletePoll, getPolls, newItem, newPoll } from './db'
import { DeletePollRequest, NewItemRequest, NewPollRequest } from './types'
import { Connection } from 'typeorm'
import { validateBody } from './utility'

export async function initEndpoints(db: Connection): Promise<Router> {
  const router = Router()

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())

  router.get('/', async (req: Request, res: Response) => {
    res.send('TradeX Challenge API is Running')
  })

  router.post('/poll', validateBody(NewPollRequest), createPollHandler(db))

  router.post('/items', validateBody(NewItemRequest), createItemHandler(db))

  router.get('/polls', async (req: Request, res: Response) => {
    const polls = await getPolls(db)
    res.send(polls)
  })

  router.delete('poll', validateBody(DeletePollRequest), deletePollHandler(db))
  return router
}

export const createPollHandler = (db: Connection) => async (request: Request, res: Response) => {
  const query = await newPoll(db, request.body)
  const { poll } = query.identifiers[0]
  res.send(poll)
}

export const deletePollHandler = (db: Connection) => async (request: Request, res: Response) => {
  const query = await deletePoll(db, request.body)
  res.send(query)
}

export const createItemHandler = (db: Connection) => async (request: Request, res: Response) => {
  const query = await newItem(db, request.body)
  res.send(query)
}
