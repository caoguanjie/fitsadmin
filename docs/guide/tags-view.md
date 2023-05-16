---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-26
---

# 快捷导航(标签栏导航)

以前那些传统后台框架往往会包含此功能，由于以前的后台项目大部分都是多页面的形式，所以标签栏导航功能还是具有一定意义的，大部分都是基于 `iframe`的方式实现的，例如比较出名的`layui-admin`

但随着时代的发展，现在的后台项目几乎都是 `spa(single page web application 单页面开发)`，再使用以前的方案来实现标签导航显然是不合适的。但是目前大部分的业务系统都希望有这个页签导航，这都是之前旧系统留下来的用户习惯导致了，既然有这个需求，当然要开发该功能。

目前的方案大致为： 运用 [keep-alive](https://cn.vuejs.org/guide/built-ins/keep-alive.html#keepalive) 和 `router-view` 的结合。

```html
 // @/layout/components/AppMain.vue
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

顶部标签栏导航实际作用相当于 `nav` 的另一种展现形式，其实说白了都是一个个 `router-link`，点击跳转到相应的页面。然后我们再来监听路由 `useRoute` Hook 的变化，来判断当前页面是否需要重新加载或者已被缓存。

## 全局状态管理tagsView
目前标签栏导航组件`@/layout/components/TagsView`的所有变量、状态、交互都在pinia管理器`@/store/base/tagsView.ts`里面处理。

`tagsView.ts` 主要维护了两个数组。

* `visitedViews` : 用户访问过的页面 就是标签栏导航显示的一个个` tag `数组集合
* `cachedViews` : 实际` keep-alive `的路由。可以在配置路由的时候通过 `meta.cache` 来设置是否需要缓存这个路由 默认都缓存。[配置文档](/guide/router-and-nav)


`tagsView.ts`还维护了多页签的右键菜单功能

![图 1](/images/20220826020301.png)  

主要的功能包括：

1. 刷新当前页面：这个功能就是通过[刷新当前路由](../guide/router-and-nav.md#刷新当前路由)的原理实现的
2. 关闭当前：在`visitedViews`和`cachedViews`两个数组中，找到当前路由的对象，删除掉，并跳转到最后的标签页
3. 关闭其他：还是遍历上面两个数组，除了固定的标签页和当前标签页，其他路由对象都删除。
4. 关闭左侧和右侧：就是遍历上面两个数组，找到当前路由的索引，然后当前路由前后对象删除掉。
5. 关闭所有：就是把除了固定的标签页，其他路由对象全部删除

## 注意事项
由于目前 `keep-alive `和` router-view` 是强耦合的，而且查看文档和源码不难发现` keep-alive` 的 [include](https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude) 默认是优先匹配组件的 `name` ，所以在编写路由 `router` 和路由对应的 `view component` 的时候一定要确保 两者的 `name` 是完全一致的。(切记 `name `命名时候尽量保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)

vue3中官网提示： `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例
同样，也不能在单文件组件`<script setup>`里面生效。
实践得出，在需要被缓存的组件和其子组件中都不能使用`<script setup>, 而改使用export defalut`
而且，单文件组件setup里面定义的变量会作用到全局，所以最好加一个name属性，或者使用`export defalut`导出函数

::: tip 
在 3.2.34 或以上的版本中，使用` <script setup> `的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明。
:::

::: danger
vue3这个组件能不能被缓存还没有经过验证，这份文档后面再补充完善
:::

## 缓存不适合场景

目前缓存的方案对于某些业务是不适合的，比如文章详情页这种 `/article/page1`, `/article/page2`，他们的路由不同但对应的组件却是一样的，所以他们的组件` name` 就是一样的，就如前面提到的，`keep-alive`的` include `只能根据组件名来进行缓存，所以这样就出问题了。目前有两种解决方案：

* 不使用` keep-alive `的 `include` 功能 ，直接是用 `keep-alive` 缓存所有组件，这样子是支持前面所说的业务情况的。 前往`@/layout/components/AppMain.vue`文件下，移除include相关代码即可。当然直接使用` keep-alive` 也是有弊端的，他并不能动态的删除缓存，如果想实现在vue3上，动态删除已缓存的组件，后续项目有需要的话，我再重新出一份教程。

## Affix 固钉
当在声明路由是 添加了 Affix 属性，则当前tag会被固定在 tags-view中（不可被删除）

![图 2](/images/20220826042951.png)  

```ts
 {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          cache: true,
          affix: true   // <-------- 加上这个属性即可
        }
      }
    ]
  }
```

## 移除

其实 keep-alive [源码](https://github.com/vuejs/vue/blob/dev/src/core/components/keep-alive.js)不复杂，但逻辑还是蛮绕的，之前尤大自己修复一个 bug 的时候也不小心搞错了，连发两个版本来修复，所以如果没有标签导航栏需求的用户，建议移除此功能

移除的逻辑也非常简单，只需要在环境变量配置系统配置即可

```ts
// src/environment/modules/dev.ts
const ENV: FitsSetting = {
    system: {
        ...
        tagsView: true,
        ...
    },
   
}

```

**如果需要移除代码，可以按下面步骤执行**
1. 找到文件`@/layout/components/AppMain.vue`移除`keep-alive`

```html
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
     
          <component :is="Component" :key="route.fullPath" />
       
      </transition>
    </router-view>
  </section>
</template>
```

2. 然后移除整`个 @/layout/components/TagsView `文件夹
3. 把`@/layout/components/index `和` @/layout/Layout.vue`· 移除相应的依赖
4. 最后把`src/store/base/tagsView.ts`相关状态管理器删除即可。