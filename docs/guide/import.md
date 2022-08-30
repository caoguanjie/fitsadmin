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

## 在 vue3 中优雅的使用第三方库

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

在诸多 Vue.js 应用中, Lodash, Moment, Axios, Async 等都是一些非常有用的 JavaScript 库. 但随着项目越来越复杂, 可能会采取组件化和模块化的方式来组织代码, 还可能要使应用支持不同环境下的服务端渲染. 除非你找到了一个简单而又健壮的方式来引入这些库供不同的组件和模块使用, 不然, 这些第三方库的管理会给你带来一些麻烦,这里来介绍一下 Vue.js 中使用第三方库的方式详情见该 [blog](https://github.com/dwqs/blog/issues/51)。

## 注意事项

随着项目的复杂，可能会导入很多第三库，无论是局部注册还是全局注册，都有它们各自的局限性，局部注册每次导入导出比较麻烦，后面如果要删库，改动的文件数目会非常多，甚至会令部分编译后的vue文件很大。全局注册唯一的缺点就是会让第一次加载进来的`js`文件变得很大，导致首屏加载时间很长，这个是需要我们警惕的，多个人开发项目，我建议各位开发不要贪图方便，全部第三方库都采用全局注册的方式，这样随着项目的复杂。迭代，会导致js变得越来越大，只有哪些使用频率高的才采用全局注册的方式，例如：
1. element plus组件库
2. form-create 表单引擎
3. Moment 时间处理库
4. echarts 图表