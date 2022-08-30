---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-25
---

# 路由和侧边栏

路由和侧边栏是组织起一个后台应用的关键骨架。

本项目侧边栏和路由是绑定在一起的，所以你只有在` @/router/index.ts` 下面配置对应的路由，侧边栏就能动态的生成了。大大减轻了手动重复编辑侧边栏的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

## 配置项

首先我们了解一下本项目配置路由时提供了哪些配置项。
```js
// URL的路径，命名要横线连接 (kebab-case)
path: '/login',

// 组件的路径，路由懒加载
component: () => import('@/views/login/index.vue'),

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题

// 路由元信息meta，可以自定义各种属性，方便开发者做逻辑判断
meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，在src/assets/icons里面的svg名字
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

  // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  activeMenu: '/article/list'

  // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/*
  hidden: true // (默认 false)


// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
// 只有一个时，会将那个子路由当做根路由显示在侧边栏
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由,children底下的子路由就可以通过展开显示
  alwaysShow: true
}
```

**示例：**

```ts
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index', //重定向地址，在面包屑中点击会重定向去的地址
  hidden: true, // 不在侧边栏显示
  alwaysShow: true, //一直显示根路由
  meta: { roles: ['admin','editor'] }, //你可以在根路由设置权限，这样它下面所有的子路由都继承了这个权限
  children: [{
    path: 'index',
    component: ()=>import('permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock', //图标
      roles: ['admin','editor'], //或者你可以给每一个子路由设置自己的权限
      noCache: true // 不会被 <keep-alive> 缓存
    }
  }]
}
```

## 路由
这里的路由分为两种，`constantRoutes `和` asyncRoutes`。

`constantRoutes`： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

`asyncRoutes`： 代表那些需求动态判断权限并通过 `addRoute` 动态添加的页面。异步路由一般由接口返

::: tip 
这里所有的路由页面都使用 路由懒加载了 ，具体介绍见[文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)
:::

其它的配置和 [vue-router](https://router.vuejs.org/zh/) 官方并没有区别，自行查看文档。

::: warning 注意事项
如果这里有一个需要非常注意的地方就是 `404` 页面一定要最后加载，如果放在 `constantRoutes` 一同声明了 `404` ，后面的所有页面都会被拦截到404 
:::

## 路由守卫

这里的路由守卫主要负责动态权限路由的设置，动态路由后面将通过接口从后端获取并整合用户角色的权限控制。

**创建路由守卫**
```ts
/**
 * 定义一个方法，方便main.ts直接调用。
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

```

::: details 动态路由的关键代码
```ts
/* eslint-disable @typescript-eslint/ban-ts-comment */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus';
import { RouteLocationNormalized, Router } from 'vue-router'
import useStore from '@/store';
NProgress.configure({ showSpinner: false })
import ENV from '@/environment/index';
const whiteList = ['/login', '/404']
export const createRouterGuards = (router: Router) => {
    router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
        // 开启进度条
        NProgress.start()
        const { user } = useStore();
        const { permission } = useStore();
        // 确定用户是否已登录
        if (user && user.token) {
            if (to.path === '/login') {
                // 如果已登录，请重定向到主页
                next({ path: '/' })
                NProgress.done()
            } else {
                // 检查用户是否已获得其权限角色
                if (user.roles.length === 0) {
                    try {
                        // 获取用户信息，包括角色
                        await user.getUserInfo()
                        // 生成路由方案
                        const asscessRoutes: any = await permission.generateRoutes(user.roles)
                        // 动态添加路由
                        asscessRoutes.forEach((route: any) => {
                            router.addRoute(route);
                        });

                        // Set the replace: true, 因此导航不会留下历史记录
                        next({ ...to, replace: true })
                    } catch (err: any) {
                        // 删除token并重定向到登录页面
                        user.resetToken()
                        ElMessage.error(err || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                        NProgress.done()
                    }
                } else {
                    next()
                }
            }
        } else {
            // Has no token
            if (whiteList.indexOf(to.path) !== -1) {
                // 如果有设置白名单可以直接进入
                next()
            } else {
                // 没有访问权限的其他页面将重定向到登录页面
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    })
    
    router.afterEach((to: RouteLocationNormalized) => {
        // 关闭 进度条
        NProgress.done()

        // 设置页面标题
        if (to.meta.title) {
            document.title = to.meta.title + ' - ' + ENV.project.title
        }
    })
}

```
:::

其中 `const accessRoutes: any = await permission.generateRoutes(roles)`是根据用户角色获取拥有权限的路由(静态路由+动态路由)，后期可以根据业务系统进行改造，根据用户角色或者用户id，获取用户所能看到的菜单权限，通过接口把完整的菜单权限返回，核心代码如下：

```ts
// src/store/base/permission.ts 
import { constantRoutes } from '@/router';
import { listRoutes } from "@/api/system/menu";

const usePermissionStore = defineStore({
    id: "permission",
    state: (): PermissionState => ({
        routes: [],
        addRoutes: []
    }),
    actions: {
        setRoutes(routes: RouteRecordRaw[]) {
            this.addRoutes = routes
          	// 静态路由 + 动态路由
            this.routes = constantRoutes.concat(routes)
        },
        generateRoutes(roles: string[]) {
            return new Promise((resolve, reject) => {
              	// API 获取动态路由
                listRoutes().then(response => {
                    const asyncRoutes = response.data
                    let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                    this.setRoutes(accessedRoutes)
                    resolve(accessedRoutes)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})

export default usePermissionStore;
```

## 侧边栏
::: info 对应代码
@/layout/components/Sidebar
:::

本项目侧边栏主要基于 `element-plus` 的` el-menu` 改造。

前面也介绍了，侧边栏是通过读取路由并结合权限判断而动态生成的，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。


这里同时也改造了 `element-plus` 默认侧边栏不少的样式，所有的 `css` 都可以在 `@/styles/sidebar.scss` 中找到，你也可以根据自己的需求进行修改。

这里需要注意一下，一般侧边栏有两种形式即：submenu 和 直接 el-menu-item。 一个是嵌套子菜单，另一个则是直接一个链接。如下图：

![图 9](/images/20220825035752.png)  


在 `SidebarItem.vue` 中已经帮你做了判断，当你一个路由下面的 `children` 声明的路由大于>1 个时，自动会变成嵌套的模式。如果子路由正好等于一个就会默认将子路由作为根路由显示在侧边栏中，若不想这样，可以通过设置在根路由中设置alwaysShow: true来取消这一特性。如：

```ts
以通过设置在根路由中设置alwaysShow: true来取消这一特性。如：

// 只有一个子路由,  children.length===1
{
    path: "setting",
    name: "setting",
    redirect: "/sysManger/setting/dictionary",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "基础设置", icon: "fits-base-setting", alwaysShow: true },
    children: [
        {
            path: "dictionary",
            name: "dictionary",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "数据字典", },
        }
    ]
},

// 有更多的子路由,  children.length>=1
{
  path: '/components',
  component: Layout,
  name: 'component-demo',

  children: [
    { path: 'tinymce', component: ()=>import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
    { path: 'markdown', component: ()=>import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
  ]
}
```

::: tip unique-opened
你可以在`Sidebar/index.vue`中设置`el-menu`的属性`unique-opened`来控制侧边栏，是否只保持一个子菜单的展开。
:::

## 多级目录(嵌套路由)

如果你的路由是多级目录，如本项目`@/views/components-manage/` 那样， 有三级路由嵌套的情况下，不要忘记还要手动在二级目录的根文件下添加一个`<router-view>`。
```html
 <!-- 父级路由组件  -->
<template>
  <div>
    <!-- xxx html 内容  -->
    <router-view />
  </div>
</template>
```
例如：`@/views/components-manage/index.vue`，原则上有多少级路由嵌套就需要n-1个`<router-view>`,例如三级路由，就需要2个`<router-view>`


## 刷新当前路由

在用 spa(单页面应用) 这种开发模式之前，用户每次点击侧边栏都会重新请求这个页面，用户渐渐养成了点击侧边栏当前路由来刷新 `view` 的习惯。但现在 `spa` 就不一样了，用户点击当前高亮的路由并不会刷新 `view`，因为 `vue-router` 会拦截你的路由，它判断你的 `url` 并没有任何变化，所以它不会触发任何钩子或者是 `view` 的变化。[vue-router issue](https://github.com/vuejs/vue-router/issues/296) ，社区也对该问题展开了激烈讨论。

尤大大本来也说要增加一个方法来强刷 `view`，但后来他又改变了心意。但需求就摆在这里，我们该怎么办呢？他说了不改变` current URL` 就不会触发任何东西，那我可不可以强行触发你的 `hook` 呢？方法也很简单，通过不断改变 `url` 的 `query` 来触发 `view` 的变化。我们监听侧边栏每个 `link` 的 `click` 事件，每次点击都给 `router push` 一个不一样的 `query` 来确保会重新刷新 `view。`

```ts
clickLink(path) {
  this.$router.push({
    path,
    query: {
      t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
    }
  })
}
```

::: danger 
不要忘了在 `router-view` 加上一个特定唯一的 key，如 `<router-view :key="$route.path"></router-view>`， 但这也有一个弊端就是 `url` 后面有一个很难看的 `query` 后缀如` xxx.com/article/list?t=1496832345025`, 因为这个弊端，因此本项目不采用该方法
:::


你可以从前面的 `issue` 中知道还有很多其它方案。我在公司项目`FitsAdmin`中，现在采取的方案是判断当前点击的菜单路由和当前的路由是否一致，若一致的时候，会先跳转到一个专门 Redirect 的页面，它会将路由重定向到我想去的页面，这样就起到了刷新的效果了。

**相关例子**

![图 10](/images/20220825045227.png)  

图片所示的，多页签导航的`刷新当前页面`的功能，你会发现页面`角色管理`区域进行了刷新。它就是运用了重定向到 `@/src/views/redirect/index.vue` 页面之后再重定向回原始页面的方法。

1. 点击的时候重定向页面至path: `/redirect`
2. `redirect` 页面在重定向回原始页面


```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { params, query } = route;
const { path } = params;

router.replace({ path: '/' + path, query });
</script>
```

## 面包屑导航
::: info 对应代码
@/layout/components/Breadcrumb
:::

本项目中也封装了一个面包屑导航，它也是通过` watch useRoute()` 变化动态生成的。它和 `menu` 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。大家也可以结合自己的业务需求增改这些自定义属性。比如可以在路由中声明`breadcrumb:false`，让其不在 `breadcrumb` 面包屑显示。

**面包屑导航有两种布局样式**

1. 当业务系统需要一级目录显示在头部`navbar`的时候，`breadcrumb`组件显示在`@/layout/components/Footer`

![图 11](/images/20220825051008.png)  


2. 同样的，面包屑可以通过全局配置显示在顶部的导航栏中。

![图 12](/images/20220825051109.png)  


## 侧边栏滚动问题
::: info 对应代码
@/layout/components/Sidebar/index.vue
:::
之前版本的滚动都是用 css 来做处理的

```css
overflow-y: scroll;

::-webkit-scrollbar {
  display: none;
}
```

先这样写会有兼容性问题，在火狐或者其它低版本浏览器中都会比较不美观。其次在侧边栏收起的情况下，受限于 `element-plus`的 `menu` 组件的实现方式，不能使用该方式来处理。

所以现版本中使用了 `el-scrollbar` 组件来处理侧边栏滚动问题。

## 侧边栏外链

你也可以在侧边栏中配置一个外链，只要你在 path 中填写了合法的 url 路径，当你点击侧边栏的时候就会帮你新开这个页面。

例如：

```ts
{
  path: "external-link",
  component: Layout,
  children: [
    {
      path: "https://github.com/caoguanjie/fitsadmin",
      meta: { "title": "externalLink", "icon": "link" }
    }
  ]
}
```

## 侧边栏默认展开

某些场景下，用户需要默认展开侧边栏的某些`sub-menu`，如下图：

![图 13](/images/20220825063426.png)  

可以通过`default-openeds`来进行设置，首先找到侧边栏代码`@/layout/components/Sidebar/index.vue`

```vue
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu 
        <!--  添加本行代码  -->
        :default-openeds="['/example','/nested']" 
        :default-active="activeMenu" 
        :collapse="isCollapse" 
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item 
           v-for="route in routes" 
           :item="route" 
           :key="route.path" 
           :base-path="basePath + '/' + route.path"
           :is-collapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
```

::: danger 注意
 `:default-openeds="['/example','/nested']" `里面填写的是 子路由`children` 的 `route-path`
:::