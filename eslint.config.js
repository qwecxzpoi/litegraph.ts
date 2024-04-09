import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
}, {
  rules: {
    'no-console': 0,
    'unused-imports/no-unused-imports': 0,
  },
})
