import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        ignores: ['node_modules/**'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                Buffer: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                afterAll: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                beforeEach: 'readonly',
                clearInterval: 'readonly',
                clearTimeout: 'readonly',
                console: 'readonly',
                describe: 'readonly',
                expect: 'readonly',
                fetch: 'readonly',
                global: 'readonly',
                it: 'readonly',
                jest: 'readonly',
                module: 'readonly',
                process: 'readonly',
                setInterval: 'readonly',
                setTimeout: 'readonly',
                test: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    eslintConfigPrettier,
];
