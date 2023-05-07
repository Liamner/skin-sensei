module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
};
