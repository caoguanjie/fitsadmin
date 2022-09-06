import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";
import { codeBlockPlugin } from '@bfehub/vuepress-plugin-code-block'
import { viteBundler } from '@vuepress/bundler-vite';
import { resolve } from "path";
import { path } from "@vuepress/utils";
const base = process.env.NODE_ENV === 'github' ? '/fitsadmin/' : "/"
export default defineUserConfig({
  lang: "zh-CN",
  title: "FitsAdmin",
  description: "基于vue3-element-admin为模板的前端框架",
  head: [
    ['link', { rel: 'icon', href: ` ${base}images/favicon.ico` }]
  ],
  base: base,
  alias: {
    "@UiAssets": path.resolve(__dirname, "components/UiAssets.vue"),
  },
  theme,
  // 指定 vuepress build 命令的输出目录。
  dest: process.env.NODE_ENV === 'github' ? 'docs/.vuepress/dist' : '/FitsAdminDocs',
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search'
        }
      },
      // 控制热键
      hotKeys: ['/']
    }),
    // registerComponentsPlugin({
    //   componentsDir: resolve(__dirname, '../../src/components'),
    //   getComponentName: (filename: string) => {
    //     //生成的组件名字
    //     const arr = filename.split("/")
    //     return `Fits${path.trimExt(arr[arr.length - 1])}`;
    //   }
    // }),
    // @bfehub/vuepress-plugin-code-block
    codeBlockPlugin(),
  ],
  bundler: viteBundler({
    viteOptions: {
      configFile: resolve(__dirname, './vite.config.ts'),
      // @ts-expect-error: vite does not provide types for ssr options yet
      // 解决Must use import to load ES Module导致的报错
      ssr: {
        noExternal: ['element-plus'],
      },
    }
  }),
});
