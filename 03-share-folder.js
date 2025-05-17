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

// File storage
const drive = await sdk.getDrive('my drive')

// Get a folder from the CLI arguments
const where = join(
  process.cwd(),
  process.argv[2] || './'
)
// USe mirror drive to save to our hyperdrive from the folder

const dst = drive
const src = new Localdrive(where)

console.log('Mirroring from', where, 'to', drive.url)
const mirror = new MirrorDrive(src, dst)
await mirror.done()
console.log('uploaded')

qrcode.generate(drive.url
)

// Print when we're done mirroring
// Generate a QR code of the URL
