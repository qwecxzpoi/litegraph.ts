import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  ignores: ['build/', '**/dist/**'],
}, {
  rules: {
    'no-console': 0,
    'unused-imports/no-unused-imports': 0,
    'curly': [2, 'all'],
  },
})
