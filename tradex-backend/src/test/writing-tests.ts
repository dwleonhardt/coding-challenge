import { loadConfig } from '../config'
import { allEntities } from '../schema'
import {
  deletePoll,
  getItemByPollId,
  getPollById,
  getPolls,
  initializeDatabase,
  newItem,
  newPoll,
  updateItem
} from '../db'
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
    const pollId = await newPoll(db, { title: 'New Poll' })
    await deletePoll(db, pollId)
    const poll = await getPollById(db, pollId)
    const items = await getItemByPollId(db, pollId)
    assert.equal(poll!.length, 0)
    assert.equal(items!.length, 0)
  })
  it('can create an item entry', async function() {
    const pollId = await newPoll(db, { title: 'Item Poll' })
    await newItem(db, { pollId, name: 'test item' })
    const items = await getItemByPollId(db, pollId)
    assert.equal(items![0].name, 'test item')
  })
  it('can update an item vote', async function() {
    const pollId = await newPoll(db, { title: 'Chicken or Beef?' })
    await newItem(db, { pollId, name: 'Chicken' })
    const itemsBefore = await getItemByPollId(db, pollId)
    const test = await updateItem(db, itemsBefore![0].item, { votes: 1 })
    const itemsAfter = await getItemByPollId(db, pollId)
    assert.equal(itemsAfter![0].votes, 1)
  })
})
