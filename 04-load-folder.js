import MirrorDrive from 'mirror-drive'
import Localdrive from 'localdrive'
import { create } from 'hyper-sdk'
import { join } from 'node:path'
import qrcode from 'qrcode-terminal'

console.log('Loading')
const sdk = await create({
  storage: false
})

process.on('SIGTERM', () => {
  console.log('Terminating')
  sdk.close()
})

console.log('Initializing structures')

// Get a folder from the CLI arguments
const where = join(
  process.cwd(),
  process.argv[2] || './'
)

const fromURL = process.argv[3]
if (!fromURL || !fromURL.startsWith('hyper://')) throw new Error('Must specify hyperdrive URL')
// USe mirror drive to save to our hyperdrive from the folder

const drive = await sdk.getDrive(fromURL)

const src = drive
const dst = new Localdrive(where)

console.log('Mirroring from', drive.url, 'to', where)
const mirror = new MirrorDrive(src, dst)
await mirror.done()
console.log('downloaded')

// Print when we're done mirroring
// Generate a QR code of the URL
