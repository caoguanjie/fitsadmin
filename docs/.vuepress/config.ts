import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchPlugin } from "@vuepress/plugin-search";
import { codeBlockPlugin } from '@bfehub/vuepress-plugin-code-block'
import { viteBundler } from '@vuepress/bundler-vite';
import { resolve } from "path";
import { path } from "@vuepress/utils";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

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
  dest: process.env.NODE_ENV === 'github' ? 'docs/.vuepress/dist' : './FitsAdminDocs',

  plugins: [


    selectSearch(),

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


function selectSearch() {
  if (process.env.NODE_ENV === 'github') {
    return docsearchPlugin({
      appId: "VM58V8T977",
      apiKey: "4cace2a256b5c56f348a7dc6fee35da9",
      indexName: 'fitsadmin',
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    })
  } else {
    return searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search'
        }
      },
      // 控制热键
      hotKeys: ['/']
    })
  }
}