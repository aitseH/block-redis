import express from 'express'
import config from './config'
import redis from 'redis'

const app = express()

const redisClient = redis.createClient(config.redis_port, config.redis_host)

// redisClient.set("REDIS_KEY", '0')

app.get('/', (req,res) => {
  redisClient.incr("REDIS_KEY")
  redisClient.get("REDIS_KEY", (err, reply) => {
    res.send(`
    <html>
      <head>
        <title>Page</title>
      <head>
      <body>
        <h1>Our Redis and Express Web Application</h1>
        Redis count: ${reply}
      </body>
    </html>
    `)
    res.end()
  })
})

app.listen(process.argv[2])
