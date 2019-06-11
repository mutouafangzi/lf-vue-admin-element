// https://eslint.org/docs/user-guide/configuring
const rules = require('./rules');

module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true,
    'amd': false,
    'mocha': false,
    'jasmine': false
  },

  'parserOptions': {
    ecmaVersion: 6,
    sourceType: 'module',
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    }
  },
  rules: rules
}
