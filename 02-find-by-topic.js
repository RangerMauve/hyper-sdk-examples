import { create } from 'hyper-sdk'

console.log('Loading')
const sdk = await create({
  storage: false
})

console.log(sdk.publicKey.toString('hex'))

process.on('SIGTERM', () => {
  console.log('Terminating')
  sdk.close()
})

sdk.on('peer-add', (peerInfo) => {
  console.log('connected', peerInfo.publicKey.toString('hex'))
})
sdk.on('peer-remove', (peerInfo) => {
  console.log('disconnected', peerInfo.publicKey.toString('hex'))
})

console.log('Joining')
await sdk.join('hyper sdk examples')
console.log('Waiting for peers')
