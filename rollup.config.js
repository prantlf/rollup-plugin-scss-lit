import builtins from 'builtin-modules/static.js'

export default {
  input: 'lib/index.js',
  output: { file: 'lib/index.cjs', format: 'cjs', sourcemap: true },
  external: [
    ...builtins, '@rollup/pluginutils', 'cssnano', 'fs/promises', 'postcss',
    'postcss-fail-on-warn', 'postcss-import-url', 'rollup-copy-transform-css',
    'sass'
  ]
}
