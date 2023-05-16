import useStore from "@/store";
import eventBus from "@/utils/base/EventBus";
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
// 全局变量，解决通讯问题,
const objectClass = {
    // 是否使用keepalive缓存组件
    keepAlive: true,
    // 是否使用默认缓存,这个属性跟FitsRouterView组件defaultCache相关
    defaultCache: true,
    // 全局的路由守卫，多个FitsRouterView组件只会生成一次
    beforeEach: false,
    hasDestroyed: false,
    routerRefresh: false
};

const wrapRouter = {
    getDefaultCached() {
        return objectClass.defaultCache
    },
    setDefaultCached(isCache: boolean) {
        objectClass.defaultCache = isCache
    },
    getHasDestroyed() {
        return objectClass.hasDestroyed
    },
    setHasDestroyed(hasDestroyed: boolean) {
        objectClass.hasDestroyed = hasDestroyed
    },
    getRouterRefresh() {
        return objectClass.routerRefresh
    },
    setRouterRefresh(routerRefresh: boolean) {
        objectClass.routerRefresh = routerRefresh
    },
    getKeepalive() {
        return objectClass.keepAlive
    },
    setKeepalive(keepAlive: boolean) {
        objectClass.keepAlive = keepAlive
    },
    getBeforeEach() {
        return objectClass.beforeEach
    },
    setBeforeEach(beforeEach: boolean) {
        objectClass.beforeEach = beforeEach
    },
    wrap(router: Router) {
        const { tagsView } = useStore();
        // if (!wrapRouter.getBeforeEach()) {
        //     router.beforeEach(before)
        //     router.afterEach((to: any) => {
        //         setTimeout(() => {
        //             console.log('路由进来后')
        //             tagsView.addCachedView(to);
        //         }, 300)
        //     })
        //     wrapRouter.setBeforeEach(false)
        // }
        const { push, replace, go, currentRoute } = router;
        // 检查路由有没有设置拓展cache属性
        function checkSetCache(location: any) {
            return location && (typeof location.cache === 'boolean');
        }
        function setCache(location: any) {
            if (location && typeof location.cache === 'boolean') {
                wrapRouter.setKeepalive(location.cache);
            } else {
                // 如果push里面没有传cache的参数，就拿FitsRouterView组件defaultCache的默认值
                wrapRouter.setKeepalive(wrapRouter.getDefaultCached())
            }
        }

        router.push = function (...args) {
            const location = args[0];

            // console.error(router.resolve(location))
            setCache(location);
            return push.apply(this, args)
        }


        /**
         * 刷新缓存的页面
         */
        router.reload = function (...args) {
            const location = args[0];
            currentRoute.value.meta = { ...currentRoute.value.meta, cache: false }
            /**
             * 这里选择fullpath属性进行判断的原因是，<component>组件使用的key是以fullpath属性
             */
            if (router.resolve(location).fullPath === currentRoute.value.fullPath) {
                wrapRouter.setRouterRefresh(true);
                eventBus.emit('FitsRouterViewEvents', currentRoute.value)
            }
            // eventBus.emit('FitsRouterViewEvents', currentRoute.value)
            return push.apply(this, args)
        };

    }
}

export default wrapRouter