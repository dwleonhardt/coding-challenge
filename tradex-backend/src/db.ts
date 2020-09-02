import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import {DeletePollRequest, NewItemRequest, NewPollRequest, Poll} from './types'
import { Polls } from './schema'
import { newUuid } from './utility'

export function initializeDatabase(config: ConnectionOptions): Promise<Connection> {
  return createConnection(config)
}

export async function newPoll(db: Connection, requestData: NewPollRequest): Promise<any> {
  const formattedPoll: Poll = {
    poll: newUuid(),
    title: requestData.title,
  }
  return await db.getRepository(Polls).insert(formattedPoll)
}

export async function getPolls(db: Connection): Promise<any> {
  return await db.getRepository(Polls).find()
}

export const deletePoll = (db: Connection, poll: string) => db.getRepository(Polls).delete({ poll })

export function newItem(db: Connection, requestData: NewItemRequest): Promise<any> {

}