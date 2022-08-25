---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-25
---

# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

## Layout目录结构


```sh
......                        
├── src                                 
│   ├── layout                     # 布局文件
│   │    ├── component             # 布局不同组件
│   │    │   ├── Breadcrumb        # 面包屑组件
│   │    │   ├── Footer            # 页脚布局，存放面包屑和系统版本号
│   │    │   ├── Settings          # 右屉打开的设置界面
│   │    │   ├── Sidebar           # 侧边栏菜单，包括缩略菜单
│   │    │   ├── TagsView          # 多页签组件
│   │    │   ├── TopMenu           # 一级目录菜单
│   │    │   ├── AppMain.vue       # 路由标签router-view
│   │    │   ├── Navbar.vue        # 导航栏的组件
│   │    │   └── index.ts          # 注册上面的所有组件
└   └    └── index.vue             # 最主要的界面布局
......    
```


`FitsAdmin` 中大部分页面都是基于这个` layout` 的，除了个别页面如：`login` , `404`,` 401 `等页面没有使用该`layout`。如果你想在一个项目中有多种不同的`layout`也是很方便的，只要在一级路由那里选择不同的`layout`组件就行。



```ts
// 没有 layout
{
  path: '/401',
  component: () => import('errorPage/401')
}

// 有 layout
{
  path: '/documentation',

  // 你可以选择不同的layout组件
  component: Layout,

  // 这里开始对应的路由都会显示在app-main中 如上图所示
  children: [{
    path: 'index',
    component: () => import('documentation/index'),
    name: 'documentation'
  }]
}
```

这里使用了 vue-router [路由嵌套](https://router.vuejs.org/zh/guide/essentials/nested-routes.html), 所以一般情况下，你增加或者修改页面只会影响 `app-main`这个主体区域。其它配置在` layout` 中的内容如：侧边栏或者导航栏都是不会随着你主体页面变化而变化的。

```
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

当然你也可以一个项目里面使用多个不同的` layout`，只要在你想作用的路由父级上引用它就可以了。

## app-main
::: info 对应代码
@/layout/components/AppMain
:::

` @`是 `vite `的 `alias` 不懂得请自行研究：[路径别名配置](/guide/srcAlias)

这里在 `app-main` 外部包了一层` keep-alive `主要是为了缓存` <router-view> `的，配合页面的`<tabs-view>`标签导航使用，如不需要可自行[去除](/guide/tags-view)。

其中 `transition` 定义了页面之间切换动画，可以根据自己的需求，自行修改转场动画。相关[文档](https://cn.vuejs.org/guide/built-ins/transition.html#named-transitions)。默认提供了fade和fade-transform两个转场动画，具体 css 实现见[transition.scss](https://github.com/caoguanjie/fitsadmin/blob/master/src/styles/transition.scss)。如果需要调整可在AppMain.vue中调整`transition` 的 `name`。目前项目中所配置的`name="router-fade"`其实没有写任何动画效果。

## router-view
在真实的业务场景中，你会发现一种情况：不同的路由可能会对应相同的组件，这种情况很多。

例如：我创建和编辑的页面使用的是同一个`component` ，默认情况下这两个页面切换时并不会触发 `vue` 的 `created` 或者 `mounted` 钩子, vue3的`vue-router`中`<router-view> `暴露了一个` v-slot API`，主要使用 `<transition>` 和 `<keep-alive> `组件来包裹你的路由组件, 其中`:key="route.fullPath"`上加上一个唯一的 key，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。

* `Component`: VNodes, 传递给 `<component>`的`is prop`。
* `route`: 解析出的标准化路由地址,标准化的路由地址。没有任何重定向记录。在导航守卫中，to 和 from 总是属于这种类型。。

```html
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
```

## top-menu
顶部导航（一级目录），待完善

## 移动端
element-ui 官方对自己的定位是桌面端后台框架，而且对于管理后台这种重交互的项目来说是不能通过简单的适配来满足桌面端和移动端两端不同的交互，所以真要做移动版后台，建议重新做一套系统,或者使用app框架`ionic`

所以本项目也不会适配移动端，只是用media query做了一点简单的响应式布局，有需求各大业务系统请自行修改。