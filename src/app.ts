/* tslint:disable:no-console */
import 'isomorphic-fetch'

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as http from 'http'
import * as pkg from '../package.json'
import * as Discord from 'discord.js'
import { ICommand } from './ICommand'
import { IWatcher } from './IWatcher'
import * as HELP_COMMANDS from 'help/commands'
import * as USER_COMMANDS from './user/commands'
import { COMMAND_PREFIX } from 'registry'
import { EMOJI } from './registry'

const port = process.env.PORT || 7000

export const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', cors())

const httpServer = http.createServer(app)

httpServer.listen(port, () => {
  console.log(`${pkg.name} running in ${process.env.NODE_ENV} mode on port ${port}.`)
})

const bot = new Discord.Client()

bot.data = { commands: [], watchers: [] }

bot.on('ready', () => {
  console.log(`Discord Bot running as ${bot.user.tag}`)

  // register commands
  registerCommand(HELP_COMMANDS.COMMAND_HELP)
  registerCommand(USER_COMMANDS.COMMAND_ROLES)
  registerCommand(USER_COMMANDS.COMMAND_ROLE_ADD)
  registerCommand(USER_COMMANDS.COMMAND_ROLE_REMOVE)

  // register watchers
  // registerWatcher(WATCHER_ONLINE_USERS);

  // invoke watchers
  bot.data.watchers.forEach((watcher) => watcher.handler(bot)())
})

bot.on('message', (msg) => {
  bot.data.commands.forEach(async (command) => {
    try {
      await command.handler(msg)
    } catch (e) {
      msg.react(EMOJI.FAIL)
    }
  })
})

export const registerCommand = (command: ICommand) => {
  bot.data.commands.push(command)
  console.log(`[REGISTERED - COMMAND] ${COMMAND_PREFIX}${command.name}`)
}

export const registerWatcher = (watcher: IWatcher) => {
  bot.data.watchers.push(watcher)
  console.log(`[REGISTERED - WATCHER] ${watcher.name}`)
}

bot.login(process.env.BOT_TOKEN)

export default httpServer
