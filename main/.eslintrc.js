module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly'
    },
    parser: 'vue-eslint-parser',
    extends: [
        './.eslintrc-auto-import.json',
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        "vue/html-self-closing": ["warn", {
            "html": {
                "void": "never",
                "normal": "always",
                "component": "always"
            },
            "svg": "always",
        }],
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-empty-function': 'off', // 关闭空方法检查
        '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
        'vue/no-v-model-argument': 'off'
    }
};