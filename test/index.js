import { ok, fail, strictEqual } from 'assert'
import { fileURLToPath } from 'url'
import { rollup } from 'rollup'
import tehanu from 'tehanu'
import { litScss } from '../lib/index.js'

const test = tehanu(fileURLToPath(import.meta.url))

test('does not minify by default', async () => {
  const bundle = await rollup({
    input: 'test/controls.scss',
    plugins: [litScss()],
    external: 'lit'
  })
  const { output } = await bundle.generate({});
  const { code } = output[0]
  strictEqual(code, `import { css } from 'lit';

var controls = css\`.control {
  display: flex;
}\`;

export { controls as default };
`)
})

test('minifies', async () => {
  const bundle = await rollup({
    input: 'test/flex-body.scss',
    plugins: [litScss({
      minify: true,
      options: { loadPaths: ['test'] }
    })],
    external: 'lit'
  })
  const { output } = await bundle.generate({});
  const { code } = output[0]
  strictEqual(code, `import { css } from 'lit';

var flexBody = css\`.control,body{display:flex}\`;

export { flexBody as default };
`)
})

test('minifies with exbuild', async () => {
  const bundle = await rollup({
    input: 'test/flex-body.scss',
    plugins: [litScss({
      minify: { fast: true },
      options: { loadPaths: ['test'] }
    })],
    external: 'lit'
  })
  const { output } = await bundle.generate({});
  const { code } = output[0]
  strictEqual(code, `import { css } from 'lit';

var flexBody = css\`.control,body{display:flex}
\`;

export { flexBody as default };
`)
})

test('handles broken input', async () => {
  try {
    await rollup({
      input: 'test/broken.txt',
      plugins: [litScss({ include: ['**/*.txt'] })],
      external: 'lit'
    })
    fail('processed broken input')
  } catch ({ message }) {
    ok(message.startsWith('expected "}".'))
  }
})
