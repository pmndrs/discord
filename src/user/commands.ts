import { ICommand } from 'definitions/ICommand'
import { HELPER_ROLE_CATEGORY, IHelperRole } from 'definitions/IHelperRole'
import { EMOJI, COMMAND_PREFIX } from 'registry'
import { Message, PartialMessage } from 'discord.js'
import { pattern, toPascalCase } from 'utils'
import { getAll } from 'db/utils'
import { DiscordDB } from 'db/redis'
import { UID_SCOPES } from 'db/scopes'

export const COMMAND_ROLES: ICommand = {
  name: 'roles',
  pattern: pattern.build('roles'),
  patternFriendly: 'roles',
  public: true,
  description: 'displays available roles',
  handler: async (msg) => {
    const match = COMMAND_ROLES.pattern.exec(msg.content)
    if (!match) return

    const roles = await getAll<IHelperRole>(DiscordDB, UID_SCOPES.HELPER_ROLE)
    const filteredRoles = roles.reduce((acc, role) => {
      if (!acc[role.category]) acc[role.category] = []
      acc[role.category].push(role)
      return acc
    }, {} as { [key in HELPER_ROLE_CATEGORY]: IHelperRole[] })

    let result = ''
    result += '```bash\n'
    result += `${COMMAND_PREFIX}${COMMAND_ROLE_ADD.patternFriendly}`

    Object.keys(HELPER_ROLE_CATEGORY).forEach((category) => {
      if (!filteredRoles[category]) return
      result += `\n\n# ${toPascalCase(category)}:\n`
      filteredRoles[category].forEach((role, i) => {
        if (i) result += `, `
        result += role.name
      })
    })

    result += '```'

    msg.channel.send(result)
  },
}

export const COMMAND_ROLE_ADD: ICommand = {
  name: 'role add',
  pattern: pattern.build('role add', { args: '(.*)' }),
  patternFriendly: 'role add [ROLE(S)]',
  public: true,
  description: 'adds a role to the user',
  handler: async (msg) => {
    const match = COMMAND_ROLE_ADD.pattern.exec(msg.content)
    if (!match) return

    const args = (match[1] || '').toLowerCase()
    const roles = await getAll<IHelperRole>(DiscordDB, UID_SCOPES.HELPER_ROLE)
    const inputRoles = args.split(' ').map((string) => {
      const role = roles.find((role) => role.name === string)
      if (!role) throw Error('Role is not available')
      return role.uid
    })
    await msg.member.roles.add([...inputRoles, process.env.BOT_ROLE_HELPER])
    await msg.react(EMOJI.SUCCESS)
  },
}

export const COMMAND_ROLE_REMOVE: ICommand = {
  name: 'role remove',
  pattern: pattern.build('role remove', { args: '(.*)' }),
  patternFriendly: 'role remove [ROLE(S)]',
  public: true,
  description: 'removes a role from the user',
  handler: async (msg) => {
    const match = COMMAND_ROLE_REMOVE.pattern.exec(msg.content)
    if (!match) return

    const args = match[1]
    const roles = await getAll<IHelperRole>(DiscordDB, UID_SCOPES.HELPER_ROLE)
    const inputRoles = args.split(' ').map((string) => {
      const role = roles.find((role) => role.name === string)
      if (!role) throw Error('Role is not available')
      return role.uid
    })
    await msg.member.roles.remove(inputRoles)
    if (await hasNoHelperRole(msg)) await msg.member.roles.remove(process.env.BOT_ROLE_HELPER)
    await msg.react(EMOJI.SUCCESS)
  },
}

const hasNoHelperRole = async (msg: Message | PartialMessage) => {
  const roles = await getAll<IHelperRole>(DiscordDB, UID_SCOPES.HELPER_ROLE)
  return !roles.find((role) => msg.member.roles.cache.find((activeRole) => activeRole.id === role.uid))
}
