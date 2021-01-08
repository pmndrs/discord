import { IWatcher } from 'definitions/IWatcher'

let codeTipCount = 0

export const WATCHER_UNFORMATTED_CODE: IWatcher = {
  name: 'unformatted code',
  handler: (client) => async () => {
    client.on('message', async (msg) => {
      const codeblocks = msg.content.match(/```(.|\n)*?```/g)
      const invalidCode = codeblocks?.some((codeblock) => /```\n((.|\n)*?)```/g.test(codeblock))

      if (
        msg.author.bot ||
        // escape early if codeblock already has an id.
        !invalidCode ||
        // only display the tip every N times
        !!(codeTipCount++ % parseInt(process.env.TIP_FREQUENCY))
      ) {
        return
      }

      let result = ''
      // eslint-disable-next-line prettier/prettier
      result +=
        '**TIP**: Discord supports syntax highlighting. Decorate the first **\\`\\`\\`** of a code block with a language id (ts, js, jsx, css, html, bash).\n'

      // eslint-disable-next-line prettier/prettier
      result += '\\`\\`\\`ts\n'
      result += `console.log('input', 'Hello World')\n`
      // eslint-disable-next-line prettier/prettier
      result += '\\`\\`\\`\n'

      result += '```ts\n'
      result += `console.log('output', 'Hello World')\n`
      result += '```\n'

      const message = await msg.channel.send(result)

      const timeout = parseInt(process.env.TIP_DURATION)
      if (timeout) message.delete({ timeout })
    })
  },
}
