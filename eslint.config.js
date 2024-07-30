const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    languageOptions: { sourceType: 'commonjs' }
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier
];
