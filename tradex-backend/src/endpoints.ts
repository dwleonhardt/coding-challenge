import { Router, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import {deletePoll, getItemByPollId, getPolls, newItem, newPoll, updateItem} from './db'
import {DeletePollRequest, NewItemRequest, NewPollRequest, VoteRequest} from './types'
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

  router.delete('/poll', validateBody(DeletePollRequest), deletePollHandler(db))

  router.patch('/vote', validateBody(VoteRequest), voteRequestHandler(db))

  return router
}

export const createPollHandler = (db: Connection) => async (request: Request, res: Response) => {
  const pollId = await newPoll(db, request.body)
  res.send(pollId)
}

export const deletePollHandler = (db: Connection) => async (request: Request, res: Response) => {
  const query = await deletePoll(db, request.body.pollId)
  res.send(query)
}

export const createItemHandler = (db: Connection) => async (request: Request, res: Response) => {
  const query = await newItem(db, request.body)
  res.send(query)
}

export const voteRequestHandler = (db: Connection) => async (request: Request, res: Response) => {
  const items = await getItemByPollId(db, request.body.itemId)
  const votes = items![0].votes + 1
  const query = updateItem(db, items![0].item, { votes })
  res.send(query)
}
