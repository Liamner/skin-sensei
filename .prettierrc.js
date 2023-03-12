module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: true,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.json',
      options: {
        trailingComma: 'es5',
        tabWidth: 4,
        semi: false,
        singleQuote: true,
      },
    },
  ],
};
