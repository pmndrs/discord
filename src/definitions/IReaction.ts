import * as Discord from 'discord.js'

export interface IReaction {
  name: string
  handler: (
    client: Discord.Client
  ) => (reaction: Discord.MessageReaction, user: Discord.User | Discord.PartialUser) => Promise<any>
}
