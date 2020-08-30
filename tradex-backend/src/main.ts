import * as express from 'express'
const app: express.Application = express()
const port: number = 3000

app.get('/', (res: any) => {
  res.send('Test')
})

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})