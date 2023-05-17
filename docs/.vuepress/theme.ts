import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  hostname: "http://192.168.32.60:8080",
  author: {
    name: "caoguanjie",
    url: "https://github.com/caoguanjie/",
  },

  iconAssets: "iconfont",

  logo: "/images/logo.png",

  repo: "https://github.com/caoguanjie/fitsadmin",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "广东丰德科技有限公司 | Copyright © 软件事业部 前端框架组",

  displayFooter: true,
  // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
  pageInfo: ["Author", "Date", "Original", "Category", "Tag", "ReadingTime", "Word", "PageView"],
  // 是否展示编辑此页链接
  editLink: false,
  // 默认的版权信息，设置为 false 来默认禁用它。
  copyright: false,
  contributors: true,
  // 是否显示页面最后更新时间
  lastUpdated: true,
  encrypt: {
    config: {
      "/resources/encrypt.html": ["fits"],
    },
  },
  plugins: {
    blog: false,

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "caoguanjie/fitsadmin",
      repoId: "R_kgDOH1rXBg",
      category: "Announcements",
      categoryId: "DIC_kwDOH1rXBs4CRH-l",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      // 代码演示支持
      demo: true,
      // 开启markdown增强模式
      enableAll: false,
      // 添加选项卡支持
      tabs: true,
      // 启用图片大小
      imageSize: true,
      // 流程图支持
      mermaid: true,
      // 流程图支持
      flowchart: true,
      // 任务列表支持
      tasklist: true,

      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },



  },
});
