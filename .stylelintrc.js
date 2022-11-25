/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier'
  ],
  rules: {
    'scss/no-global-function-names': null,
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': [/^\$-{2}/, { ignore: 'global' }]
  }
}
