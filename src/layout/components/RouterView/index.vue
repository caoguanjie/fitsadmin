<template>

    <router-view v-slot="{ Component, route }">
        <transition name="router-fade" mode="out-in" enter-from-class="router-fade-enter">
            <keep-alive :include="cachedViews">
                <component :is="Component" :key="route.matched.length > 3 ? undefined : route.fullPath" />
            </keep-alive>
        </transition>
        <!-- <component :is="Component" v-else :key="route.matched.length > 3 ? undefined : route.fullPath" /> -->
    </router-view>


</template>
<script lang="ts">
import useStore from '@/store';
import wrapRouter from './warpRouter';
import { PropType } from 'vue';
import eventBus from '@/utils/base/EventBus';
import { debounce } from 'lodash';
import { RouteLocationNormalized } from 'vue-router';
/**
 * 因为router-view, Transition, KeepAlive 三个组件是组合使用
 * @type simple 是指只渲染一个标签router-view
 * @type noTransition 是指渲染 router-view、KeepAlive两个组件，这个是默认值
 * @type all 是指渲染 router-view、Transition、KeepAlive 三个所有组件
 */
type FitsRouterViewType = 'simple' | 'noTransition' | 'all'
export default {
    name: 'FitsRouterView',
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
        const keepAlives = ref()
        const instance = getCurrentInstance()
        // 把组件全局的默认属性传到router方法
        wrapRouter.setDefaultCached(props.defaultCache);
        wrapRouter.setHasDestroyed(false);
        const { tagsView } = useStore();
        const excluded = ref<any>([])
        const cachedViews = computed(() => tagsView.cachedViews);
        const isRouterRefresh = ref(true)
        /**
                * 防抖设置，防止频繁点击组件刷新导致性能问题
                */
        const _debounce = debounce(async (router: any) => {

            // }, 300)
        }, 0)
        const current = ref<any>(null)
        function deleteCache(router: any) {
            const keepAlive: any = instance?.refs.keepAlives
            const vCache = keepAlive && keepAlive.$ && keepAlive.$.__v_cache;
            if (vCache) {
                current.value = vCache.get(router.fullPath);
                if (current.value) {
                    vCache.delete(router.fullPath);
                }
            }
        }

        onMounted(() => {
            console.warn(keepAlives.value, instance?.refs.keepAlives)
            // const keepAlive: any = instance?.refs.keepAlives
            // console.log(keepAlive && keepAlive.$ && keepAlive.$.__v_cache)
            // if (props.mode === 'noTransition') {
            eventBus.off('FitsRouterViewEvents')
            eventBus.on('FitsRouterViewEvents', (router: RouteLocationNormalized) => {
                console.log(router)
                if (router.meta.cache) {
                    tagsView.addCachedView(router)
                } else {
                    // excluded.value.push(router.name)
                    isRouterRefresh.value = false;
                    // deleteCache(router)
                    tagsView.delCachedView(router)
                    console.error(router, '前进')
                    nextTick(() => {
                        // setTimeout(() => {
                        isRouterRefresh.value = true;
                        router.meta.cache = true
                        // excluded.value = []
                        tagsView.addCachedView(router)
                    })

                }

            })
            // }
        })



        return {
            cachedViews,
            excluded,
            isRouterRefresh
        }
    }
}
</script>