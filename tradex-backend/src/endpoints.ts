import { Router, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { deletePoll, getItem, getItemsByPollId, getPolls, newItem, newPoll, updateItem } from './db'
import { DeletePollRequest, FullPoll, ItemRequest, NewItemRequest, NewPollRequest, Poll, VoteRequest} from './types'
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
    const formatPolls = await polls.map(async (p: Poll) => {
      return await formatFullPoll(db, p)
    })
    const fullPolls = await Promise.all(formatPolls)
    res.send(fullPolls)
  })

  router.get('/items', validateBody(ItemRequest), itemsRequestHandler(db))

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
  const items = await getItem(db, request.body.itemId)
  const votes = items![0].votes + 1
  const query = updateItem(db, items![0].item, { votes })
  res.send(query)
}

export const itemsRequestHandler = (db: Connection) => async (request: Request, res: Response) => {
  const query = await getItemsByPollId(db, request.body.pollId)
  res.send(query)
}

export async function formatFullPoll(db: Connection, p: Poll): Promise<FullPoll> {
  const { poll, title } = p
  const items = await getItemsByPollId(db, poll)
  return { poll, title, items }
}
