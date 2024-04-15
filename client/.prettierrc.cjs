module.exports = {
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'none',
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  importOrder: [
    '^react$',
    '^react-redux$',
    '^@tarojs/(.*)$',
    '^taro-ui$',
    '^[./]'
  ],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-css-order'
  ]
};
