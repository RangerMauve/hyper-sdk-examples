import { create } from 'hyper-sdk'
import qrcode from 'qrcode-terminal'

console.log('Loading')
const sdk = await create({
  storage: './storage'
})

process.on('SIGTERM', () => {
  console.log('Terminating')
  sdk.close()
})

console.log('Initializing structures')

// Append only log
const core = await sdk.get('my core')
console.log('core', core.url)

const givenURL = process.argv[2]

let gossipCore = core
if (givenURL) {
  console.log('Connecting to existing swarm')
  gossipCore = await sdk.get(givenURL)
} else {
  console.log('Scan this URL to connect')
  console.log(core.url)
  qrcode.generate(core.url)
}

// Map URL to core instance
const knownCores = new Map()

knownCores.set(core.url, core)

const extension = gossipCore.registerExtension('gossip', {
  encoding: 'utf-8',
  onmessage: (message, peer) => {
    const urls = JSON.parse(message)
    let hasNew = false
    for (const url of urls) {
      if (knownCores.has(url)) continue
      hasNew = true
      sdk.get(url).then(handleNew)
    }
    if (hasNew) sendKnown(peer)
  }
})

gossipCore.on('peer-add', broadcastKnown)

function broadcastKnown (peer) {
  console.log('peer-add', peer)
  const message = JSON.stringify([...knownCores.keys()])
  extension.broadcast(message)
}

function sendKnown (peer) {
  const message = JSON.stringify([...knownCores.keys()])
  extension.send(message, peer)
}

async function handleNew (core) {
  console.log('new peer', core.url)
  knownCores.set(core.url, core)
  for (const block of core.createReadStream({ live: true })) {
    console.log(core.url.slice(7, 10), block.toString('utf8'))
  }
}
