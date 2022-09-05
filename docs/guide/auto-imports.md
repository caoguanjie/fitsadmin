---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-09-05
---

# 按需自动导入

## 前言

在之前的项目中，为了避免项目打包体积过大，不是全局都使用的组件都需要按需引入，使用的图标也需要手动按需引入，不断的手写 import 引入，实话实说，这非常的麻烦！

::: warning 全局注册和局部注册的优劣
1. 全局注册优点是减少开发过程中不断`import`的繁琐操作，缺点也很明显，就是会令首次加载的js非常大，增加首屏加载时间
2. 局部注册刚好相反，优点是减少首次js的包的体积大小，但是开发过程中要频繁导入`import`
因此，两种方案都没有绝对的好坏，重点是适合项目的需求，首选是局部注册（按需加载）用户体验更高，至于开发繁琐可以采用自动化工具来辅助开发。
:::

现在有几个插件可以帮我们一次性解决这些问题，我们在调用时可以不需要import而直接使用，且最终打包时，只有实际使用过的api和组件才会被build进最终产物，


::: danger 注意不是所有的组件/插件都可以采用按需自动导入的方式，如果没办法自动导入的话，还是老老实实做好全局注册,后面会介绍如何做好全局注册
:::

### unplugin-auto-import

自动按需引入 vue\vue-router\pinia 等的 api，这里要提醒各位开发，`unplugin-auto-import`这个插件有内置了按需导入的vue的`CompositionAPI`,仅此而已，而不是说，在实际开发过程中`import xx from vue` 永远不用写，例如一些组件的属性类型是要写导入的。

::: details 按需自动导入vue CompositionAPI详情
```ts
// https://github.com/antfu/unplugin-auto-import/blob/main/src/presets/vue.ts
import type { ImportsMap } from '../types'

export const CommonCompositionAPI = [
  // lifecycle
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onErrorCaptured',
  'onDeactivated',
  'onMounted',
  'onServerPrefetch',
  'onUnmounted',
  'onUpdated',

  // setup helpers
  'useAttrs',
  'useSlots',

  // reactivity,
  'computed',
  'customRef',
  'isReadonly',
  'isRef',
  'markRaw',
  'reactive',
  'isReactive',
  'isProxy',
  'readonly',
  'ref',
  'shallowReactive',
  'shallowReadonly',
  'shallowRef',
  'triggerRef',
  'toRaw',
  'toRef',
  'toRefs',
  'unref',
  'watch',
  'watchEffect',
  'watchPostEffect',
  'watchSyncEffect',

  // component
  'defineComponent',
  'defineAsyncComponent',
  'getCurrentInstance',
  'h',
  'inject',
  'nextTick',
  'provide',
  'useCssModule',
  'createApp',

  // effect scope
  'effectScope',
  'EffectScope',
  'getCurrentScope',
  'onScopeDispose',
]

export default <ImportsMap>({
  vue: [
    ...CommonCompositionAPI,

    // vue3 only
    'onRenderTracked',
    'onRenderTriggered',
    'resolveComponent',
    'useCssVars',
  ],
})
```
:::


### unplugin-vue-components

自动按需引入 第三方的组件库组件 和 我们自定义的组件

**按照官方说明：**

* 支持 Vue 2 和 Vue 3
* 支持 components 和 directives
* 支持 Vite, Webpack, Vue CLI, Rollup, esbuild 等，这个主要还是看 unplugin 支持什么
* 支持 tree-shaking，只导入使用到的组件
* 完整支持 TypeScript
* 内置了很多流行组件库的解析支持，比如说我需要使用的 Ant Design Vue 3 iView

使用此插件后，不需要手动编写import { ElButton } from 'element-plus'这样的代码了，插件会自动识别template中使用的自定义组件并自动注册。

## 安装

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```
## 构建过程

1. 先在` vite.config.ts `配置

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
      // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
      imports: ['vue', 'vue-router'],
      // dts 属性是指生成的文件存放的位置，默认是./auto-imports.d.ts
      dts: './src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],
      // dts 属性是指生成的文件存放的位置，
      dts: './src/components.d.ts',
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue', 'md'],
      // 解析的 UI 组件库，这里以 Element Plus 为例
      resolvers: [ElementPlusResolver()],
    }),
  ],
}

```

2. 解决ESlint的报错提示

如果我们的项目中使用了 `Eslint`，且使用了 `unplugin-auto-import`，那么你就会发现下面这一幕

![图 1](/images/20220905073403.png)  

是的，因为 `Eslint` 找不到我们按需引入的这些 api，我们不需要import是爽了，人家Eslint不知道呀，就咯的一下给我们报红，那怎么办呢？既然 Eslint 不知道我们按需引入了 api，那我们让它知道不就好了？看代码：

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default {
  plugins: [
    // ...
    AutoImport({
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
}

```

把 `eslintrc`属性加上，它会在根目录下生成一个`.eslintrc-auto-import.json`JSON文件，这个文件会告诉eslint我按需引入的对象是什么。

3. 把`.eslintrc-auto-import.json`文件添加到`.eslintrc`

```js 
module.exports = {
    extends: [
        './.eslintrc-auto-import.json',
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
    ],
};
```

## 使用

### element plus 

**使用前**

```vue
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const open = () => {
  ElMessage('this is a message.')
}

</script>
```

**使用后**

```vue
<script lang="ts" setup>

const open = () => {
    // 直接调用，不需要导入
  ElMessage('this is a message.')
}

</script>
```

### vue CompositionAPI 


**使用前**

```vue
<script lang="ts" setup>

import { reactive, ref, toRefs } from 'vue';

const test1 = ref(1);
const test2 = reactive([]);
const test3 =  toRef(test2);

</script>
```

**使用后**

```vue
<script lang="ts" setup>
// 不需要额外使用import导入
const test1 = ref(1);
const test2 = reactive([]);
const test3 =  toRef(test2);

</script>
```


### component自定义组件 

**使用前**


```vue
<template>
  <el-dropdown class="size-select" trigger="click" @command="handleSetSize">
    <div class="size-select__icon">
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
  </el-dropdown>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
</script>
```

**使用后**


```vue
<template>
  <el-dropdown class="size-select" trigger="click" @command="handleSetSize">
    <div class="size-select__icon">
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
  </el-dropdown>
</template>

<script lang="ts" setup>
// 不需要额外导入
</script>
```

::: danger 组件名字别重复
注意这里的组件名默认就是首字母大写的命名方式的`**.vue`文件，想确保自己的组件是什么名字的话，可以看看`auto-imports.d.ts`里面的文件声明
:::

## 使用前后的文件大小对比

### 未使用之前

![图 6](/images/20220905085042.png)  

### 使用之后

![图 7](/images/20220905085137.png)  

## 故障排除

### ElMessage、ElMessageBox报错

![图 2](/images/20220905080916.png)  

`unplugin-vue-components` 这个插件目前并不能扫描不在模板 (template) 内使用的部分组件，比如 element plus 的 Message/ElMessageBox 组件

两种解决办法：

**第一种解决办法：手动 import 后使用**

```vue
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const open = () => {
  ElMessage('this is a message.')
}

</script>
```

**第二种解决办法：不用理会标红的内容**

`unplugin-vue-components` 虽然没有扫描到`<script>`标签内的`ElMessage`组件，但是当你的页面跳转到当前使用`ElMessage`组件的页面后，`unplugin-vue-components` 会马上识别到`ElMessage`组件，自动在`auto-imports.d.ts`里面的文件声明，这个时候就不会有报错提示了，只是因为路由懒加载，导致了无法在一开始就识别`ElMessage`组件

### 开始运行时报错

![图 3](/images/20220905082700.png)  

**原因**

上面报错的原因是没有权限（ `EACCES: permission denied`），由于我司的SVN管理的特殊性，每个上传的代码文件会变成只读属性，所以每次执行代码时候，都没有权限。

**解决办法**

在SVN设置忽略文件，把三个自动生成的文件（`.eslintrc-auto-import.json`、`components.d.ts`、`auto-imports.d.ts`）不需要提交到SVN。

**MacOS cornerstoneSVN**

![图 4](/images/20220905083425.png)  

**Window TortoiseSVN**

![图 5](/images/20220905083654.png)  

### unplugin-auto-import插件造成页面闪回

重现的步骤是：每当重启项目时，发现第一次点击路由菜单时，页面会先跳转到指定页面，然后再跳回来，每一个第一次打开的都是如此，而且打开一个新的页面，加载都非常慢，不过只要加载过都会比较快。[了解更多详情](https://zhuanlan.zhihu.com/p/530626295)

经实践证明，这种情况只会发生在开发环境，不影响build打包之后的操作体验。

**猜想的原因**

在开发环境下，vite使用的是ES Module的形式，这个情况底下auto-import按需导入的文件，在访问新页面的时候，其实还没有导入成功新模块的，但是路由已经开始跳转了，因此当路由跳转到新页面，发现没模块的时候，触发了路由的刷新，因此需要再点击一次

**解决办法**

这个算是插件的bug吧，暂时没有办法解决，但是不是很影响开发。

