import { startApi } from '../server'

async function main() {
  try {
    /* tslint:disable-next-line */
    console.log('Starting server')
    await startApi()
  } catch (e) {
    /* tslint:disable-next-line */
    console.log(`Error starting server: ${e.stack}`)
  }
}

main()
