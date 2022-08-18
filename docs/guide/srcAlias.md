---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-16
---


# 路径别名配置
::: tip 
使用 @ 代替 src
:::
## 1.Vite配置
```ts
// vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
        }
    }
})
```
 
## 2.安装@types/node
`import path from 'path'`编译器报错：`TS2307: Cannot find module 'path' or its corresponding type declarations.`

本地安装 Node 的 TypeScript 类型描述文件即可解决编译器报错

```sh
npm install @types/node --save-dev
```

## 3. TypeScript 编译配置
同样还是`import path from 'path'` 编译报错: TS1259: `Module '"path"' can only be default-imported using the 'allowSyntheticDefaultImports' flag`

因为 typescript 特殊的 import 方式 , 需要配置允许默认导入的方式，还有路径别名的配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { //路径映射，相对于baseUrl
      "@/*": ["src/*"] 
    },
    "allowSyntheticDefaultImports": true // 允许默认导入
  }
}
```

## 4.别名使用

```ts
// App.vue
import HelloWorld from '/src/components/HelloWorld.vue'
												↓
import HelloWorld from '@/components/HelloWorld.vue'

```