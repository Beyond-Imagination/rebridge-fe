// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ['expo', 'prettier'],
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
    },
    ignorePatterns: ['node_modules/'],
    rules: {
        'prettier/prettier': 'error',
    },
}
