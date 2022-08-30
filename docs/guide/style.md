---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-29
---


# 样式

## CSS Modules

在样式开发过程中，有两个问题比较突出：

* 全局污染： CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 build 后生成文件中的先后顺序，后面的样式会将前面的覆盖；
* 选择器复杂： 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标示，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多，最终导致难以维护。

好在 vue 为我们提供了 [scoped](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F) 可以很方便的解决上述问题。 它顾名思义给 css 加了一个域的概念。


```css
/* 编译前 */
.example {
  color: red;
}

/* 编译后 */
.example[_v-f3f3eg9] {
  color: red;
}
```

只要加上` <style scoped> `这样 css 就只会作用在当前组件内了。详细文档见 [vue-loader](https://vue-loader.vuejs.org/zh/guide/)

::: tip
使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
:::

## 目录结构

`FitsAdmin`所有全局样式都在` @/styles` 下设置
```sh
......                        
├── src                                 
│   ├── style                       # 样式文件
│   │    ├── _global.scss           # 全局变量，跟variables.module.scss几乎功能一样
│   │    ├── element-plus.scss      # 全局自定义 element-ui 样式
│   │    ├── index.scss             # 全局通用样式
│   │    ├── mixin.scss             # 全局mixin
│   │    ├── sidebar.scss           # 布局中侧边栏的自定义样式
│   │    ├── theme.scss             # 全局主题样式，主要定义root的样式
│   │    ├── transition.scss        # 布局不同组件
└   └    └── variables.module.scss  # 全局变量，这个变量可以导入ts或者scss里面使用
......    
```

这里重点提一下` _global.scss`和`variables.module.scss`,这两个文件都是定义css变量，但是` _global.scss`是在`vite.config.ts`里面全局导入的，直接在任何css标签里面直接引入即可，`variables.module.scss`里面的变量如果要使用，需要在css里面导入`@import`该文件才能使用，也可以通过`import`关键字直接导入ts文件中使用，例如：`import variables from '@/styles/variables.module.scss';`

```ts
// vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          charset: false,
          // 引入全局scss变量，不过这样有个坑，就是一定要下划线的scss文件路径才引入正常。
          additionalData: '@import "./src/styles/_global.scss";',
        },
      },
    },
}
```


常见的工作流程是，全局样式都写在` src/styles `目录下，每个页面自己对应的样式都写在自己的` .vue `文件之中

```css
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

## 自定义 element Plus 样式

现在我们来说说怎么覆盖 element Plus 样式。由于 element Plus 的样式我们是在全局引入的，所以你想在某个页面里面覆盖它的样式就不能加 scoped，但你又想只覆盖这个页面的 element 样式，你就可在它的父级加一个 class，用命名空间来解决问题。

```css
.article-page {
  /* 你的命名空间 */
  .el-tag {
    /* element-ui 元素*/
    margin-right: 0px;
  }
}
```

**当然也可以使用深度作用选择器 下文会介绍**

## 深度选择器:deep
深度选择器就是父组件改变子组件样式，当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `:deep()`来实现：

```css
<style scoped>
 :deep(.el-input){
    display: none;
 }


// 下面的例子要看清楚，当有并集选择器，直接把类名放入 :deep() 括号中是不太对的
// 如下修改只能改到第一个类名，修改不到第二个类名
:deep(.el-input__inner，
.el-button.is-round) {
    width: 440px;
    height: 60px;
    line-height: 20px;
    border-radius: 30px;
    border: 1px solid rgba(211, 211, 211, 100);
    font-size: 16px;
}

//应改为
:deep(.el-input__inner),
:deep(.el-button.is-round) {
    width: 440px;
    height: 60px;
    line-height: 20px;
    border-radius: 30px;
    border: 1px solid rgba(211, 211, 211, 100);
    font-size: 16px;
}
</style>

```


::: danger 
*  `:deep()`深度选择器只会在`scoped`标签内生效
*  `>>>`、`/deep/`、`::v-deep`这vue2模式中常用的深度选择器都将在vue3项目上弃用
:::

::: note 知识拓展 
vue2一开始用的是`>>>`来作为深度选择器，但是后来发现某些CSS预处理程序（例如SASS）在解析它时会遇到问题，因为这不是官方的CSS组合器。

所以后来采用了`/deep/`，但是又有人担心担心/deep/在Vue SFC中使用它们会导致在删除该功能的浏览器中不支持其代码。

为避免混淆的/deep/组合器，就引入了自定义组合器，`::v-deep`这次更明确地说明这是Vue特定的扩展，并使用伪元素语法，

[更多详情](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
:::


## @mixin与@include实现css编程式风格

在vue中使用sass的mixin来简化样式代码，提高代码的复用率

```scss
// src/styles/mixin.scss
// @mixin 函数名($参数名: 默认值)
@mixin flex($justify-content: center, $align-center: center, $flex-direction: row){
  display: flex;
  justify-content: $justify-content;
  align-items: $align-center;
  flex-direction: $flex-direction;
}
```

像上面的写法，封装好scss的函数之后，在`.vue`文件中使用关键字`@include`进行引用即可

```scss
<style lang="scss" scoped>
@import './mixin.scss';
.main-wrap {
  @include flex(center,center,row);
}
</style>
```

