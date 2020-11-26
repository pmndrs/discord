import { IWatcher } from 'definitions/IWatcher'

const CODE_REGEX = /```\n/

export const WATCHER_UNFORMATTED_CODE: IWatcher = {
  name: 'unformatted code',
  handler: (client) => async () => {
    client.on('message', (msg) => {
      if (msg.author.bot || !CODE_REGEX.test(msg.content)) return

      msg.channel.send([
        '**TIP**: Discord supports syntax highlighting by decorating the first `` ``` `` of a code block with a language id (ts, js, jsx, css, html, bash).',
        '```',
        '`\u200b`\u200b`ts',
        '// input',
        'console.log(\'Hello World\')',
        '`\u200b`\u200b`',
        '```',
        '```ts',
        '// output',
        'console.log(\'Hello World\')',
        '```',
      ].join('\n'))
    })
  },
}
