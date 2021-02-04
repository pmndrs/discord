import * as uuid from 'uuid'
import { Redis } from 'ioredis'
import { UID_SCOPES, UID_SCOPES_SHORT } from './scopes'

export const get = async <T = any>(
  client: Redis,
  key: string,
  { raw = false }: { raw: boolean } = { raw: false }
): Promise<T> => {
  const data = await client.get(key)
  return raw ? data : JSON.parse(data)
}

export const getAll = async <T = any>(client: Redis, prefix, predicate?: (key: string) => boolean): Promise<T[]> =>
  await Promise.all(
    (await client.keys(`${prefix}:*`)).reduce((acc, key) => {
      if (predicate && !predicate(key)) return acc
      acc.push(get(client, key))
      return acc
    }, [] as any)
  )

export const set = async <T = any>(client: Redis, key: string, value: T): Promise<string> =>
  await client.set(key, JSON.stringify(value))

export const generateUid = async (client: Redis, prefix = ''): Promise<string> => {
  const uid = uuid.v4()

  let key = uid
  if (prefix) key = `${prefix}:${key}`

  const duplicate = await get(client, key, { raw: true })

  if (duplicate) return await generateUid(client, prefix)
  return uid
}

export const resetUidIncrement = async (client: Redis, scope: UID_SCOPES) => {
  const meta = (await get(client, `meta:${scope}`)) || { uid: 0 }
  meta.uid = 0
  await set(client, `meta:${scope}`, meta)
}

export const nextUid = async (client: Redis, scope: UID_SCOPES) => {
  const meta = (await get(client, `meta:${scope}`)) || { uid: 0 }
  const prev = meta.uid
  let newUid = 1
  if (prev) newUid = prev + 1
  meta.uid = newUid

  await set(client, `meta:${scope}`, meta)
  return `${UID_SCOPES_SHORT[scope]}${newUid}`
}
