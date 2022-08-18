# Fits-admin-UI

基于 `Element Plus` 的二次开发的组件库，该项目包括了FitsAdmin的项目指南、组件封装、组件文档说明，主要讲述了FitsAdmin框架的搭建过程，注意事项，组件的参数展示等等。


## 安装

```shell
npm install fits-admin-ui
# 或者
yarn add fits-admin-ui
```

## 使用
在vue项目中`main.ts`文件导入相关的css文件和注册组件

```ts
import 'fits-admin-ui/libs/style.css';
const app = createApp(App);
// 注册全局组件
app
  .use(ElementPlus)
  .use(FitsAdmin)
  .mount('#app');
```

------

## 如何搭建组件库的简单过程

### 项目结构
```
|-- FitsAdminUI
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- yarn.lock
    |-- lib.config.ts  # 编译组件库的vite配置
    |-- public         # 资源文件，类似vue项目中存放的index.html文件
    |-- libs           # 封装组件的编译后的文件夹
    |   |-- Form       # 封装的表单组件
    |       |-- FitsTreeSelect.vue.d.ts
    |   |-- fits-admin-ui.es.js          # 编译后的文件，适合requeir导入
    |   |-- fits-admin-ui.umd.js         # 编译后的文件，适合important导入
    |   |-- index.d.ts                   # 组件库的声明文件
    |   |-- style                        # 组件库的样式文件
    |-- docs           # 组件库的文档和展示界面相关文件夹
        |-- assets                       # 文档相关的图片资源文件夹
        |-- components                   # 存放组件相关文档
        |-- guide                        # 介绍跟FitsAdmin框架相关的学习文档
        |-- .vuepress                    # vuepress 项目的一些配置文件夹
            |-- .cache                            # 缓存文件夹，可随时删除
            |-- .temp                             # 模板文件夹，里面存放md文件编译后的HTML文件，可随时删除
            |-- theme                             # vuepress自定义主题设置
            |-- clientAppEnhance.ts               # 注册导入第三方UI库
            |-- config.ts                         # vuepress最重要的配置文件，配置有头部、侧边栏、vite的配置项，自动导入功能，代码展示等
            |-- index.scss                        # vuepress的样式文件，可以在里面导入其他css
            |-- sidebar.ts                        # 侧边栏的配置文件 
```

### 组件的封装

1. 新建一个`ButtonTest.vue`文件,组件的命名最好是首字母大写（PascalCase），至少要两个单词

```vue
<template>
    <el-row class="mb-4">
        <el-button>3333</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-button>中文</el-button>
    </el-row>
</template>
```


2. 然后在路径`components/index.ts`文件下，注册组件，注册的命名建议带上`Fits`，并且使用**PascalCase (首字母大写命名) 定义一个组件**，因为首字母大写命名的组件，在使用时，可以使用` <my-component-name>` 和 `<MyComponentName>`两种命名方式

```ts
import ButtonTest from './Form/ButtonTest.vue'
import TreeSelect from './Form/TreeSelect.vue'
import type { App } from 'vue'

const FitAdminUI = {
    install: (app: App<Element>) => {
        app.component('FitsButtonTest', ButtonTest);
        app.component('FitsTreeSelect', TreeSelect);
    }
}


export default FitAdminUI
```

### 组件的编译
1. 由于要发布的npm平台，我们需要对封装好的组件进行转义，这次转义的工具是vite，所以我们要新建一个`libs.config.ts`文件写入vite的一些配置项

```ts
import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // dts这个插件主要解决index.ts在编译过程中，生成相应的type声明文件,方便ts去使用，保证不会包类型错误
        dts({
            include: [
                'src/components/**/*.ts',
                'src/components/**/*.d.ts',
                'src/components/**/*.tsx',
                'src/components/**/*.vue',
            ]
        })
    ],
    build: {
        // 编译之后输出的地址
        outDir: 'libs',
        lib: {
            // 需要编译的入口文件
            entry: path.resolve(__dirname, './src/components/index.ts'),
            name: 'FitsAdminUI',
            // 编译之后压缩的文件名字
            fileName: (format: string) => `fits-admin-ui.${format}.js`,
        },
        rollupOptions: {
            external: 'vue',
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});

```

2. 在`package.json`文件配置组件的编译命令

```json
{   
     "scripts": {
        "build:lib": "vite build --config ./lib.config.ts"
    },
}
```

### 组件范例文档的编写

1. 在路径：`docs/components/Form/TreeSelect.md`目录下，新建一个md文件，然后直接写入封装的组件代码，即可预览和出现相应的代码

```
# TreeSelect

:::demo 使用 type、plain、round 和 circle 来定义按钮的样式。

```vue
<template>
    <FitsButtonTest  />
</template>

```（这个括号内容是要去除的，这里写上是为了显示```的符号）
:::

```

2. 效果图如下：

![./markdown/docs/view.jpg](https://github.com/caoguanjie/fitsadmin/tree/master/libs/assets/view.jpg)


### 发布组件库
1. 前期工作都做好，并且保证本地已经登录npm的账号密码情况下，要给`package.json`文件添加一些属性。只有配置好了`main`、`module`、`style`、`types`、`type`、`exports`、`repository`这些属性之后，项目中才能使用`import FitsAdmin from 'fits-admin-ui'`这种办法导入

```json
{
    "name": "fits-admin-ui",
    "version": "1.0.1",
    "description": "FitsAdminUI是根据element plus进行二次开发的组件库",
    "author": {
        "name": "caoguanjie",
        "email": "374348532@qq.com",
        "url": "https://github.com/caoguanjie"
    },
    "main": "libs/fits-admin-ui.umd.js",
    "module": "libs/fits-admin-ui.es.js",
    "style": "libs/style.css",
    "types": "libs/index.d.ts",
    "type": "module",
    "exports": {
        ".": {
            "import": "./libs/fits-admin-ui.es.js",
            "require": "./libs/fits-admin-ui.umd.js"
        },
        "./*": "./*"
    },
    "license": "MIT",
    "private": false,
    "repository": {
        "type": "git",
        "url": "git+https://github.com/caoguanjie/fits-admin-ui.git"
    },
}
```

2. 最后通过`npm publish`直接提交，每次更新只需要更新版本号即可。