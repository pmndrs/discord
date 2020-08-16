import * as Discord from 'discord.js'

export interface ICommand {
  name: string
  pattern: RegExp
  patternFriendly: string
  public?: boolean
  description?: string
  handler: (msg: Discord.Message | Discord.PartialMessage) => Promise<any>
}
