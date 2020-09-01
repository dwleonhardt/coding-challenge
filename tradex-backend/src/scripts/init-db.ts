import { loadConfig } from '../config'
import { initializeDatabase } from '../db'
import { allEntities } from '../schema'
import * as path from 'path'
import { loadDotEnv } from '../utility'

async function main() {
  const env = loadDotEnv()
  const config = { ...loadConfig(env), entities: allEntities }
  const db = await initializeDatabase(config)
  await db.query(`DROP SCHEMA "public" CASCADE`)
  await db.query(`CREATE SCHEMA "public"`)
  await db.synchronize()
  await db.close()
  /* tslint:disable-next-line */
  console.log('finished initializing database')
}

main()
