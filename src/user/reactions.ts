import { IReaction } from 'definitions/IReaction'
import { getMemberByUserId } from 'utils'
import { EMOJI, CHANNELS, ROLES } from 'registry'

export const REACTION_ADD_SIGN: IReaction = {
  name: 'sign',
  handler: (client) => async (reaction, user) => {
    if (reaction.message.channel.id !== CHANNELS.WELCOME) return
    if (reaction.partial) await reaction.fetch()

    if (reaction.emoji.name === EMOJI.SIGN) {
      const member = getMemberByUserId(client, user.id)
      member.roles.remove(ROLES.NOT_VERIFIED)
    }
  },
}

export const REACTION_REMOVE_UNSIGN: IReaction = {
  name: 'unsign',
  handler: (client) => async (reaction, user) => {
    if (reaction.message.channel.id !== CHANNELS.WELCOME) return
    if (reaction.partial) await reaction.fetch()

    if (reaction.emoji.name === EMOJI.SIGN) {
      const member = getMemberByUserId(client, user.id)
      member.roles.add(ROLES.NOT_VERIFIED)
    }
  },
}
