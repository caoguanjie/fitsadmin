---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-17
---
# 整合Element-Plus

## 本地安装
```sh
# 本地安装Element Plus和图标组件
npm install element-plus
npm install @element-plus/icons-vue
```

## 全局注册
```ts
// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

createApp(App)
    .use(ElementPlus)
    .mount('#app')
```

## 全局组件类型声明
```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

## 使用 Element Plus 组件和图标

```html
<!-- src/App.vue -->
<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"/>
  <div style="text-align: center;margin-top: 10px">
    <el-button :icon="Search" circle></el-button>
    <el-button type="primary" :icon="Edit" circle></el-button>
    <el-button type="success" :icon="Check" circle></el-button>
    <el-button type="info" :icon="Message" circle></el-button>
    <el-button type="warning" :icon="Star" circle></el-button>
    <el-button type="danger" :icon="Delete" circle></el-button>
  </div>
</template>

<script lang="ts" setup>
     import HelloWorld from '/src/components/HelloWorld.vue'
     import {Search, Edit,Check,Message,Star, Delete} from '@element-plus/icons-vue'
</script>
```

## 效果预览
![图 4](/images/20220810085530.png)  


::: danger 以上为旧版的集成方案，仅供参考
以上的方案都是一开始整理的全局注册方案，后面已经改成了`按需自动导入`方案，请移步到[按需自动导入](/guide/auto-imports.md)
:::