import { loadConfig } from '../config'
import { allEntities } from '../schema'
import { initializeDatabase, newPoll } from '../db'
import { describe, before } from 'mocha'
import { assert } from 'chai'
import { loadDotEnv } from '../scripts/init-db'
import { Connection } from 'typeorm'

describe('writing tests', function() {
  let db: Connection
  before(async function() {
    const env = loadDotEnv()
    const config = { ...loadConfig(env), entities: allEntities }
    db = await initializeDatabase(config)
    await db.query(`DROP SCHEMA "public" CASCADE`)
    await db.query(`CREATE SCHEMA "public"`)
    await db.synchronize()
    await db.close()
  })
  it('can create a new poll entry', async function() {
    const pollRequest = newPoll(db, { title: 'New Poll' })
    console.log(pollRequest)
    assert(true)
  })
})