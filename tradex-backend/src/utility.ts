import * as path from 'path'

const uuidv4 = require('uuid/v4')

export const newUuid: () => string = uuidv4

export function loadDotEnv() {
  return require('dotenv').config({ path: path.resolve(__dirname, '../.env') }).parsed
}