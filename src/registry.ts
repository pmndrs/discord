export const CHANNELS = {
  WELCOME: process.env.BOT_CHANNEL_WELCOME,
}

export const ROLES = {
  HELPER: process.env.BOT_ROLE_HELPER,
  NOT_VERIFIED: process.env.BOT_ROLE_NOT_VERIFIED,
  HELPERS: {
    'react-spring': process.env.BOT_ROLE_REACT_SPRING,
    'react-three-fiber': process.env.BOT_ROLE_REACT_THREE_FIBER,
    'react-postprocessing': process.env.BOT_ROLE_REACT_POSTPROCESSING,
    drei: process.env.BOT_ROLE_DREI,
    zustand: process.env.BOT_ROLE_ZUSTAND,
    'use-cannon': process.env.BOT_ROLE_USE_CANNON,
    gltfjsx: process.env.BOT_ROLE_GLTFJSX,
    ccapture: process.env.BOT_ROLE_CCAPTURE,
  },
}

export const COMMAND_PREFIX = process.env.BOT_PREFIX

export const EMOJI = {
  SUCCESS: '✅',
  FAIL: '❌',
  SIGN: '📝',
}
