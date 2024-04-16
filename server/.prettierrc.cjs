module.exports = {
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'none',
  semi: false,
  singleQuote: true,
  importOrder: [
    '^hono$',
    '^hono/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
    '//src/$',
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
