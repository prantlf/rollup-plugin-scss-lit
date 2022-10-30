const { strictEqual } = require('assert')
const test = require('tehanu')(__filename)
const { litScss } = require('rollup-plugin-scss-lit')

test('exports', () => {
  strictEqual(typeof litScss, 'function')
})
