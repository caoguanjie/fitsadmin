/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { path } from "@vuepress/utils";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default defineConfig({
    plugins: [
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core', { 'moment': [['default', 'moment']] }],
            dts: path.resolve(__dirname, '.temp/auto-imports.d.ts'),
        }),
        Components({
            dirs: path.resolve(__dirname, '../../src/components'),
            dts: path.resolve(__dirname, '.temp/components.d.ts'),
        }),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(__dirname, '../../src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        }),
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
    }
});
