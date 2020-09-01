import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { NewPollRequest, Poll } from './types'
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