/* tslint:disable:no-console */
import 'isomorphic-fetch'

import * as Discord from 'discord.js'
import * as chalk from 'chalk'
import { COMMAND_PREFIX, EMOJI, ROLES } from 'registry'
import { ICommand } from 'definitions/ICommand'
import { IWatcher } from 'definitions/IWatcher'
import { IReaction } from 'definitions/IReaction'
import * as HELP_COMMANDS from 'help/commands'
import * as USER_COMMANDS from 'user/commands'
import * as USER_REACTIONS from 'user/reactions'

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

client.data = { commands: [], watchers: [], reactionsAdd: [], reactionsRemove: [] }

client.once('ready', () => {
  console.log(chalk.bold.cyanBright(`Discord Bot running as ${client.user.tag}`))

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
  client.data.watchers.forEach((watcher) => watcher.handler(client)())
})

client.on('message', (msg) => {
  if (!msg.content.startsWith(COMMAND_PREFIX) || msg.author.bot) return

  client.data.commands.forEach(async (command) => {
    try {
      await command.handler(msg)
    } catch (e) {
      msg.react(EMOJI.FAIL)
    }
  })
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return

  client.data.reactionsAdd.forEach(async (reactionAdd) => {
    try {
      await reactionAdd.handler(client)(reaction, user)
    } catch (e) {
      console.log(chalk.redBright('There was an error'))
    }
  })
})

client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return

  client.data.reactionsRemove.forEach(async (reactionRemove) => {
    try {
      await reactionRemove.handler(client)(reaction, user)
    } catch (e) {
      console.log(chalk.redBright('There was an error'))
    }
  })
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

client.login(process.env.BOT_TOKEN)
