---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-23
---


# Svg图标
Element Plus 图标库往往满足不了实际开发需求，可以引用和使用第三方例如 iconfont 的图标，本节通过整合 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)和[vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)插件使用第三方图标库。

## 使用步骤
1. 首先需要在[iconfont](https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a)官网下载需要的svg图片，或者是在`iconfont`平台上新建一个项目，由设计师把设计图片上传，再下载svg格式图片

::: danger 
这里要提醒一下前端开发，当从iconfont官网下载的svg图片，如果无法前端无法通过css设置颜色，那就是证明svg上传的时候，设计师没有做好复合路径，或者说没有做好转曲的操作，导致了图片无法去色，所以就是没有办法通过css变化颜色值，这个时候找设计师解决这个问题
:::

2. 图片下载后，把本地图片重命名，改一个英文名称，例如：`menu`,重点记得，所改的名字，语义化要强，能让人一下理解这个图标是做什么，必要时可以用中文拼音命名，改好名字后，把svg图片放置在目录`src/assets/icons`文件夹中
3. 在程序上，如下面所示，直接去调用即可。
   
```html
<template>
  <svg-icon icon-class="menu"/>
</template>

<script setup lang="ts">
	import SvgIcon from '@/components/SvgIcon/index.vue';
</script>  
```

::: info
本来如果只是使用图标功能，上面的封装的`SvgIcon`组件足以解决问题，但是在实际应用中，发现element有一些组件，类似Button，如果要给按钮设置图标的话，他需要的是`svg component`的模式，也就是单独svg图片要变成独立的组件，于是乎需要`vite-svg-loader`这个插件
::: 

#### **在element组件中使用svg图片作为独立组件**
```html
<template>
    <el-dropdown-menu>
        <el-dropdown-item :icon="RefreshIcon" command="refresh">刷新</el-dropdown-item>
    </el-dropdown-menu>
</template>

<script setup lang="ts">
	import RefreshIcon from '@/assets/icons/fits-refresh.svg';
</script> 
```

## 改变颜色

`svg-icon` 默认会读取其父级的 `color fill: currentColor`;

你可以改变父级的`color`或者直接css改变`fill`的颜色即可。


上面介绍了具体SVG的使用方法，下面来介绍一下这两个插件的集成过程



## vite-plugin-svg-icons集成过程


### 1.安装vite-plugin-svg-icons
```sh
npm i fast-glob@3.2.11 -D
npm i vite-plugin-svg-icons@2.0.1 -D
```

### 2.创建图标文件夹
项目创建` src/assets/icons` 文件夹，存放 `iconfont` 下载的 `SVG` 图标

### 3. main.ts 引入注册脚本

```ts
// main.ts
import 'virtual:svg-icons-register';
```

### 4. vite.config.ts 插件配置
```ts
// vite.config.ts
import {UserConfig, ConfigEnv, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default ({command, mode}: ConfigEnv): UserConfig => {
    // 获取 .env 环境配置文件
    const env = loadEnv(mode, process.cwd())

    return (
        {
            plugins: [
                vue(),
                createSvgIconsPlugin({
                    // 指定需要缓存的图标文件夹
                    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                    // 指定symbolId格式
                    symbolId: 'icon-[dir]-[name]',
                })
            ]
        }
    )
}
```

### 5.TypeScript支持
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vite-plugin-svg-icons/client"]
  }
}
```

### 6. 组件封装

```vue
<!-- src/components/SvgIcon/index.vue -->
<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props=defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  iconClass: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: ''
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>

```


## vite-svg-loader集成过程

### 1. 安装

```sh
npm install vite-svg-loader --save-dev
```

### 2.vite.config.ts配置
```ts
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(), 
    svgLoader()
  ]
})
```

### 3.使用

```html
<template>
    <el-dropdown-menu>
        <el-dropdown-item :icon="RefreshIcon" command="refresh">刷新</el-dropdown-item>
    </el-dropdown-menu>
</template>

<script setup lang="ts">
	import RefreshIcon from '@/assets/icons/fits-refresh.svg';
</script> 
```