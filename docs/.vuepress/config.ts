import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const { viteBundler } = require('@vuepress/bundler-vite')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
import { codeBlockPlugin } from '@bfehub/vuepress-plugin-code-block'
import { resolve } from 'path'
import { path } from '@vuepress/utils'
export default defineUserConfig({
  lang: "zh-CN",
  title: "FitsAdmin",
  description: "基于vue3-element-admin为模板的前端框架",
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }]
  ],
  base: "/",

  theme,
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search'
        }
      }
    }),
    registerComponentsPlugin({
      componentsDir: resolve(__dirname, '../../src/components'),
      getComponentName: (filename: string) => {
        //生成的组件名字
        const arr = filename.split("/")
        return `Fits${path.trimExt(arr[arr.length - 1])}`;
      }
    }),
    // @bfehub/vuepress-plugin-code-block
    codeBlockPlugin(),
  ],
});
