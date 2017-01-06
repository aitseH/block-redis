import config from './config'
import redis from 'redis'

const client = redis.createClient(config.redis_port, config.redis_host)

const get = key => new Promise((resolve, reject) => {
  client.get(key, (err, data) => {
    if(err) reject(err)
    resolve(data)
  })
})

const hgetall = key => new Promise((resolve, reject) => {
  if(key === null) reject()
  client.hgetall(key, (err, data) => {
    if(err) reject(err)
    resolve(data)
  })
})

const lrange = key => new Promise((resolve, reject) => {
  client.lrange(key, [0, -1], (err, data) => {
    if(err) reject(err)
    resolve(data)
  })
})

export default {
  client,
  get,
  hgetall,
  lrange
}