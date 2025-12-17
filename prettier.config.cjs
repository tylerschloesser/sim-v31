module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  importOrder: ['^(?!.*\\.css$)[./]', '^@/', '\\.css$'],
  printWidth: 60,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
