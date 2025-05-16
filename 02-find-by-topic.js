import { create } from 'hyper-sdk'

console.log('Loading')
const sdk = await create({
  storage: false
})

process.on('SIGTERM', () => {
  console.log('Terminating')
  sdk.close()
})

sdk.on('peer-add', (peerInfo) => {
  console.log('connected', peerInfo.publicKey)
})
sdk.on('peer-remove', (peerInfo) => {
  console.log('disconnected', peerInfo.publicKey)
})

console.log('Joining')
await sdk.join('hyper sdk examples')
console.log('Waiting for peers')
