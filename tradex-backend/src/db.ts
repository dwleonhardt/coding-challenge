import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { Item, NewItemRequest, NewPollRequest, Poll} from './types'
import { Items, Polls} from './schema'
import { newUuid } from './utility'

export function initializeDatabase(config: ConnectionOptions): Promise<Connection> {
  return createConnection(config)
}

export async function newPoll(db: Connection, requestData: NewPollRequest): Promise<any> {
  const formattedPoll: Poll = {
    poll: newUuid(),
    title: requestData.title,
  }
  const query = await db.getRepository(Polls).insert(formattedPoll)
  return query.identifiers[0].poll
}

export async function getPolls(db: Connection): Promise<any> {
  return await db.getRepository(Polls).find()
}

export async function getPollById(db: Connection, poll: string): Promise<Poll[] | undefined> {
  return await db.getRepository(Polls).find({ where: { poll } })
}

export const deletePoll = (db: Connection, poll: string) => {
  db.getRepository(Polls).delete({ poll })
  db.getRepository(Items).delete({ pollId: poll })
}

export async function newItem(db: Connection, requestData: NewItemRequest): Promise<any> {
  const { pollId, name } = requestData
  const item: Item = {
    item: newUuid(),
    pollId,
    name,
    votes: 0,
  }
  return await db.getRepository(Items).insert(item)
}

export async function getItemByPollId(db: Connection, pollId: string): Promise<Item[] | undefined> {
  return await db.getRepository(Items).find({ where: { pollId } })
}

export async function updateItem(db: Connection, item: string, data: Partial<Item>): Promise<any> {
  return await db.getRepository(Items).update(item, data)
}
