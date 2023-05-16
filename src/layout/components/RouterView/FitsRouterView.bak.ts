
/**
 * 知识拓展：
 * @function resolveComponent 按名称解析component返回一个Component,否则返回接收的参数name，只能在render或setup函数中使用，一般用于解析那些全局声明的组件
 * @function createVNode 创建dom节点，跟h()函数作用一样，但是在VUE3中createVNode()函数的功能比h()函数要多且做了性能优化，渲染节点的速度也更快。
 * @function openBlock openBlock函数，逻辑非常简单，给数组blockStack添加一个或为null或为[]的元素。这个数组和createVNode相关api配合使用才行
 * @function createBlock createBlock 函数是一个低级别的 API，用于手动创建一个 VNode（虚拟节点），在 Vue 3 中，由于使用了基于函数式编程的 API 设计，可以使用 createBlock 和其他函数来手动创建 VNode，以构建自定义的渲染函数或组件
 * @function withCtx 通过对创建slot内容的vnode函数通过withCtx包装，实现slot中访问的是父组件的作用域
 */
import { createVNode, App, nextTick, resolveComponent, defineComponent, resolveDynamicComponent, withCtx, VNode, KeepAlive, Transition, openBlock, createBlock, PropType, createCommentVNode } from 'vue';
import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import useStore from '@/store';
import wrapRouter from './warpRouter';
import { debounce } from 'lodash';
import eventBus from '@/utils/base/EventBus';
/**
 * 因为router-view, Transition, KeepAlive 三个组件是组合使用
 * @type simple 是指只渲染一个标签router-view
 * @type noTransition 是指渲染 router-view、KeepAlive两个组件，这个是默认值
 * @type all 是指渲染 router-view、Transition、KeepAlive 三个所有组件
 */
type FitsRouterViewType = 'simple' | 'noTransition' | 'all'
export const FitsRouterView = defineComponent({
    name: 'FitsRouterView',
    abstract: true,
    props: {
        mode: {
            type: String as PropType<FitsRouterViewType>,
            default: 'noTransition'
        },
        //只有名称匹配的组件会被缓存	
        include: [Array, RegExp, String],
        // 任何名称匹配的组件都不会被缓存	
        exclude: [Array, RegExp, String],
        max: {
            type: Number,
            default: 20
        },
        // router-view名称
        name: String,
        // 配合 router-view 的 Transition组件的动画效果名字
        transitionName: String,
        // Transition组件的动画效果 mode 
        transitionMode: String,
        // 设置是否默认缓存, 默认值是开启缓存
        defaultCache: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        // 把组件全局的默认属性传到router方法
        wrapRouter.setDefaultCached(props.defaultCache);
        wrapRouter.setHasDestroyed(false);
        // 是否被销毁
        const { tagsView } = useStore();
        const router = useRouter();
        // 是否路由刷新
        const isRouterRefresh = ref(true)
        const transitionProps = {
            name: props.transitionName ?? 'router-fade',
            mode: props.transitionMode ?? 'out-in',
            enterFromClass: props.transitionName ? `${props.transitionName}-enter` : 'router-fade-enter'
        }
        // const cachedViews = computed(() => props.defaultCache ? tagsView.cachedViews : [])
        const cachedViews = tagsView.cachedViews
        // const exclude = ref<any>(props.exclude ?? [])
        const exclude = props.exclude ?? []
        const keepaliveProps = {
            include: tagsView.cachedViews,
            exclude: tagsView.excludeViews,
            max: props.max
        }
        /**
         * 防抖设置，防止频繁点击组件刷新导致性能问题
         */
        const _debounce = debounce(async (router) => {
            // isRouterRefresh.value = false;
            // tagsView.delCachedView(router)
            // console.error(router, '前进')
            // await nextTick()
            // setTimeout(() => {
            //     isRouterRefresh.value = true;
            //     router.meta.cache = true
            //     tagsView.addCachedView(router)
            // }, 100)
            isRouterRefresh.value = true;
            tagsView.delExcludeView(router)
        }, 200)

        onMounted(() => {
            // if (props.mode === 'noTransition') {
            eventBus.off('FitsRouterViewEvents')
            eventBus.on('FitsRouterViewEvents', (router: RouteLocationNormalized) => {
                console.log(router)

                if (router.meta.cache) {
                    tagsView.addCachedView(router)
                } else {
                    isRouterRefresh.value = false;
                    tagsView.addExcludeView(router)
                    _debounce(router)
                    // isRouterRefresh.value = false;
                    // // keepaliveProps.exclude.push(router.name)
                    // nextTick(() => {
                    //     // isRouterRefresh.value = true
                    //     // keepaliveProps.exclude = []

                    // })
                    // setTimeout(() => {
                    //     isRouterRefresh.value = true
                    // }, 300)

                    // tagsView.delCachedView(router);

                    // nextTick(() => {
                    //     isRouterRefresh.value = true;
                    //     // tagsView.addCachedView(router)
                    //     tagsView.delExcludeView(router)
                    // })
                }

            })
            // }
        })



        /**
         * FitsRouterView组件销毁时，这里触发的场景有以下几种
         * 1. 三级路由跳转到二级路由，路由的层级减少的时候
         * 2、退出登录回到登录页等等
         */
        onUnmounted(() => {
            // hasDestroyed.value = true
            wrapRouter.setHasDestroyed(true)
        })




        /**
         * 用于判断是否存在缓存
         * 1. 如果props.defaultCache属性为false，就忽略路由meta信息里面的cache属性，也就是meta: {cache: true}无效
         * 2. 当props.defaultCache = true, 
         */
        function isHasCached() {

        }



        // 广播一个refresh

        // 简单的routeview模板
        const singleRouterView = createVNode(resolveComponent('router-view'), { name: props.name })
        // 没有Transition组件的模板
        const noTransitionTeml = createVNode(resolveComponent('router-view'), { name: props.name }, {
            default: withCtx(({ Component, route }: { Component: VNode, route: RouteLocationNormalizedLoaded }) => {
                return [
                    (openBlock(), createBlock(KeepAlive, { ...keepaliveProps }, [
                        (openBlock(), createBlock(resolveDynamicComponent(Component), {
                            // 这里最多支持4层嵌套路由，后面如要要拓展无限层级的话，这里应该要把层级通过props传进来，level-1就是正常的
                            key: route.matched.length > 3 ? undefined : route.fullPath
                        }))
                    ], 1032, ["include", "exclude", "max"]
                    ))
                ]
            })
        })

        return () => {
            if (props.mode === 'simple') {
                console.error('simple', singleRouterView, keepaliveProps)
                return singleRouterView
            } else if (props.mode === 'noTransition') {

                if (!isRouterRefresh.value) {
                    console.error('createCommentVNode', isRouterRefresh, keepaliveProps)
                    return createCommentVNode("v-if", true)
                } else {
                    console.error('noTransitionTeml', isRouterRefresh, keepaliveProps)
                    return noTransitionTeml
                }

            } else {
                console.error('all', keepaliveProps)
                return createVNode(resolveComponent('router-view'), { name: props.name }, {
                    default: withCtx(({ Component, route }: { Component: VNode, route: RouteLocationNormalizedLoaded }) => {
                        return [
                            (openBlock(), createBlock(Transition, transitionProps, {
                                default: () => (openBlock(), createBlock(KeepAlive, keepaliveProps, [
                                    isRouterRefresh ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                                        key: route.matched.length > 2 ? undefined : route.fullPath
                                    })) : createCommentVNode("v-if", true)
                                ], 1033, ["include", "exclude", "max"]
                                ))
                            }))
                        ]
                    })
                })
            }


        }
    },

})

export default {
    install: (app: App) => {
        app.component(FitsRouterView.name, FitsRouterView);
        if (!app.config.globalProperties.$router) {
            console.error('FitsRouterView应该在vue路由器之后安装！否则可能会导致部分故障。');
            return;
        }
        wrapRouter.wrap(app.config.globalProperties.$router)
    }
}

// (openBlock(), createBlock(resolveDynamicComponent(Component), {
//     key: route.matched.length > 2 ? undefined : route.fullPath
// }))
// return createVNode(RouterView, { name: props.name }, {
//     default: withCtx((Component: VNode, route: RouteLocationNormalizedLoaded) => {
//         return createVNode(Transition, { name: 'router-fade', mode: 'out-in' }, {
//             default: () => createVNode(KeepAlive, { include: [] })
//         })
//     })
// })