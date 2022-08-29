---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-26
---

# 新增页面

这里主要为了各位开发介绍一下如何做一个新的页面的关键流程，大大地提升各位的开发速度。

::: tip 提醒各位开发者
开发新页面之前，可以提前先阅读[风格指南](/guide/style-guide),了解各个环节的编码规范和命名规范
:::

## 新增路由

如果熟悉` vue-router `的配置就很简单了。

首先在 `src/router/modules/*` 目录中增加具体的业务系统需要添加的路由。

例如：在一级目录`系统管理`里面新增一个二级目录`组织机构`，里面再新增一个`用户管理`页面

```ts
import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

const systemRouter: RouteRecordRaw = {
    path: "/sysManger",
    component: Layout,
    redirect: "/sysManger/orgin",
    meta: { title: "系统管理" },
    children: [
        {
            path: "orgin",
            name: "SysmangerOrgin",
            redirect: "/sysManger/orgin/user",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "组织机构"},
            children: [
                {
                    path: "user",
                    name: "SysmangerOrginUser",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "用户管理" },
                },
               
            ]
        },
    ],
};
export default systemRouter;

```

::: warning 新建路由要关注几点内容
1. 如果是建立三级路由的话，要关注`redirect`这个属性，一级目录会重定向到二级目录，二级重定向到三级目录，它们的重定向的路径不一样。
2. 无论是三级路由还是二级路由，一级路由（根路由）中的`Path`属性，一定要写上`/`斜杠，它的子路由可以不用写`/`
3. 路由中的`name`属性会影响两点内容，第一会影响`keep-alive`的缓存，所以这里的`name`的命名应该以你的组件的文件名字一样，大写开头 (PascalCase)命名，类似于`SysmangerOrginUser`, 第二点会影响`const route = userRoute()`钩子函数,页面跳转时，可以通过`name`名进行跳转`route.push({name: 'SysmangerOrginUser'})`
:::

如果按照上面的步骤配置路由，你会发现侧边栏就会出现如图所示的二级目录了

![图 3](/images/20220826055429.png)  

不过细心的你可以发现了，这个菜单没有下拉箭头，由于` children `下面只声明了一个路由所以不会有展开箭头，如果`children`下面的路由个数大于` 1 `就会有展开箭头，如下面所示。 如果你想忽视这个自动判断可以使用 `alwaysShow: true`，这样它就会忽略之前定义的规则，一直显示根路由。详情见[路由和侧边栏](/guide/router-and-nav.md#侧边栏)

![图 4](/images/20220826055713.png)  

---

### 多级目录(嵌套路由)


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

## 新增view视图

新增完路由之后不要忘记在` @/views` 文件下 创建对应的文件夹，

* 一般一个一级路由（路由）对应一个文件夹，二级路由对应文件夹，文件夹的命名最好跟路由的`path`命名一样，横线连接 (kebab-case)命名
* 如果新建的view界面相对简单，只需要建一个`.vue`文件即可，可采用大写开头 (PascalCase)命名组件,如果界面比较复杂，需要多个组件结合，可以建一个入口文件`index.vue`，把其他拆解的组件放到对应的`component`里面，如下图
  
![图 5](/images/20220826061236.png)  


## 新增公共组件

个人写 vue 项目的习惯，在全局的` @/components `只会写一些全局的组件，如富文本，各种搜索组件，封装的日期组件等等能被公用的组件。每个页面或者模块特定的业务组件则会写在当前` views` 下面。如：`@/views/user/components/xxx.vue`。这样拆分大大减轻了维护成本。

**请记住拆分组件最大的好处不是公用而是可维护性**

在`FitsAdmin`的项目中，有封装好的一些业务组件，这些封装好的组件，已经全局导入，可以直接使用，至于各个项目组的不同业务系统，在开发过程中有一些公共组件需要封装的，可以封装在全局的` @/components `文件夹下面

## 新增api、untils、store、types、model

1. `@/api `文件夹下创建本模块对应的 api 服务。最好还是根据路由的模块的`path`属性保持统一
2. `@/untils`文件夹是存放工具类，公共方法，不同业务模块，最好也建个目录维护同模块的方法
3. `@/store/modules/*`，如果业务系统需要建立不同模块的状态管理的话，可以在此目录下存放
4. `@/types`，这个文件夹是存放全局声明的interface接口类和type类型，按业务系统需要新建路由模块的文件夹名
5. `@/model/*`,存放是接口返回的实体出参（前端建表功能），还有各种业务的实体类，公共变量的实体化默认值等操作，基本上在api上建相应的文件夹的话，这样也要新建


## 新增样式

页面的样式和组件是一个道理，全局的`@/style` 放置一下全局公用的样式，每一个页面的样式就写在当前 views下面，请记住加上`scoped` 或者`命名空间(父级类名)`，避免造成全局的样式污染。

```vue
<!--声明语言，并且添加scoped-->
  <style lang="scss" scoped>
  </style>
    <!--如果要重写一些UI库的样式，类似elementUI，可以把scoped的属性去除，但是记得要在最外层包裹一个当前页面的父选择，以免影响其他页面的样式-->
  <style lang="scss" >
    .wrapp{
      el-button{

      }
    }
  </style>
```