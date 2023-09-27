/*
 * @Author: caogj 
 * @Date: 2023-09-27 15:14:42 
 * @Last Modified by: caogj
 * @Last Modified time: 2023-09-27 15:19:53
 */

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
        const _router = router.resolve(location);
        /* =======================记录history.state的值  of  start============================================= */
        if (!router.state) {
            // 初始化state属性
            router.state = {}
            // 这步是关键代码，当页面刷新时，当前路由的history.state对象虽然保留了，但是并没有记录在router.state属性中。因此这里要做一个预防操作
            // 通过解构赋值得到stateParams，back/current/forward这些参数是vue-router源码中要记录在history api的固定属性。
            const { back, current, forward, replaced, position, scroll, ...stateParams } = history.state;
            if (Object.keys(stateParams).length !== 0) {
                router.state[currentRoute.value.fullPath] = stateParams
            }
        }
        if (!location.state && router.state[_router.fullPath]) {
            location.state = router.state[_router.fullPath]
            to[0] = location
        }

        if (location.state && !router.state[_router.fullPath]) {
            router.state[_router.fullPath] = location.state
        }
        /* =======================记录history.state的值  of  end============================================= */
        /**
         * 这里选择fullpath属性进行判断的原因是，<component>组件使用的key是以fullpath属性
         */
        if (_router.fullPath === currentRoute.value.fullPath) {
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
        const _router = router.resolve(location);
        /* =======================记录history.state的值  of  start============================================= */
        if (!router.state) {
            // 初始化state属性
            router.state = {}
            // 这步是关键代码，当页面刷新时，当前路由的history.state对象虽然保留了，但是并没有记录在router.state属性中。因此这里要做一个预防操作
            // 通过解构赋值得到stateParams，back/current/forward这些参数是vue-router源码中要记录在history api的固定属性。
            const { back, current, forward, replaced, position, scroll, ...stateParams } = history.state;
            if (Object.keys(stateParams).length !== 0) {
                router.state[currentRoute.value.fullPath] = stateParams
            }
        }
        if (!location.state && router.state[_router.fullPath]) {
            location.state = router.state[_router.fullPath]
            to[0] = location
        }

        if (location.state && !router.state[_router.fullPath]) {
            router.state[_router.fullPath] = location.state
        }
        /* =======================记录history.state的值  of  end============================================= */
        /**
         * 这里选择fullpath属性进行判断的原因是，<component>组件使用的key是以fullpath属性
         */
        if (_router.fullPath === currentRoute.value.fullPath) {
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
    // 通过reload属性决定当前组件是否刷新，解决页面如果没有缓存的情况下，第一次打开会刷新两次的效果
    if (!reload) return
    // 开启进度条
    NProgress.start();
    tagsView.addExcludeView(router)
    await nextTick()
    // 防抖设置，防止频繁点击组件刷新导致性能问题
    const _debounce = debounce(async () => {
        tagsView.delExcludeView(router)
        NProgress.done()
    }, 100)
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
    interface ObjectOf<state> {
        [fullPath: string]: state
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
        /** 新增state对象，通过fullpath作为键，history.state作为值，进行保存参数 */
        state: ObjectOf<any>
    }
}