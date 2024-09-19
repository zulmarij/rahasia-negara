const globals = require('globals');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' }
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier
];
