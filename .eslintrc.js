// .eslintrc.js
module.exports = {
  extends: ['alloy/react', 'alloy/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // 启用ES8语法支持
    ecmaVersion: 6,
    // module表示ECMAScript模块
    sourceType: 'module',
    // 使用额外的语言特性
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true
    }
  },
  // 这些环境并不是互斥的，所以你可以同时定义多个
  env: {
    browser: true,
    jquery: true,
    node: true,
    commonjs: true,
    es6: true,
    webextensions: true
  },
  root: true,
  // 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告
  // 所以需要定义这些额外的全局变量
  globals: {
    OnlySVG: true,
    monitor: true,
    CanvasRender: true,
    React: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  plugins: ['react', 'import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    indent: ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/explicit-member-accessibility': 0,
    eqeqeq: 0,
    'function-paren-newline': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/prefer-for-of': 0
  }
};
