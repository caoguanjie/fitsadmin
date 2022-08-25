---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-25
---

# ESLint

大家知道TypeScript可以和Vue3一起开发，把TS强类型的语言特性引入到前端工程中。

这可以使得整个工程的代码更加健壮和可靠，不会经常出现像JS那样代码运行起来后，才知道变量的值可能是`undefined`，运行时很难控制错误，导致出现各种软件的Bug。

除了代码的健壮性和可靠性，一个中大型的前端网站往往需要团队协作开发，代码风格的统一性可以增强工程的可维护性和可阅读性。

由于JS语言语法的灵活和多变，连一句代码都可以有多种写法，工程的代码风格往往会不同人不同时间都会有不一样的代码风格。

团队协作开发前端的时候，往往希望有一个工具可以自动化检查、警告、对不安全的风格代码报错、一键修改。

Vscode + Eslint方案，可以很方便地对Ts和Vue3工程文件代码，开发时自动化检查、警告、对不安全的风格代码报错、一键修改。


## 项目集成

npm安装eslint相应的依赖

```sh
npm install eslint --save-dev
npm install eslint-plugin-vue --save-dev
npm install @typescript-eslint/parser --save-dev
npm install @typescript-eslint/eslint-plugin --save-dev
```

**说明：**
1. `eslint-plugin-vue`可以检查`.vue`后缀名文件的语法格式问题。
2. `ESLint` 默认使用[Espree](https://github.com/eslint/espree)解析器将代码解析为AST抽象语法树，然后再对代码进行检查。`Espree`​会无法识别 `TypeScript` 的一些语法，所以需要安装`@typescript-eslint/parser`，替代掉默认的解析器。
3. 由于`@typescript-eslint/parser`对一部分 ESLint 规则支持性不好，所以需要安装`@typescript-eslint/eslint-plugin`，替换一些支持性不好的规则。

## vscode支持
:::warning 提醒：vscode务必更新最新的版本，避免出现不必要的错误
:::

一定要安装下面两个vscode的插件支持vue3语法：
1. `Volar（Vue Language Features）` 是官方的 `VSCode` 扩展，提供了 `Vue` 单文件组件中的 `TypeScript` 支持，`.vue`文件的编码规范，还伴随着一些其他非常棒的特性。
2. `TypeScript Vue Plugin `用于支持在 TS 中 `import *.vue` 文件,输入 `import` 语句时，`.vue* `文件也会出现以进行自动完成。在 `*.ts` 文件中查找引用时，您还可以从 `*.vue` 文件中获得结果。

![图 1](/images/20220825102734.png)  

::: danger 
Volar 取代了我们之前为 Vue 2 提供的官方 VSCode 扩展 Vetur。如果你之前已经安装了 Vetur，请确保在 Vue 3 的项目中禁用它。
:::

**搜索Eslint插件并点击install安装**

![图 2](/images/20220825102954.png)  


## 选取volar默认格式化配置

打开项目中任何一个vue的文件，然后右键菜单，选中**使用...格式化文档**，选取volar作为vue3项目的默认格式化工具

![图 3](/images/20220825103554.png =x300)  
![图 4](/images/20220825103559.png)  

## 创建Eslint规则文件

主要是在项目中创建Eslint规则文件`.eslintrc.js`和Eslint忽略检查配置文件`.eslintignore`

![图 5](/images/20220825104459.png)  

::: tabs
@tab:active .eslintrc.js
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly'
  },
  parser: 'vue-eslint-parser',
  extends: [
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
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-empty-function': 'off', // 关闭空方法检查
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
    'vue/no-v-model-argument': 'off'
  }
};
```

@tab .eslintignore
```
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
.eslintrc.js
prettier.config.js
src/assets
```
:::

## 自动修复规则
1. 在`package.json`文件中创建eslint运行脚本命令
```json
{
    "scripts": {
       ...
        "lint": "eslint src/**/*.{ts,js,vue} --fix",
       ...
    },
}
```

2. VsCode会根据Eslint插件启动自动提示不良风格代码功能和一键修复功能
 
 **例子：**
 * App.vue文件中被Eslint插件发现了一个不良风格代码警告，黄色波浪线提示
  
![图 6](/images/20220825110230.png)  
* 查看具体警告（vue/html-self-closing警告）
 
![图 7](/images/20220825110317.png)  

* 使用Eslint一键修复功能或者执行eslint运行脚本命令全局修复

![图 8](/images/20220825110426.png)  

```shell
# 或者执行eslint运行脚本命令全局修复
npm run lint
```

## 更多配置
这样每次保存的时候就可以根据根目录下`.eslintrc.js `你配置的` eslint` 规则来检查和做一些简单的` fix`。每个人和团队都有自己的代码规范，统一就好了，去打造一份属于FitsAdmin的 `eslint` 规则，也可以参考饿了么团队的 [ESlint config](https://www.npmjs.com/package/eslint-config-elemefe)，vue 的[ESlint config](https://github.com/vuejs/eslint-config-vue)。

[vscode 插件和配置推荐](https://github.com/varHarrie/varharrie.github.io/issues/10)