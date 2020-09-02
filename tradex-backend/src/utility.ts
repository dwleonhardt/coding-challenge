import * as path from 'path'
import * as express from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError} from 'class-validator'

const uuidv4 = require('uuid/v4')

export const newUuid: () => string = uuidv4

export function loadDotEnv() {
  return require('dotenv').config({ path: path.resolve(__dirname, '../.env') }).parsed
}

export function validateBody<T>(type: any): express.RequestHandler {
  return async (req, res, next) => {
    const errors = await validate(plainToClass(type, req.body))
    if (errors.length) {
      const message = errors.map((e: ValidationError) => Object.values(e.constraints)).join(', ')
      next(message)
    } else {
      next()
    }
  }
}
