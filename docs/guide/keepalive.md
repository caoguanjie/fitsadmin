---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2023-05-16
---

# Keepalive页面缓存机制

## keepalive是什么？
keep-alive是Vue的内置组件，而且是一个抽象组件，由于是一个抽象组件，所以在vue页面渲染完毕后不会被渲染成一个DOM元素,使用keep-alive包裹动态组件时，会缓存不活动的VNode组件实例，而不是销毁它们,能在组件切换过程中将VNode状态保留在内存中，防止重复渲染DOM，从而节省性能，结合vue-router中使用。可以缓存某个view的整个内容。

## 实现原理
1. 获取 keep-alive 包裹着的第一个子组件对象及其组件名(ComponentName)
2. 根据(组件props属性)设定的 `include/exclude`（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例，注意：在`include/exclude`数组里面同时存在组件A的`Name`的话，`exclude`的优先级会更高，所以会先执行不缓存。
3. 根据组件 `name` 和 `router-name` 生成缓存 Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在,直接取出缓存值并更新该 key 所代表的组件实例
4. 在 `this.cache` 对象中存储该组件实例并保存` key `值，之后检查缓存的实例数量是否超过` max `的设置值,超过则根据` LRU 置换策略`删除最近最久未使用的实例（即下标为 0 的 key）

## LRU 缓存淘汰算法
LRU是 Least Recently Used 的缩写，即`最近最少使用`。
当缓存使用的空间达到上限后，就需要从已有的数据中淘汰一部分以维持缓存的可用性，而淘汰数据的选择就是通过LRU算法完成的。
它的核心思想是当缓存满时,会优先淘汰那些`最近最少使用`的缓存对象。

借助其他大佬画的图，加深理解一下，示例设置缓存大小为3，依次访问页面

![图 1](/images/20230516052914.png)  


## 使用场景

1. 本框架用了多页签的展示方式，通过切换不同页签来切换组件，这时候需要缓存组件，保留当前页面的数据和停留的位置
2. 用户在某个列表页面选择筛选条件过滤出一份数据列表，由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。这个业务场景，我们的前端开发人员应该很了解，在ionic的app框架中，用的就是这种缓存方式。app页面在前进的时候，会缓存上一个页面的数据和停留的位置
   
## 优缺点

### keepalive的优点
1. 保留页面的数据状态和停留的位置
2. 避免组件反复创建和渲染，有效提升系统性能

### keepalive的缺点
1. 需要知道组件的 name，项目复杂的时候不是很好的选择
2. 官方不支持多层嵌套路由的缓存，也就是keepalive只能缓存二级路由，三级及其以上的嵌套路由不生效。具体情况请看：[传送门](https://github.com/pure-admin/vue-pure-admin/issues/67)
![图 2](/images/20230516054149.png)  
3. keepalive缓存的其实是VNode的组件实例，所以会不断增加内存占用，大量组件被缓存的话，会导致页面崩溃，要开发者做相应的缓存清理
4. keepalive没有专门的缓存清理方法，需要开发结合`include/exclude`属性进行相应处理
5. 被缓存的页面数据不是发生变化，所以需要每个组件配合组件生命周期钩子函数`activated`和`deactivated`进行业务处理，造成代码冗余，甚至会影响一些第三方库的渲染。


## 遇到的瓶颈
在研究keepalive的原理过程中，对keepalive有了更深刻的了解，简单来说keepalive是个简单的vue3组件，它的实现原理并不是很复杂，导致了其实官方对它并不是很重视，它的缺点比优点多得多，但是在一定的业务场景中，你又不得不“低头”使用，我在使用它的过程中，遇到的问题跟它的缺点差不多，
### 1. 多层嵌套路由无法正常的缓存组件实例。
这个网上已经有很非常多的解决方案了，但是这些解决方案都是治标不治本，我在研究过程中，就是想找到`治标`的方案，但是经过研究和实践，我已经得到结论了，`keepalive`组件和`route-view`组合一起用存在先天缺陷，在路由模块文档中，我们可以知道三层路由，需要2个`router-view`标签，当三层路由所在组件被缓存好之后，再跳转去二级路由所在的页面，那么三级路由所缓存的组件实例将被失效。
![图 3](/images/20230517120123.png)  

### 2. 缓存组件需要占用很多内存
经过实践得出，框架缓存大概20个页面，可能需要200m的内存，这个不是固定的，重点要看缓存页面的大小来决定，只是个参考值。这些占用的内存是不会释放的，因为你的页面一直在停留在当前页，除非关闭浏览器的选项卡标签。这个后期可以根据各个项目反馈的情况，再一次进行优化，优化思路可以根据参考：[keepalive坑点](https://juejin.cn/post/6850418114346106894)

### 3. 缓存组件存在很多未知的坑点
keepalive遇到的坑点可能需要前端们在项目开发过程中，不断遭遇然后汇总到框架组这边来，收录然后给出相应的解决方案，目前最大的问题是缓存的页面切换是不会改变数据和界面的，如果切换时需要改变数据，要结合组件生命周期钩子函数`activated`和`deactivated`进行业务处理，这样也会带来第二个问题，当你一个页面中是有多个组件组合而成的，数据都是在各自组件内请求，那么你每个组件都需要写`activated`和`deactivated`进行回调，当业务复杂时，会给大家带了非常多的麻烦，所以请各位开发留意这种情况。

## 框架的终极解决方案
1. FitsAdmin框架将全局配置`默认缓存所有页面`
2. FitsAdmin框架将所有三级或者三级以上的路由，通过逻辑转换，变成二级路由
3. FitsAdmin框架将重写`vue-router`的`push/replace/go/back/forword`等api函数，让开发自定义决定`前进`、`后退`的页面是需要缓存还是取消缓存
4. FitsAdmin框架将利用路由守卫`onBeforeRouteUpdate`和`afterEach`控制当前组件能否实现刷新功能，实现缓存组件的销毁动作


## 框架缓存机制的交互设计

### 1.多页签切换所展示的页面都是被缓存的页面
> 左右切换并不会更新页面，如果要更新页面，只能使用右键菜单的刷新当前页面功能
![图 4](/images/20230517015812.png) 
 
![图 5](/images/20230517020420.png)  


### 2. 重复点击侧边栏菜单能刷新当前页面
> 点击侧边栏菜单，新开的页面会在多页签上显示，切换上一个页面菜单，会显示上一个缓存页面，不会刷新上一个页面


<video  width="1497px" height="615px"  muted="" controls autoplay loop><source src="/images/QQ20230517-143646-HD.mp4" type="video/mp4"></video>

### 3. 操作浏览器的前进后退按钮使用的还是缓存的页面

综上所述，可以概括几点内容
1. 所有前进的（新开的）页面都是新页面，所有后退的页面都是缓存页面
2. 在已有的路由历史堆栈里面，无论是通过侧边栏访问、还是多页签访问，都是访问已经被缓存的页面
3. 如果对缓存的页面要进行刷新处理，可以有以下三种办法：
    * 重复点击侧边栏同一个菜单
    * 多页签右键菜单中的`刷新当前路由`操作
    * 编程式导航调用:`router.push({path:'/cache-page-a', cache: false})` 或者 `router.go(-1, {cache: false})`


## 旧项目的升级流程
### 涉及的项目文件清单
::: tip
前端开发者们，可以根据以下的清单列表，去FitsAdmin框架源码中，找到相应的代码进行迁移升级
:::

```sh
├── tsconfig.json                        # 新增规则：关闭class类属性必须要要初始化的值提示
├── src                                 
│   ├── environment
│       ├── model.ts                     # 增加全局设置，keepalive、keepaliveMax两个属性的默认值      
│       └── type.d.ts                    # 增加全局设置的声明变量      
│   ├── layout                           
│       └── components
│           ├── TagsView
│               └── index.vue            # 增加router-link组件to属性的cache参数值
│           └── AppMain.ts               # 设置keep-alive组件相关配置，主要逻辑内容
│   ├── model
│       └── base 
│           └── store.ts                 # 全局设置页面缓存，默认是true
│   ├── router                           
│       ├── base                        
│           └── system.ts                # 调整框架的嵌套路由的二级路由的component属性
│       ├── index.ts                     # 设置重写vue-router的方式
│       ├── routerGuard.ts               # 增加后置路由守卫判断，实现组件刷新功能
│       └── utils.ts                     # 增加重写vue-router api的关键代码，并且一些拓展vueRouter的一些ts声明
│   ├── store                           
│       └── base                         # 框架本身预定义的一些全局状态管理
│           └── permission.ts            # 增加将三级嵌套路由全部拍成二级路由的写法
│   └── styles
│       └── transition.scss              # 新增页面切换的动画效果          

```

### 需要迁移的核心代码
::: tabs

@tab 页面缓存的核心代码

```vue
<!-- 路径：layout/components/AppMain.vue -->
<!-- :key="route.fullPath" ,key的作用，应该是多个路由指向同一个组件，应该要缓存不同的实例 -->
<!-- v-if="!excludeViews.length" 当不缓存组件的数组发生变化的时候，component要经历创建和销毁才能实现组件刷新 -->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in" enter-from-class="router-fade-enter">
        <keep-alive :include="cachedViews" :exclude="excludeViews" :max="ENV.system.keepaliveMax">
          <component :is="Component" v-if="!excludeViews.length" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import useStore from '@/store';
import ENV from '@/environment/index';
import { RouteLocationNormalized, onBeforeRouteUpdate } from 'vue-router';
import { deleteCache } from '@/router/utils';


const { tagsView } = useStore();

const cachedViews = computed(() => tagsView.cachedViews);
const excludeViews = computed(() => tagsView.excludeViews);
const router = useRouter()

/**
 * 路由更新时的路由守卫，是组件内的路由守卫，不是全局路由守卫
 */
onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
  if (!router.keepAlive) {
    console.error('onBeforeRouteUpdate', router.keepAlive)
    // 如果不需要缓存，就要删除当前组件的缓存
    deleteCache(to)
  } else {
    // 这里主要是为了预防用户直接通过push({cache:true}来设置当前路由是否可以缓存)
    to.meta.cache = true
    tagsView.addCachedView(to)
  }
  next()
})
</script>
```

@tab vue-Router相关的核心代码

1. **直接迁移`src/router/utils.ts`文件到项目文件里面**
```ts
/**
 * 拓展路由方法
 * router.push/replace接口展示的页面，会根据是否配置{cache:boolean}的参数或者router.meta.cache参数判断是否缓存页面
 * 本框架由于存在多页签展示，所以默认所有的router.meta.cache属性都是true，即默认页面都是缓存的
 * 默认页面缓存方式，例子如下：
 * router.push({name: Rolse}), router.replace({path: '/Rolse'})
 * 不使用页面缓存的方法如下：
 * router.push({name: Rolse, cache: false})
 * router.replace({name: Rolse, cache: false})
 * -------------------------------------------------
 * router.back/forward/go
 * back接口展示的页面默认优先使用缓存的内容,后退路由策略都是回退到缓存页面，不会刷新页面
 * 默认使用缓存，具体如下：
 * 1. router.back();
 * 2. router.forward();
 * 3. router.go(1);
 * 禁止使用缓存
 * 1. router.back({cache: false});
 * 2. router.forward({cache: false});
 * 3. router.go(1, {cache: false});
 * ----------------------------------
 * 缓存组件的刷新方案
 * 核心思想是：
 * 1.在调用push/replace时，判断前进的路由地址和当前的路由地址是否一致，
 * 2.如果一致则后置的路由守卫进行监听，利用exclude属性，对组件创建和销毁。
 */

import { RouteLocationNormalized, Router } from "vue-router";
import NProgress from 'nprogress'
import { debounce } from 'lodash';
import useStore from '@/store';
NProgress.configure({ showSpinner: false })
export function RouterUtils(router: Router) {
    const { push, replace, go, currentRoute } = router;

    /**
     * 如果前进路径===当前路径，刷新当前路由所映射的组件，该操作会触发全局后置路由守卫afterEach
     * 如果前进路径!==当前路径，设置前进路由是否执行缓存的判断，该操作会触发onBeforeRouteUpdate，执行删除或者添加组件缓存
     * @param to 前进路由相应对象
     * @returns 
     */
    router.push = function (...to) {
        const location: any = to[0];
        /**
         * 这里选择fullpath属性进行判断的原因是，<component>组件使用的key是以fullpath属性
         */
        if (router.resolve(location).fullPath === currentRoute.value.fullPath) {
            // 这一步主要解决左右切换页签时，同时也会刷新组件，默认切换左右页签，会一直使用缓存组件
            if (typeof location.cache === 'boolean' && location.cache === true) {
                router.routerRefresh = false
            } else {
                router.routerRefresh = true
            }

        } else {
            setCache(location)
        }
        return push.apply(this, to)
    }

    router.replace = function (...to) {
        const location: any = to[0];
        /**
         * 这里选择fullpath属性进行判断的原因是，<component>组件使用的key是以fullpath属性
         */
        if (router.resolve(location).fullPath === currentRoute.value.fullPath) {
            if (typeof location.cache === 'boolean' && location.cache === true) {
                router.routerRefresh = false
            } else {
                router.routerRefresh = true
            }
        } else {
            setCache(location)
        }
        return replace.apply(this, to)
    }

    /**
     * 这里(go as any)使用的go，是上面router.go改写后的函数，不是初始的go函数
     * !!options.cache两个感叹号能强制转换为布尔型，规避未知的风险
     * @param options 
     * @returns 
     */
    router.back = function (options: any = { cache: true }) {
        return (go as any).apply(this, [-1, { cache: !!options.cache }])
    }

    router.go = function (num, options: any = { cache: true }) {
        router.keepAlive = !!options.cache
        return (go as any).apply(this, [num])
    }
    router.forward = function (options: any = { cache: true }) {
        return (go as any).apply(this, [1, { cache: !!options.cache }]);
    };


    function setCache(location: any) {
        if (location && typeof location.cache === 'boolean') {
            router.keepAlive = location.cache
        } else {
            // 如果push等方法没有设置cache属性，使用路由表中的meta属性
            router.keepAlive = router.resolve(location).meta.cache as boolean
        }
    }




}


/**
 * 清除缓存，利用了keep-alive组件的exclude属性：任何匹配name名称的组件都不会被缓存
 * 这里要注意一点，如果发现缓存页面不生效，要先去检查组件有没有对其进行name的命名，组件的名字和route表中name要对应上，才能匹配
 * @param router 
 * @param reload 传入这个属性，可以出现进度条，其实是模拟页面刷新的交互效果，主要作用于组件取消缓存之后，刷新组件的时候一个好的交互效果
 */
export async function deleteCache(router: RouteLocationNormalized, reload = false) {
    const { tagsView } = useStore();
    // 开启进度条
    reload && NProgress.start();
    tagsView.addExcludeView(router)
    await nextTick()
    // 防抖设置，防止频繁点击组件刷新导致性能问题
    const _debounce = debounce(async () => {
        tagsView.delExcludeView(router)
        if (reload) {
            NProgress.done()
        }
    }, 200)
    /**
     * 这里200ms对应的是transition组件router-fade的动画效果，设置200ms的动画持续时间
     * 如果要改，记得要去修改src/styles/transition.scss文件的样式
     */
    _debounce()
}



/**
 * 重写router的push、go方法后，需要拓展cache属性
 */
declare module 'vue-router' {
    interface RouteLocationNamedRaw {
        cache?: boolean
    }
    interface Router {
        go(delta: number, option?: { cache: boolean }): void;
        back(option?: { cache: boolean }): void;
        forward(option?: { cache: boolean }): void;
        reload(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
        /** 判断是否需要刷新组件 */
        routerRefresh: boolean
        /** 判断是否需要对当前组件进行缓存 */
        keepAlive: boolean
    }
}
```


2. **在全局后置路由守卫增加判断，判断是否需要刷新页面**
```ts
router.afterEach((to: RouteLocationNormalized) => {
    // 当页面需要刷新时，要清空组件的缓存
    if (router.routerRefresh) {
        console.error(router.routerRefresh)
        router.routerRefresh = false
        deleteCache(to, true)
    } else {
       // something code，这部分判断就是原来的逻辑判断
    }
})
``` 

3. **进行全局的路由重新设置**

```ts
import { RouterUtils } from './utils';
/**
 * 定义一个方法，方便main.ts直接调用。
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
  // 路由方法的拓展，改写push、replace等写法,关键的代码在这里
  RouterUtils(app.config.globalProperties.$router)
}

```

@tab 将多级路由变成二级路由的关键代码

```ts
// 路径src/store/base/permission.ts
const usePermissionStore = defineStore({
    id: 'permission',
    state: (): PermissionState => ({
        routes: [],
        addRoutes: [],
        activeMenu: '',
    }),
    actions: {
        /**
         * 将多级嵌套路由处理成一维数组
         * @param routesList 传入路由
         * @returns 返回处理后的一维路由
         */
        generateFlatRoutes(accessRoutes: any) {
        const flatRoutes = [];

        for (const item of accessRoutes) {
            let childrenFflatRoutes: any = [];
            if (item.children && item.children.length > 0) {
            childrenFflatRoutes = this.castToFlatRoute(item.children, "");
            }

            // 一级路由是布局路由,需要处理的只是其子路由数据
            flatRoutes.push({ ...item, children: childrenFflatRoutes })
        }

        return flatRoutes;
        },
        /**
         * 将子路由转换为扁平化路由数组（仅一级）
         * @param {待转换的子路由数组} routes
         * @param {父级路由路径} parentPath
         */
        castToFlatRoute(routes: any, parentPath: any, flatRoutes = []) {
        const _flatRoutes: any = flatRoutes;
        for (const item of routes) {
            if (item.children && item.children.length > 0) {
            if (item.redirect && item.redirect !== 'noRedirect') {
                // ...item 是为了接受一切从后端回传的各种字段
                _flatRoutes.push({
                ...item,
                path: (parentPath + "/" + item.path).substring(1),
                });
            }
            this.castToFlatRoute(item.children, parentPath + "/" + item.path, flatRoutes);
            } else {
            _flatRoutes.push({
                ...item,
                path: (parentPath + "/" + item.path).substring(1)
            })

            }
        }

        return _flatRoutes;
        },
        generateRoutes(roles: string[]) {
            return new Promise((resolve, reject) => {
                // 省略了很多代码，重点关注以下三句
                this.setRoutes(accessedRoutes);

                const flatRoutes = this.generateFlatRoutes(accessedRoutes)
            
                resolve(flatRoutes);
                
            });
     }
})
```

这里要做几点解析说明：
* `this.setRoutes(accessedRoutes)`这句代码目的是把前端的写死的嵌套路由（三层路由或者三层以上）或者后端通过接口传输的嵌套路由，记得一定要标准的嵌套路由，保存在状态管理器内，这个树结构的数据主要用于侧边栏的显示和面包屑的显示和导航逻辑。
* `const flatRoutes = this.generateFlatRoutes(accessedRoutes)`这句代码是把三级和三级以上的路由变成二级路由后，通过`router.beforeEach`动态添加。因此实际上vue-router实际上使用的是二级路由。
  
因此各个项目组的前端开发人员，要注意这个部分的代码，如果你们开发项目是二级路由的，根本不用迁移这部分`src/store/base/permission.ts`的代码，因为你们原来就是二级路由的，直接迁移其他代码即可。但是如果你是三级路由的项目，要注意层级，更多情况你是从接口得到一个无限层级的菜单树了，你已经通过方法已经转成三级路由了，这个时候记得要再调用一下`generateFlatRoutes`方法转成二级路由
  
@tab 全局系统配置

1. 调整router.meta的noCache字段，改成cache字段。
```ts
//src/model/base/store.ts
export class RouteMeta {
    roles: string[];
    title: string;
    icon: string;
    breadcrumb: boolean;
    activeMenu: string;
    affix: boolean
    hidden: boolean
    alwaysShow: boolean
    cache: boolean
    constructor({ roles, title, icon, breadcrumb, activeMenu, affix, hidden, alwaysShow, cache }: any = {}) {
        this.roles = roles ?? []
        this.title = title ?? ''
        this.icon = icon ?? ''
        this.breadcrumb = breadcrumb ?? true
        this.activeMenu = activeMenu ?? ''
        this.affix = affix ?? false
        this.hidden = hidden ?? false
        this.alwaysShow = alwaysShow ?? false
        this.cache = cache ?? ENV.system.keepalive
    }
}

```

::: danger
前端开发者们一定要在vscode全局搜索所有的noCache字段，改成cache字段
:::

2. 增加全局的系统配置
```ts
// 路径： src/environment/type.d.ts
/**
 * 系统配置
 */
interface FitsSystemSetting {
    ...
    // 省略以上的代码
     /**
     * @desrciption 是否开启所有页面缓存
     * @default {true} 
     */
    keepalive: boolean
    /**
     * @desrciption 最大缓存页面的数量
     * @default {20} 
     */
    keepaliveMax: number

}
```

3. 给全局的系统配置增加默认值
```ts
// 路径：src/environment/model.ts
export class FitsDefaultSetting implements FitsSetting {
    InitSystemData(): FitsSystemSetting {
        ...
        // 省略以上的代码

        keepalive: true,
        keepaliveMax: 20,
    }
}
```  
@tab 其他文件

1. 新增页面切换的动画效果,路径：`src/styles/transition.scss`  

```scss
// global transition css
.router-fade-leave-active,
.router-fade-enter-active {
    transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, background 0s, color 0s, font-size 0s;
    -webkit-transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, background 0s, color 0s, font-size 0s;
    -moz-transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, background 0s, color 0s, font-size 0s;
    -ms-transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, background 0s, color 0s, font-size 0s;
    -o-transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s, background 0s, color 0s, font-size 0s;
}

.router-fade-enter {
    opacity: 0;
}

.router-fade-leave-to {
    opacity: 0;
}

```

2. 增加router-link组件to属性的cache参数值
```vue
<template>
    <!-- 只需要关注to里面的cache属性 -->
    <router-link v-for="tag in visitedViews" :key="tag.path" :data-path="tag.path"
       ...
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath, cache: true } as any" class="tags-view__item"
        ...
        >
    
      </router-link>
</template>
```

:::

## vue-router接口扩展
### router.push/replace
push/replace接口展示的页面默认不缓存功能。如果需要使用，配置cache为true。
_注意defaultCache可改变默认缓存。_

```javascript
// 默认缓存
router.push({
  name: 'list',
});
router.replace({
  name: 'list',
});

// 禁止使用缓存
router.push({
  name: 'list',
  cache: false
});
router.replace({
  name: 'list',
  cache: false
});
```

### router.back/forward/go
back接口展示的页面默认优先使用缓存的内容。如果禁止使用，配置cache为false
```javascript
// 默认使用缓存
router.back();
router.forward();
router.go(1);

// 禁止使用缓存
router.back({cache: false});
router.forward({cache: false});
router.go(-1, {cache: false});
```





## 如何设置页面不缓存

### 方式一：设置路由元信息`meta`
在路由表里面设置meta属性中的`cache`属性为`false`

```ts
 {
    path: "user",
    name: "User",
    component: () => import("@/views/system-manage/user/index.vue"),
    meta: { title: "用户管理", cache: false },
}
```

### 方式二：通过编程式导航设置`cache:false`

```ts
// 禁止使用缓存
router.push({
  name: 'list',
  cache: false
});

router.back({cache: false});
```
::: tip
如果项目需求时：点击侧边栏菜单，一定要刷新页面
也可以通过在`src/layout/components/Sidebar/Link.vue`文件设置代码`router.push({path: props.to, cache: false})`来实现强制刷新
:::
### 方式三：全局设置所有页面不缓存
```ts
// src/environment/modules/dev.ts
const ENV: FitsSetting = {
     system: {
        keepalive: false,
     }
}

```
