import * as Discord from 'discord.js'

export interface IWatcher {
  name: string
  description?: string
  handler: (bot: Discord.Client) => (pollingInterval?: number) => Promise<any>
}
