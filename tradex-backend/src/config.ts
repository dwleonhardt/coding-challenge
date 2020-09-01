import { ConnectionOptions } from 'typeorm'

export function loadConfig(env: any = process.env): ConnectionOptions {
  return {
    type: env.DATABASE_TYPE || 'postgres',
    host: env.HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  }
}