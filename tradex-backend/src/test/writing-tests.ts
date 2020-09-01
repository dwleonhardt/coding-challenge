import { loadConfig } from '../config'
import { allEntities } from '../schema'
import { getPolls, initializeDatabase, newPoll } from '../db'
import { describe, before } from 'mocha'
import { assert } from 'chai'
import { loadDotEnv } from '../utility'
import { Connection } from 'typeorm'

describe('writing tests', function() {
  let db: Connection
  before(async function() {
    const env = loadDotEnv()
    const config = { ...loadConfig(env), entities: allEntities }
    db = await initializeDatabase(config)
  })
  beforeEach(async function() {
    const promises = allEntities.map(entity => {
      const meta = db.getMetadata(entity)
      return db.getRepository(entity).query(`TRUNCATE "${meta.tableName}" CASCADE`)
    })
    return Promise.all(promises)
  })
  it('can create a new poll entry', async function() {
    await newPoll(db, { title: 'New Poll' })
    const polls = await getPolls(db)
    assert.equal(polls.length, 1)
    assert.equal(polls[0].title, 'New Poll')
  })
  it('can delete a poll entry', async function() {
    await newPoll(db, { title: 'New Poll' })
    const polls = await getPolls(db)
    assert.equal(polls.length, 1)
    assert.equal(polls[0].title, 'New Poll')
  })
})
