import { IWatcher } from 'definitions/IWatcher'

export const WATCHER_UNFORMATTED_CODE: IWatcher = {
  name: 'unformatted code',
  handler: (client) => async () => {
    client.on('message', (msg) => {
      // escape early if codeblock already has an id.
      if (msg.author.bot || !/```\n/.test(msg.content)) return
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
    })
  },
}
