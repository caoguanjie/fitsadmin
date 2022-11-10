/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite'
import { path } from "@vuepress/utils";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import type { Plugin, ResolvedConfig } from 'vite'
import removeConsole from 'vite-plugin-remove-console';

// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default defineConfig({
    plugins: [
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core', { 'moment': [['default', 'moment']] }],
            dts: path.resolve(__dirname, '.temp/auto-imports.d.ts'),
            dirs: [path.resolve(__dirname, '../../src')],
        }),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(__dirname, '../../src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        }),
        process.env.NODE_ENV !== 'development' && removeConsole(),
        vueSetupExtend(),
        process.env.NODE_ENV !== 'development' && removeImportPlugin(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                charset: false
            }
        },
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        }
                    }
                }
            ],
        },
    },

});

/**
 * vite插件
 * 这个插件主要解决，把src/views里面的范例，导入了fits-component组件的路径删除干净，在ssr渲染阶段不会报错
 * @returns 
 */
function removeImportPlugin() {
    let config: ResolvedConfig
    console.log('=================代码转换中==================')

    return <Plugin>{
        name: 'removeImportFitsAdminUI',
        async configResolved(conf) {
            config = conf
        },
        transform(code, id) {

            // 判断是不是view视图里面的vue文件
            const vueRE = new RegExp(/src\/(views\/).+(.vue)$/g);
            // 检查代码里面有没有@/fits-components的路径
            if (vueRE.test(id) && code.indexOf('@/fits-components') > -1) {
                // 把符合组件库的路径匹配删除。例如：import { FitsEcharts } from "@/fits-components"
                const reg = new RegExp(/import\s+({.+})\s+from\s+\'@\/fits-components\'\;/g)
                if (reg.test(code)) {
                    code = code.replace(reg, "")
                    // code = code.replace(reg, `import type $1 from '@/fits-components/type'`)
                }
            }
            return code
        }
    }
}