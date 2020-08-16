import { ICommand } from '../ICommand'
import { IWatcher } from '../IWatcher'

declare module 'discord.js' {
  export interface Client {
    data: { commands: ICommand[]; watchers: IWatcher[] }
  }
}
