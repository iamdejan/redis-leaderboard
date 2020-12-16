module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsConfigRootDir: __dirname,
    project: [
      './tsconfig.json'
    ]
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/unbound-method': 'error',
    'eqeqeq': [
      'error',
      'smart'
    ],
    'no-await-in-loop': 'error'
  }
};
