import { create } from 'hyper-sdk'

console.log('Loading')
const sdk = await create({
  storage: false
})

process.on('SIGTERM', () => {
  console.log('Terminating')
  sdk.close()
})

console.log('Initializing structures')

// Append only log
const core = await sdk.get('my core')

console.log('core', core.url)

// File storage
const drive = await sdk.getDrive('my drive')

console.log('drive', drive.url)

// Key-value store DB
const bee = await sdk.getBee('my db')

console.log('bee', bee.url)

console.log('Shutting down')
await sdk.close()
console.log('Done!')
