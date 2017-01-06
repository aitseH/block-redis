import express from 'express'
import config from './config'
import redis from 'redis'

const app = express()

const redisClient = redis.createClient(config.redis_port, config.redis_host)
const publishClient = redis.createClient(config.redis_port, config.redis_host)

redisClient.on("message", (channel, message) => {
  console.log(message)
})

redisClient.subscribe('REQUEST')

app.get('/', (req,res) => {
  publishClient.publish("REQUEST", `Request on ${req.socket.localPort} for ${req.url}`)
  console.log(`local log for ${req.url}`)
  res.end()
})

app.listen(process.argv[2])
