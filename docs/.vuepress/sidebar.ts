import { sidebar } from "vuepress-theme-hope";
export default sidebar({
  '/guide/': [
    {
      text: "基础",
      children: ['quickstart', 'layout', 'router-and-nav', 'tags-view', 'piniajs', 'style-guide']
    },
    {
      text: '进阶',
      children: ['eslint', 'elementplus', 'srcAlias', 'envirmoment', 'cross-domin', 'http', 'iconfont', 'wangEditor', 'echart']
    }
  ],
  '/components/': [
    {
      text: "介绍",
      link: '/components/about'
    },
    {
      text: 'Form',
      children: [{
        text: 'TreeSelect 树形选择',
        link: '/components/Form/TreeSelect'
      }]
    }]
})
// export default sidebar([
//   {
//     text: "基础",
//     prefix: "/guide/",
//     link: "/guide/",
//     children: ['/guide/quickstart']
//   },
//   {
//     text: 'Form',
//     prefix: "/Form/"
//     collapsable: true,
//     children: [{
//         text: 'TreeSelect 树形选择',
//         link: '/components/Form/TreeSelect',
//     }]
//   },
//   {
//     text: "文章",
//     icon: "note",
//     prefix: "/posts/",
//     children: [
//       {
//         text: "文章 1-4",
//         icon: "note",
//         collapsable: true,
//         prefix: "article/",
//         children: ["article1", "article2", "article3", "article4"],
//       },
//       {
//         text: "文章 5-12",
//         icon: "note",
//         children: [
//           {
//             text: "文章 5-8",
//             icon: "note",
//             collapsable: true,
//             prefix: "article/",
//             children: ["article5", "article6", "article7", "article8"],
//           },
//           {
//             text: "文章 9-12",
//             icon: "note",
//             children: ["article9", "article10", "article11", "article12"],
//           },
//         ],
//       },
//     ],
//   },
// ]);
