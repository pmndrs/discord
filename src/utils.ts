import { COMMAND_PREFIX } from 'registry'

export const pattern = {
  build: (base, options: { args?: string; flags?: string } = {}) => {
    const { args, flags = 'gm' } = options
    let pattern = `^${COMMAND_PREFIX}${base}\\b`
    if (args) pattern += ` ${args}\\b`
    return new RegExp(pattern, flags)
  },
}
