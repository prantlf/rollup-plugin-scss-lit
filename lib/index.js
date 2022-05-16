import { createFilter } from '@rollup/pluginutils'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import sass from 'sass'
import { createProcessor } from 'rollup-copy-transform-css'
import cssToModule from './css-to-module.js'
import handleError from './error.js'

const { compileString : compileScss } = sass

export function litScss({
  include = ['**/*.scss'], exclude, minify, options, plugins,
  tag = 'css', specifier = 'lit'
} = {}) {
  const filter = createFilter(include, exclude)
  const processor = (minify || plugins) && createProcessor({ minify, plugins })

  return {
    name: 'lit-scss',

    load(id) {
      if (filter(id)) {
        this.addWatchFile(resolve(id))
      }
    },

    async transform(source, id) { // eslint-disable-line consistent-return
      if (filter(id)) {
        try {
          let { css, loadedUrls } = compileScss(source, options)
          for (const url of loadedUrls) {
            this.addWatchFile(fileURLToPath(url))
          }
          if (processor) {
            ({ css } = await processor.process(css, { from: id, map: false }))
          }
          return { code: cssToModule(css, tag, specifier), map: { mappings: '' } }
        } catch (err) {
          handleError.call(this, err)
        }
      }
    }
  }
}
