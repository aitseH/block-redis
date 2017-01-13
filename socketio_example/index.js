import express from 'express'
import socketio from 'socket.io'
import config from './config'
import socketioRedis from 'socket.io-redis'

const app = express()
const server = app.listen(2333)
const io = socketio(server)

app.use(express.static('static'))

io.adapter(socketioRedis({host: config.redis_host, port: config.redis_port}))
io.on('connection', socket => {
  socket.on('room:join', room => {
    console.log(socket.rooms)
    Object.keys(socket.rooms).filter(r => r!= socket.id).forEach(r => socket.leave(r))

    setTimeout(() => {
      socket.join(room)
      socket.emit('event', `Joined room ${room}`)
      socket.broadcast.to(room).emit('event', `Someone joined room ${room}`)
    }, 0)
  })

  socket.on('event', e => {
    socket.broadcast.to(e.room).emit('event', `${e.name} says hello`)
  })
})



