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
  {
    text: '资源',
    link: '/resources/README.md',
  },
  {
    text: "生态系统",
    children: [
      {
        text: '框架相关',
        children: [
          {
            text: 'FitsAdminV2',
            link: "http://192.168.32.60:3002/",
          },
          {
            text: 'Yapi接口管理',
            link: "http://192.168.32.108:3000/",
          },
          {
            text: '项目的SVN地址',
            link: "/resources/encrypt",
          },
        ]
      },
      {
        text: '官方库',
        children: [
          {
            text: 'Vue3.x',
            link: "https://cn.vuejs.org/",
          },
          {
            text: 'Pinia',
            link: "https://pinia.vuejs.org/",
          },
          {
            text: 'Vite',
            link: "https://cn.vitejs.dev/",
          },
          {
            text: 'VueUse',
            link: "https://vueuse.org/",
          },
          {
            text: 'Vue Router',
            link: "https://router.vuejs.org/zh/",
          },
          {
            text: 'Element Plus',
            link: "https://element-plus.org/zh-CN/#/zh-CN",
          },
        ]
      },
      {
        text: '优秀案例',
        children: [
          {
            text: 'vue-admin-better',
            link: "https://vue-admin-beautiful.com/vue-admin-beautiful-element/?hmsr=github&hmpl=&hmcu=&hmkw=&hmci=#/index",
          },
          {
            text: 'Vue Admin plus',
            link: "https://vue-admin-beautiful.com/admin-plus/#/index",
          },
          {
            text: 'vue-element-admin',
            link: "https://panjiachen.github.io/vue-element-admin/",
          },
          {
            text: 'vue3-element-admin',
            link: "http://vue3.youlai.tech/",
          },
        ]
      }
    ],
  },
  {
    text: "Fits知识库",
    link: "http://192.168.32.108:8012/#/",
  },
  {
    text: "Demo演示",
    link: "http://192.168.32.60:3001/",
  },


]);
