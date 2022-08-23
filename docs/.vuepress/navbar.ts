import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: '指南',
    link: '/guide/quickstart',
    activeMatch: "^/guide",
  },
  {
    text: '组件',
    link: '/components/about',
    activeMatch: "^/components",
  },

  // {
  //   text: "主题文档",
  //   icon: "note",
  //   link: "https://vuepress-theme-hope.github.io/v2/zh/",
  // },
]);
