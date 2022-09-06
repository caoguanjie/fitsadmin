---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-29
---

# 外部导入模块

除了 element plus 组件以及脚手架内置的业务组件，有时我们还需要引入其他外部组件，这里以引入 [form-create](http://www.form-create.com/v2/guide/) 为例进行介绍。

## 引入依赖

在终端输入下面的命令完成安装：

```sh
npm i @form-create/element-ui --save
```

::: tip
加上 `--save` 参数会自动添加依赖到 `package.json `中去。
:::

## 使用

### 全局注册
**src/main.ts**

```js
// form-create表单构造
import formCreate from '@form-create/element-ui'

const app = createApp(App);

app.use(formCreate)
```

```html
<div id="app1">
    <form-create v-model="fApi" :rule="rule" :option="option" :value.sync="value"></form-create>
</div>
```

### 局部注册
```vue
// 某个.vue文件
<template>
  <form-create v-model="fApi" :rule="rule" :option="option" :value.sync="value"></form-create>
</template>

<script setup lang="ts">
import formCreate from '@form-create/element-ui'
const simpleForm = reactive({
    formValue: {
        checkbox2: ["生态蔬菜", '新鲜水果']
    },
    fApi: {},
    rule: [
        {
            type: 'divider',
            component: markRaw(Divider),
            field: "divider",
            value: '输入控件'
        },
    ],
    option: {
       
    },
})

</script>
```

## 按需导入

::: warning 目前框架使用的FormCreate是按需导入的方式
:::

```ts
// src/other-imports.ts

// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
import install from '@form-create/element-ui/auto-import'
import formCreate from '@form-create/element-ui';
import { App } from 'vue';


formCreate.use(install)

function setupOtherImports(app: App) {
    app.use(formCreate)
}

export default setupOtherImports
```

直接使用官网推荐的按需导入，在ts项目是会报错的，会提示`@form-create/element-ui/auto-import`找不到相应的模块，所以还需要增加多一个步骤，就是声明一下以上的模块

```ts
// src/types/base/form-create.d.ts
declare module '@form-create/element-ui/auto-import';
```


::: danger 强烈建议
`src/other-imports.ts`该文件是存放所有第三方导入的模块、类库、组件的声明注册方式，建议以后有其他第三方组件需要安装注册的话，请模仿上面的写法，在此声明
:::



## 在 vue3 中优雅的使用第三方库


### 方案一：原型对象代理
在 Vue3 项目中使用 JavaScript 库的一个优雅方式是将其代理到 Vue 的原型对象上去. 按照这种方式, 我们引入 Moment 库:

**main.ts**

```ts
import moment from 'moment'

const app = createApp(App)
app.config.globalProperties.$moment = moment

```
由于所有的组件都会从 Vue 的原型对象上继承它们的方法, 因此在所有组件/实例中都可以通过 this.$moment 的方式访问 Moment 而不需要定义全局变量或者手动的引入:

**在任意的xxx.vue使用**

```vue
<script setup lang="ts">
import { getCurrentInstance } from 'vue';
// 实例化当前组件
const { proxy }: any = getCurrentInstance();

proxy.$moment().format('MMMM Do YYYY, h:mm:ss a');
</script>

```

由上面的使用可以看出来，就算你挂载在 Vue 的原型对象上，在使用的时候，依然每次都要`实例化当前组件`才能调用，这样的方式跟每个页面都重复导入`import moment from 'moment'`,然后再调用`moment()`函数有什么区别？并没有减少开发的操作步骤, 因此可以用到方案二

### 方案二：unplugin-auto-import 按需自动导入

使用这种方案有两个好处：
1. 它不用每个页面都重复添加这个语句：`import moment from 'moment'`，不需要导入，直接调用`moment()`的api，例子如下：

```vue
<template>
    <div class="home-container">
        {{ time }}
    </div>
</template>

<script lang='ts' setup>

import useStore from '@/store';
import ENV from '@/environment/index';
// import moment from "moment" 再也不用导入了
const { project: { title, subTitle } } = ENV
const { user } = useStore()
const time = ref(moment().format())

</script>
<style lang='scss' scoped>

</style>
```



2. 它会独立生成一个`moment.js`，只要有一个地方调用过它的方法，`moment.js`加载过一次之后，不会再次加载，这样的效果主要减少了各个界面的js大小，不然，每个界面的js代码都会多导入一次`moment.js`的代码

![图 4](/images/20220906080149.png)  

::: tip 了解更多unplugin-auto-import用法
可以前往 进阶 -->  [按需自动导入](../guide/auto-imports.md)
:::


在诸多 Vue.js 应用中, Lodash, Moment, Axios, Async 等都是一些非常有用的 JavaScript 库. 但随着项目越来越复杂, 可能会采取组件化和模块化的方式来组织代码, 还可能要使应用支持不同环境下的服务端渲染. 除非你找到了一个简单而又健壮的方式来引入这些库供不同的组件和模块使用, 不然, 这些第三方库的管理会给你带来一些麻烦,这里来介绍一下 Vue.js 中使用第三方库的方式详情见该 [blog](https://github.com/dwqs/blog/issues/51)。

在框架搭建过程中，`unplugin-auto-import`这个库给第三方 JavaScript 库带来很好的用户体验，建议各位前端开发在遇到需要导入其他 JavaScript 库的时候，多多考虑这种自动导入的方式，不单减少开发的重复性导入代码操作，还减少了不同模块/页面直接包的大小

## 框架中已导入的外部模块

### element plus
已实现了按需自动加载，可以在`auto-imports.d.ts`文件中看到项目中已经使用过的element组件， 具体用法: [整合Element-Plus](/guide/elementplus.md)

### form-create

上文已经有详细的说明

### Moment
上文已经有详细的说明

### echarts

echart使用的官方的按需加载，配合vite中 `manualChunks`方案实现，具体用法：[Echarts图表](/guide/echart.md)