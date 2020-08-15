import { ICommand } from 'ICommand'
import { PREFIX } from 'registry'
import { pattern } from '../utils'

export const COMMAND_HELP: ICommand = {
  name: 'help',
  pattern: pattern.build('help'),
  patternFriendly: 'help',
  description: 'displays the available commands.',
  handler: async (msg) => {
    if (msg.content.match(COMMAND_HELP.pattern)) {
      let result = ''

      msg.client['data'].commands.forEach((command: ICommand) => {
        if (!command.public) return
        result += '`' + PREFIX + command.patternFriendly + '`'
        result += ` - ${command.description}\n`
      })

      msg.channel.send(result)
    }
  },
}
