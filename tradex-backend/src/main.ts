import * as express from 'express'
const app: express.Application = express()
const port: number = 3000
import * as dotenv from 'dotenv'

app.get('/', (res: any) => {
  res.send('Test')
})

app.listen(port, () => {
  dotenv.config()
  console.log(`App listening http://localhost:${port}`)
})
