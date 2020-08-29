export const CHANNELS = {
  WELCOME: process.env.BOT_CHANNEL_WELCOME,
}

export const ROLES = {
  HELPER: process.env.BOT_ROLE_HELPER,
  NOT_VERIFIED: process.env.BOT_ROLE_NOT_VERIFIED,
  HELPERS: {
    'react-spring': process.env.BOT_ROLE_REACT_SPRING,
    'use-gesture': process.env.BOT_ROLE_USE_GESTURE,
    zustand: process.env.BOT_ROLE_ZUSTAND,
    jotai: process.env.BOT_ROLE_JOTAI,
    'react-three-fiber': process.env.BOT_ROLE_REACT_THREE_FIBER,
    'react-three-flex': process.env.BOT_ROLE_REACT_THREE_FLEX,
    'react-postprocessing': process.env.BOT_ROLE_REACT_POSTPROCESSING,
    drei: process.env.BOT_ROLE_DREI,
    gltfjsx: process.env.BOT_ROLE_GLTFJSX,
    'use-cannon': process.env.BOT_ROLE_USE_CANNON,
    'use-capture': process.env.BOT_ROLE_USE_CAPTURE,
  },
}

export const COMMAND_PREFIX = process.env.BOT_PREFIX

export const EMOJI = {
  SUCCESS: '✅',
  FAIL: '❌',
  SIGN: '📝',
}
