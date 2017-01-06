import express from 'express'
import config from './config'
import redis from './redis'

const app = express()

redis.client.flushall()
redis.client.hmset('meme:9', ['mean','baka', 'origin','touhou'])
redis.client.hmset('meme:213', ['mean','baka', 'origin', 'web'])
redis.client.hmset('meme:2333', ['mean','lol', 'origin', 'game'])
redis.client.hmset('meme:1024', ['mean','楼主好人一生平安', 'origin', '1024'])

redis.client.set('meme:origin:touhou', 'meme:9')
redis.client.set('meme:origin:web', 'meme:213')
redis.client.set('meme:origin:game', 'meme:2333')
redis.client.set('meme:origin:1024', 'meme:1024')

redis.client.lpush('meme:mean:baka', ['meme:213', 'meme:9'])

app.use((req, res, next) => {
  console.time("request")
  next()
})

app.get('/meme/origin/:origin', (req, res) => {

  redis.get(`meme:origin:${req.params.origin}`)
    .then(redis.hgetall)
    .then(data => res.send(data))
    console.timeEnd('request')
})

app.get('/meme/number/:number', (req, res) => {

  redis.hgetall(`meme:${req.params.number}`)
    .then(data => res.send(data))
    console.timeEnd('request')
})

app.get('/meme/mean/:mean', (req,res) => {
  
  redis.lrange(`meme:mean:${req.params.mean}`)
    .then(data => Promise.all(data.map(redis.hgetall)))
    .then(data => res.send(data))
    console.timeEnd('request')
})

app.listen(process.argv[2])
