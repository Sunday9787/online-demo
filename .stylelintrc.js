/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order'
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'scss/no-global-function-names': null
  }
}
