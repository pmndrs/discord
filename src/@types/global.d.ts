import { ICommand } from '../ICommand'
import { IWatcher } from '../IWatcher'
import { IReaction } from '../IReaction'

declare module 'discord.js' {
  export interface Client {
    data: { commands: ICommand[]; watchers: IWatcher[]; reactionsAdd: IReaction[]; reactionsRemove: IReaction[] }
  }
}
