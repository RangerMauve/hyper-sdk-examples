import { create } from 'hyper-sdk'
import qrcode from 'qrcode-terminal'
import readline from 'readline/promises'

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Enter something: ', (input) => {
  console.log(`You entered: ${input}`)
  rl.close()
})

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

broadcastKnown()

function broadcastKnown () {
  const message = JSON.stringify([...knownCores.keys()])
  extension.broadcast(message)
}

function sendKnown (peer) {
  const message = JSON.stringify([...knownCores.keys()])
  extension.send(message, peer)
}

async function handleNew (core) {
  if (knownCores.has(core.url)) return
  console.log('new peer', core.url)
  knownCores.set(core.url, core)
  for await (const block of core.createReadStream({ live: true })) {
    rl.write(core.url.slice(8, 14) + ':' + block.toString('utf8') + '\n')
  }
}

while (true) {
  const message = await rl.question('>')
  await core.append(Buffer.from(message))
}
