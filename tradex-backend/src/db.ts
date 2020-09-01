import { Connection, ConnectionOptions, createConnection } from 'typeorm'

export function initializeDatabase(config: ConnectionOptions): Promise<Connection> {
  return createConnection(config)
}
