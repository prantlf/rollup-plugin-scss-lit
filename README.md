# rollup-plugin-scss-lit

[![Latest version](https://img.shields.io/npm/v/rollup-plugin-scss-lit)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/rollup-plugin-scss-lit)
](https://www.npmjs.com/package/rollup-plugin-scss-lit)
[![Coverage](https://codecov.io/gh/prantlf/rollup-plugin-scss-lit/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/rollup-plugin-scss-lit)

[Rollup] plugin for importing [Sass] sources as constructable stylesheets to projects using [lit] ([lit-html] and [lit-element]) or [fast-element].

Faster than the combination of [rollup-plugin-styles] and [rollup-plugin-lit-css]. Uses the standard [options] of the Sass compiler. Supports minifying by [cssnano] or fully customisable transformations of the CSS output by [PostCSS].

## Synopsis

Custom element:

```js
import { LitElement } from 'lit';
import styles from './styles.scss'

class MyElement extends LitElement {
  static styles = styles
  // the rest of the implementation
}
```

Build configuration:

```js
import { litScss } from 'rollup-plugin-scss-lit'

export default {
  plugins: [
    litScss({ minify: process.env.NODE_ENV === 'production' })
  ]
  // the rest of the configuration
}
```

## Installation

Make sure that you use [Node.js] 14 or newer and [Rollup] 2 or newer. Use your favourite package manager - [NPM], [PNPM] or [Yarn]:

```sh
npm i -D rollup-plugin-scss-lit
pnpm i -D rollup-plugin-scss-lit
yarn add -D rollup-plugin-scss-lit
```

## Usage

Create a `rollup.config.js` [configuration file] and import the plugin:

```js
import { litScss } from 'rollup-plugin-scss-lit'

export default {
  input: 'src/index.js',
  output: { file: 'dist/main.js', format: 'iife', sourcemap: true },
  plugins: [
    litScss({
      minify: process.env.NODE_ENV === 'production',
      options: { loadPaths: ['node_modules'] }
    })
  ]
}
```

Then call `rollup` either via the [command-line] or [programmatically].

## Options

The following options can be passed in an object to the plugin function to change the default values.

### `include`

Type: `Array<String>`<br>
Default: `['**/*.scss']`

[Pattern] to match files which will be processed by the plugin.

### `exclude`

Type: `Array<String>`<br>
Default: `[]`

[Pattern] to match files which will be ignored by the plugin.

### `options`

Type: `Object`<br>
Default: `undefined`

Options for the Sass compiler. Use any [options] supported by the [compileString] method from the Sass package.

### `minify`

Type: `Boolean | Object`<br>
Default: `false`

Enables minifying of the compiled CSS output. If an object is specified, it will be passed to the [cssnano] plugin.

### `plugins`

Type: `Array<Object>`<br>
Default: `undefined`

An array of [PostCSS] plugins to fully customise the transformation of the compiled CSS output.

### `tag`

Type: `String`<br>
Default: `'css'`

The tag used for the tagged template literal exported from the generated module. Use `'css'` (default) with both `lit-html` and `fast-element`.

```js
export default css`...`
```

### `specifier`

Type: `String`<br>
Default: `'lit'`

The import specifier used in the imnport declaration of the tag above. Use `'lit'` (default) with `lit-html` and `'@microsoft/fast-element'` with `fast-element`.

```js
import { css } from 'lit'
```

```js
import { css } from '@microsoft/fast-element'
```

## How It Works

Let us have a stylesheet called `src/styles.scss`:

```scss
:host { display: block }
```

And import it for a custom element in `src/index.js`:

```js
import { LitElement } from 'lit';
import styles from './styles.scss'

class MyElement extends LitElement {
  static styles = styles
  // the rest of the implementation
}
```

The stylesheet will be converted to the following script on-the-fly during the build and bundled into `dist/browser.js`:

```js
import { css } from 'lit'
export default css`:host { display: block }`
```

### Optimisation

Before converting to the tagged template literal, the CSS output can be optimised by [PostCSS]. The minifying is performed by the [cssnano] plugin. If an error occurs during the transformation, the whole bundling operation will fail, using the [postcss-fail-on-warn] plugin.

Passing a boolean to the `litScss` plugin - `{ minify: true }` - will use the defaults. You can override them by passing an object with [options for cssnano] to `minify` instead of `true`:

```js
{
  minify: {
    preset: ['default', { discardComments: { removeAll: true } }]
  }
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (C) 2022 Ferdinand Prantl

Licensed under the [MIT License].

[MIT License]: http://en.wikipedia.org/wiki/MIT_License
[Rollup]: https://rollupjs.org/
[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[configuration file]: https://www.rollupjs.org/guide/en/#configuration-files
[command-line]: https://www.rollupjs.org/guide/en/#command-line-reference
[programmatically]: https://www.rollupjs.org/guide/en/#javascript-api
[Pattern]: https://www.linuxjournal.com/content/bash-extended-globbing
[PostCSS]: https://postcss.org/
[Sass]: https://sass-lang.com/documentation/js-api
[cssnano]: https://cssnano.co/
[postcss-fail-on-warn]: https://www.npmjs.com/package/postcss-fail-on-warn
[options supported by PostCSS for source maps]: https://postcss.org/api/#sourcemapoptions
[options for cssnano]: https://cssnano.co/docs/config-file/
[compileString]: https://sass-lang.com/documentation/js-api/modules#compileString
[options]: https://sass-lang.com/documentation/js-api/modules#StringOptions
[lit]: https://lit.dev/
[lit-html]: https://lit.dev/docs/components/styles/
[lit-element]: https://lit.dev/docs/api/LitElement/
[fast-element]: https://www.fast.design/docs/fast-element/leveraging-css/
[rollup-plugin-styles]: https://www.npmjs.com/package/rollup-plugin-styles
[rollup-plugin-lit-css]: https://www.npmjs.com/package/rollup-plugin-lit-css
