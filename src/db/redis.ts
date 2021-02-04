import Redis, { RedisOptions } from 'ioredis'

const options = (override: RedisOptions = {}) => ({ ...override })

export const DiscordDB = new Redis(process.env.REDIS_CONNECTION_URL, options({ connectionName: 'DiscordDB' }))
