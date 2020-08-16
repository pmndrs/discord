import fetch from 'node-fetch'
import { EMOJI } from './registry'
import * as chalk from 'chalk'

export const keepAlive = async (
  url,
  interval = 20 * 60000 // 20 minutes
) => {
  try {
    await fetch(url).then((response) => {
      if (response.status >= 400) throw new Error()
      return response
    })
    console.log(chalk.greenBright(`${EMOJI.SUCCESS} Keep Alive`))
  } catch (e) {
    console.error(chalk.redBright(`${EMOJI.FAIL} Keep Alive`))
  }

  setTimeout(async () => await keepAlive(url, interval), interval)
}
