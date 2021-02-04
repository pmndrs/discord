import { COMMAND_PREFIX } from 'registry'
import * as Discord from 'discord.js'

export const pattern = {
  build: (base, options: { args?: string; flags?: string } = {}) => {
    const { args, flags = 'm' } = options
    let pattern = `^${COMMAND_PREFIX}${base}\\b`
    if (args) pattern += ` ${args}\\b`
    return new RegExp(pattern, flags)
  },
}

export const getGuild = (client: Discord.Client) => client.guilds.cache.get(process.env.BOT_GUILD_ID)

export const getMemberByUserId = (client: Discord.Client, userId) => {
  const guild = getGuild(client)
  const member = guild.members.cache.get(userId)
  return member
}

export const toPascalCase = (s: string) =>
  s
    ? s
        .split('_')
        .join(' ')
        .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    : s
