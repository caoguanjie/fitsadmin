import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import WujieVue from "wujie-vue3";
import { usePopperContainerId } from 'element-plus';

/**
 * 封装微前端的公共办法，本次采用 Vue 组合式 API方式使用piniajs
 * 
 */
export const useMicroFrontendsStore = defineStore('micro-frontends', () => {
    // 全局设置子应用的请求URL，端口8889是在子应用的.env上设置的
    const subURL = computed(() => {
        let _url = ''
        switch (import.meta.env.MODE) {
            case 'github':
                _url = '//caoguanjie.github.io/fitsadmin/vite-vue3/';
                break;
            case 'dev':
                _url = '//localhost:8889/vite-vue3/';
                break;
            default:
                _url = '/vite-vue3/';
                break;
        }
        return _url
    })
    const { setupApp, preloadApp, bus } = WujieVue;

    /**
     * 设置子应用的app属性
     * 这里其实就是做子应用的一些默认信息的预设置处理
     * 主要方便：启动app-startApp、预加载preloadApp两个api直接调用预先设置的参数，不用重复进行传入
     */
    function setupSubApp() {
        setupApp({
            /** 唯一性用户必须保证 */
            name: "vite-vue3-keepalive",
            /** 需要渲染的url */
            url: subURL.value,
            /** 预执行 */
            exec: true,
            alive: true,
            plugins
        });
        setupApp({
            /** 唯一性用户必须保证 */
            name: "vite-vue3-single",
            /** 需要渲染的url */
            url: subURL.value,
            /** 预执行 */
            exec: true,
            alive: false,
            /** 路由同步，主应用打开一个tab，子应用不断切换路由，那么在主应用的路由不变的情况下，浏览器的前进后退能直接控制子应用的界面切换 */
            sync: false,
            plugins
        });
        setupApp({
            /** 唯一性用户必须保证 */
            name: "webpack-vue2",
            /** 需要渲染的url */
            url: 'http://192.168.32.60:3002/',
            /** 预执行 */
            exec: true,
            // plugins
        });
    }
    /**
     * @description 预加载api
     * 在入口文件mian.ts中使用该方法，可以提前把子应用的js、css等文件提前加载到项目中，并且生成iframe表
     * 预加载可以极大的提升子应用首次打开速度
     * 但是要注意它的缺点：资源的预执行会阻塞主应用的渲染线程，遇到复杂的业务，或者首页复杂时，要考虑子应用预加载的时机，在合适的时候进行预加载。
     */
    function preloadSubApp() {
        if (window.Proxy) {
            preloadApp({
                /** 唯一性用户必须保证 */
                name: "vite-vue3-keepalive",
                /** 需要渲染的url */
                url: subURL.value,
            })
            preloadApp({
                /** 唯一性用户必须保证 */
                name: "vite-vue3-single",
                /** 需要渲染的url */
                url: subURL.value,
            })

            if (import.meta.env.MODE !== 'github') {
                preloadApp({
                    /** 唯一性用户必须保证 */
                    name: "webpack-vue2",
                    /** 需要渲染的url */
                    url: 'http://192.168.32.60:3002/',
                })
            }
        }





    }

    /**
     * 修复element-plus中有使用Teleport组件带来的副作用，导致的页面报错奔溃
     * @returns 
     */
    function fixElementPlusTeleportCrash() {
        const { id, selector } = usePopperContainerId()
        if (!document.body.querySelector(selector.value)) {
            const createContainer = (id: string) => {
                const container = document.createElement('div')
                container.id = id
                document.body.appendChild(container)
                return container
            }
            const container = createContainer(id.value)
            return () => {
                container.remove()
            }
        }
        return () => { }
    }
    return { setupSubApp, preloadSubApp, subURL, fixElementPlusTeleportCrash }



})

/**
 * 这个插件是修改：vite4 子应用样式切换丢失
 * 用于 保活模式和单例模式
 */
export const plugins = [
    {
        patchElementHook(element: any, iframeWindow: any) {
            if (element.nodeName === "STYLE") {
                element.insertAdjacentElement = function (_position: any, ele: any) {
                    iframeWindow.document.head.appendChild(ele);
                };
            }
        },
    },
]