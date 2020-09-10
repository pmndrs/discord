import { ICommand } from 'definitions/ICommand'
import { EMOJI, ROLES, COMMAND_PREFIX } from 'registry'
import { Message, PartialMessage } from 'discord.js'
import { pattern } from 'utils'
import { ROLES_HELPERS_GENERAL, ROLES_HELPERS_LIBRARIES, ROLES_HELPERS_LIBRARIES_3D } from '../registry'

export const COMMAND_ROLES: ICommand = {
  name: 'roles',
  pattern: pattern.build('roles'),
  patternFriendly: 'roles',
  public: true,
  description: 'displays available roles',
  handler: async (msg) => {
    const match = COMMAND_ROLES.pattern.exec(msg.content)
    if (!match) return

    let result = ''
    result += '```bash\n'
    result += `${COMMAND_PREFIX}${COMMAND_ROLE_ADD.patternFriendly}\n`

    result += '\n# General:\n'
    Object.keys(ROLES_HELPERS_GENERAL).forEach((role: string, i) => {
      if (i) result += `, `
      result += role
    })

    result += '\n\n# Libraries:\n'
    Object.keys(ROLES_HELPERS_LIBRARIES).forEach((role: string, i) => {
      if (i) result += `, `
      result += role
    })

    result += '\n\n# Libraries (3D):\n'
    Object.keys(ROLES_HELPERS_LIBRARIES_3D).forEach((role: string, i) => {
      if (i) result += `, `
      result += role
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
    const roles = args.split(' ').map((string) => {
      const role = ROLES.HELPERS[string]
      if (!role) throw Error('Role is not available')
      return role
    })
    await msg.member.roles.add([...roles, ROLES.HELPER])
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
    const roles = args.split(' ').map((string) => {
      const role = ROLES.HELPERS[string]
      if (!role) throw Error('Role is not available')
      return role
    })
    await msg.member.roles.remove(roles)
    if (hasNoHelperRole(msg)) await msg.member.roles.remove(ROLES.HELPER)
    await msg.react(EMOJI.SUCCESS)
  },
}

const hasNoHelperRole = (msg: Message | PartialMessage) => {
  return !Object.values(ROLES.HELPERS).find((roleId) => msg.member.roles.cache.find((role) => role.id === roleId))
}
