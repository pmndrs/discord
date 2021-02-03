export const CHANNELS = {
  WELCOME: process.env.BOT_CHANNEL_WELCOME,
}

export const ROLES_HELPERS_GENERAL = {
  javascript: process.env.BOT_ROLE_JAVASCRIPT,
  typescript: process.env.BOT_ROLE_TYPESCRIPT,
  react: process.env.BOT_ROLE_REACT,
  css: process.env.BOT_ROLE_CSS,
}

export const ROLES_HELPERS_LIBRARIES = {
  'react-spring': process.env.BOT_ROLE_REACT_SPRING,
  'react-use-gesture': process.env.BOT_ROLE_REACT_USE_GESTURE,
  'use-tweaks': process.env.BOT_ROLE_USE_TWEAKS,
  leva: process.env.BOT_ROLE_LEVA,
  zustand: process.env.BOT_ROLE_ZUSTAND,
  jotai: process.env.BOT_ROLE_JOTAI,
  valtio: process.env.BOT_ROLE_VALTIO,
}

export const ROLES_HELPERS_LIBRARIES_3D = {
  'react-three-fiber': process.env.BOT_ROLE_REACT_THREE_FIBER,
  'react-three-gltfjsx': process.env.BOT_ROLE_REACT_THREE_GLTFJSX,
  'react-three-drei': process.env.BOT_ROLE_REACT_THREE_DREI,
  'react-three-postprocessing': process.env.BOT_ROLE_REACT_THREE_POSTPROCESSING,
  'react-three-flex': process.env.BOT_ROLE_REACT_THREE_FLEX,
  'react-three-xr': process.env.BOT_ROLE_REACT_THREE_XR,
  'react-three-next': process.env.BOT_ROLE_REACT_THREE_NEXT,
  'react-three-a11y': process.env.BOT_ROLE_REACT_THREE_A11Y,
  'react-three-cannon': process.env.BOT_ROLE_REACT_THREE_CANNON,
  'cannon-es': process.env.BOT_ROLE_CANNON_ES,
  'three-material-editor': process.env.BOT_ROLE_THREE_MATERIAL_EDITOR,
  'component-material': process.env.BOT_ROLE_COMPONENT_MATERIAL,
}

export const ROLES = {
  HELPER: process.env.BOT_ROLE_HELPER,
  HELPERS: {
    ...ROLES_HELPERS_GENERAL,
    ...ROLES_HELPERS_LIBRARIES,
    ...ROLES_HELPERS_LIBRARIES_3D,
  },
}

export const COMMAND_PREFIX = process.env.BOT_PREFIX

export const EMOJI = {
  SUCCESS: '✅',
  FAIL: '❌',
  SIGN: '📝',
}
