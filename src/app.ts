/* tslint:disable:no-console */
import * as http from 'http'
import * as Discord from 'discord.js'
import * as chalk from 'chalk'
import { COMMAND_PREFIX, EMOJI, ROLES } from 'registry'
import { ICommand } from 'definitions/ICommand'
import { IWatcher } from 'definitions/IWatcher'
import { IReaction } from 'definitions/IReaction'
import * as HELP_COMMANDS from 'help/commands'
import * as USER_COMMANDS from 'user/commands'
import * as USER_REACTIONS from 'user/reactions'
import { keepAlive } from './keepAlive'

const port = process.env.PORT || 7000

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

client.data = { commands: [], watchers: [], reactionsAdd: [], reactionsRemove: [] }

client.once('ready', () => {
  console.log(
    `${chalk.blueBright(`[PORT ${port}] ${process.env.NODE_ENV} ➡️`)} ${chalk.bold.cyanBright(
      `Discord Bot running as ${client.user.tag}`
    )}`
  )

  client.user.setActivity({
    type: 'LISTENING',
    name: `${COMMAND_PREFIX}${HELP_COMMANDS.COMMAND_HELP.patternFriendly}`,
  })

  // register commands
  registerCommand(HELP_COMMANDS.COMMAND_HELP)
  registerCommand(USER_COMMANDS.COMMAND_ROLES)
  registerCommand(USER_COMMANDS.COMMAND_ROLE_ADD)
  registerCommand(USER_COMMANDS.COMMAND_ROLE_REMOVE)

  // register watchers
  // registerWatcher(WATCHER_ONLINE_USERS);

  // register reactions
  registerReactionAdd(USER_REACTIONS.REACTION_ADD_SIGN)
  registerReactionRemove(USER_REACTIONS.REACTION_REMOVE_UNSIGN)

  // invoke watchers
  client.data.watchers.forEach((w) => w.handler(client)())
})

client.on('message', async (msg) => {
  if (!msg.content.startsWith(COMMAND_PREFIX) || msg.author.bot) return

  try {
    await Promise.all(client.data.commands.map(async (c) => await c.handler(msg)))
  } catch (e) {
    msg.react(EMOJI.FAIL)
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return

  try {
    await Promise.all(client.data.reactionsAdd.map(async (r) => await r.handler(client)(reaction, user)))
  } catch (e) {
    console.log(chalk.redBright('There was an error'))
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return

  try {
    await Promise.all(client.data.reactionsRemove.map(async (r) => await r.handler(client)(reaction, user)))
  } catch (e) {
    console.log(chalk.redBright('There was an error'))
  }
})

client.on('guildMemberAdd', (member) => {
  try {
    // ensure that new members sign the rule book
    member.roles.add(ROLES.NOT_VERIFIED)
  } catch (e) {
    console.log(chalk.redBright('There was an error'))
  }
})

export const registerCommand = (command: ICommand) => {
  client.data.commands.push(command)
  console.log(`${chalk.blueBright('➕ COMMAND ➡️')} ${chalk.yellowBright(`${COMMAND_PREFIX}${command.name}`)}`)
}

export const registerWatcher = (watcher: IWatcher) => {
  client.data.watchers.push(watcher)
  console.log(`${chalk.blueBright('➕ WATCHER ➡️')} ${chalk.yellowBright(watcher.name)}`)
}

export const registerReactionAdd = (reaction: IReaction) => {
  client.data.reactionsAdd.push(reaction)
  console.log(`${chalk.blueBright('➕ REACTION_ADD ➡️')} ${chalk.yellowBright(reaction.name)}`)
}

export const registerReactionRemove = (reaction: IReaction) => {
  client.data.reactionsRemove.push(reaction)
  console.log(`${chalk.blueBright('➕ REACTION_REMOVE ➡️')} ${chalk.yellowBright(reaction.name)}`)
}

// must listen on a PORT for heroku to not crash
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('ok')
})

httpServer.listen(port, () => {
  client.login(process.env.BOT_TOKEN)
  keepAlive(process.env.SERVER_URL)
})
