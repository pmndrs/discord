import { IWatcher } from 'definitions/IWatcher'

let codeTipCount = 0

export const WATCHER_UNFORMATTED_CODE: IWatcher = {
  name: 'unformatted code',
  handler: (client) => async () => {
    client.on('message', (msg) => {
      const codeblocks = msg.content.match(/```(.|\n)*?```/g)
      const invalidCode = codeblocks?.some((codeblock) => /```\n((.|\n)*?)```/g.test(codeblock))

      // escape early if codeblock already has an id.
      if (msg.author.bot || !invalidCode) return

      if (codeTipCount % 3 === 0) {
        let result = ''
        // eslint-disable-next-line prettier/prettier
        result += '**TIP**: Discord supports syntax highlighting by decorating the first **\\`\\`\\`** of a code block with a language id (ts, js, jsx, css, html, bash).\n'

        // eslint-disable-next-line prettier/prettier
        result += '\\`\\`\\`ts\n'
        result += '// input\n'
        result += `console.log('Hello World')\n`
        // eslint-disable-next-line prettier/prettier
        result += '\\`\\`\\`\n'

        result += '```ts\n'
        result += '// output\n'
        result += `console.log('Hello World')\n`
        result += '```\n'

        msg.channel.send(result)
      }

      codeTipCount++
    })
  },
}
