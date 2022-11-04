// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";

// 引入svg注册脚本
import 'virtual:svg-icons-register';

import formCreate from '@form-create/element-ui';

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// VuePress 会在构建过程中生成一个 SSR 应用，用以对页面进行预渲染。一般而言，如果一段代码在客户端应用 Mount 之前就使用了浏览器或 DOM API ，我们就认为其对 SSR 不友好，即不支持 SSR 。
/**
 * 如果文档打包再次出现报错
 * 1. self is undefined
 * 2. document.getElementsByTagName is not a function
 * 3. window is not defined
 * 4. localstorge is not defined
 * 
 * 原因： 就是vuepress其实是SSR服务器渲染而成的dom节点，在ssr渲染过程中，使用 DOM API都会报错，服务端不存在dom，只有浏览器才会有dom结构。
 * 排查的方法：
 * 1. 先检查写在文档的demo组件的URL所链接的组件，导入`import { FitsTableGroupProps } from '@/fits-components';`组件库的包路径是否正常，这里要记住，路径必须是【@/fits-components】，后面连标点符号分号【；】都不能省略
 * 2、检查文档中[docs/.vuepress/config.ts]。ssr: { noExternal: ['element-plus', 'is-retry-allowed', 'fits-admin-ui']}有没有配置组件所报错的那个第三方库文件。
 * 
 */
export default defineClientConfig({
    enhance: async ({ app, router, siteData }) => {
        app.config.globalProperties.isSSR = true
        app
            .use(formCreate)
            .use(ElementPlus, {
                locale: zhCn,
            })
            .use(VXETable)
            .mixin({
                mounted() {
                    // fits-admin-ui的组件代码只加载一次，用一个全局变量控制
                    if (app.config.globalProperties.isSSR) {
                        import('../../src/fits-components').then(function (m) {
                            app.use(m.default)
                        })
                        app.config.globalProperties.isSSR = false
                    }

                }
            })

    },
});