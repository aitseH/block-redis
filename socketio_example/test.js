import config from './config'
import socketioEmmiter from 'socket.io-emitter'

const io = socketioEmmiter({host: config.redis_host, port: config.redis_port})

io.to(process.argv[2]).emit('event', process.argv[3])
setTimeout(() => {process.exit(0)}, 1000)