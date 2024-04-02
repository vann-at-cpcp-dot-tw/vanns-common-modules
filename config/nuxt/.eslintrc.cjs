const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended'
  ],
  settings: {
    tailwindcss: {
      removeDuplicates: true,
      officialSorting: true,
      prependCustom: true
    }
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', 'react', 'tailwindcss', '@typescript-eslint'],
  rules: {
    'no-undef': 'off',
    eqeqeq: ['warn'],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'comma-dangle': ['error', 'only-multiline'],
    camelcase: ['warn'],
    'no-unused-vars': ['warn'],
    'no-new': ['warn'],
    'prefer-const': ['error', {
      ignoreReadBeforeAssign: true
    }],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    indent: [
      'warn',
      2,
      {
        ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute', 'TemplateLiteral'],
        SwitchCase: 1,
        VariableDeclarator: 'first'
        // MemberExpression: 0,
        // FunctionDeclaration: { body: 1, parameters: 1 },
        // FunctionExpression: { body: 1, parameters: 1 },
        // CallExpression: { arguments: 1 },
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'warn', {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always'
        }
      }
    ],

    // from eslint-plugin-react
    'react/jsx-uses-react': ['off'],
    'react/jsx-indent-props': ['error', 0],
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    'react/jsx-tag-spacing': ['error', {
      beforeSelfClosing: 'always'
    }],
    'react/jsx-curly-spacing': ['error', { when: 'never' }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-curly-newline': [
      'error', {
        multiline: 'consistent',
        singleline: 'forbid'
      }
    ],

    // from eslint-plugin-tailwind
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': ['warn']
  }
})
