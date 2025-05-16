# hyper-sdk-examples
Examples for using hyper-sdk to make p2p apps

## Prerequisits:

- [git](https://msysgit.github.io/index.old.html)
- [Node.js 23+](https://github.com/nvm-sh/nvm)
- Some command line knowledge
- Some knowledge of how web servers work
- A way to scan QR codes

## Resources

- [hyper-SDK](https://github.com/RangerMauve/hyper-sdk?tab=readme-ov-file#api)
- [hyperdrive](https://github.com/holepunchto/hyperdrive)
- [hyperbee](https://github.com/holepunchto/hyperbee)
- [hypercore](https://github.com/holepunchto/hypercore)
- [Node.js docs](https://nodejs.org/api/all.html)
- [QR Scanner](https://qrscanner.net/)

## Intro - Thinking in Peer To Peer

## Lessons

### Lesson 01 - Basics

- Initialize the hyper-sdk
- Create different data structures

### Lesson 02 - Find Peers By Topic

- Use human readable topics
- Listen on new encrypted connections
- Log peer connect / disconnect

### Lesson 03 - Share Folders

- Take a folder path and mirror it to a hyperdrive
- Print a QR code
- Log when peers are detected

### Lesson 04 - Load Folders

- Take a Hyperdrive URL as a CLI argument
- List files or output file to STDOUT

## Lesson 05 - Oplog Chat

- Repl to add messages to Hypercore
- Gossip Hypercores over extensions

### Lesson 06 - Database Indexes

- Pull IMDB CSV
- Insert into Hyperbee

### Lesson 07 - HTTP Gateways

## Exercise for the reader:

- Indexed chat (by date)
- Find peers over Hypercore extensions
- HTTP gateway to query hyperbee
- Archive HTTP pages into hyperdrive
- Tunnel TCP connections over extension messages
