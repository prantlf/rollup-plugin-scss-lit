import { builtinModules } from 'node:module'

export default {
  input: 'lib/index.js',
  output: { file: 'lib/index.cjs', format: 'cjs', sourcemap: true },
  external: [
    ...builtinModules, '@rollup/pluginutils', 'cssnano', 'node:path',
    'node:url', 'postcss', 'postcss-fail-on-warn', 'postcss-import-url',
    'rollup-copy-transform-css', 'sass'
  ]
}
