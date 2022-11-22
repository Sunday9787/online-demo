/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    ipcRenderer: 'readable',
    __env: 'readable',
    __bl: 'readable'
  },
  extends: ['plugin:vue/essential', '@vue/eslint-config-standard', '@vue/eslint-config-prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': ['warn', 'never', { json: 'always', vue: 'always' }],
    camelcase: ['off']
  }
}
