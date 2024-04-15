module.exports = {
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  importOrder: ['^hono$', '^hono/(.*)$', '^[./]', '/\/src\/$'],
  plugins: ['@trivago/prettier-plugin-sort-imports']
}
