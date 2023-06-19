import { sidebar } from "vuepress-theme-hope";
export default sidebar({
  '/guide/': [
    {
      text: "基础",
      children: ['quickstart', 'layout', 'router-and-nav', 'permission', 'tags-view', 'new-page', 'style', 'server', 'mock-data', 'import', 'deploy', 'piniajs', 'style-guide']
    },
    {
      text: '进阶',
      children: ['eslint', 'elementplus', 'srcAlias', 'auto-imports', 'envirmoment', 'cross-domin', 'http', 'iconfont', 'wangEditor', 'echart', 'keepalive', 'jenkins']
    },
    {
      text: '其他',
      children: ['function-list', 'svn', 'memory-leak']
    }
  ],
  '/components/': [
    {
      text: "介绍",
      link: '/components/about'
    },
    {
      text: 'Form 表单组件',
      children: [{
        text: 'FitsTreeSelect 树形选择',
        link: '/components/Form/TreeSelect'
      }, {
        text: 'FitsIconSelect 图标选择',
        link: '/components/Form/IconSelect'
      }, {
        text: 'FitsCheckboxAll 全选',
        link: '/components/Form/CheckboxAll'
      }, {
        text: 'FitsFormCreate 表单',
        link: '/components/Form/FitsFormCreate'
      }, {
        text: 'FitsFormDialog 表单弹窗',
        link: '/components/Form/FitsFormDialog'
      }]
    }, {
      text: 'Feedback 反馈组件',
      children: [{
        text: 'FitsDialog 弹窗',
        link: '/components/Dialog/Dialog'
      }, {
        text: 'FitsDrawer 抽屉',
        link: '/components/Dialog/Drawer'
      }]
    }, {
      text: 'Table 表格组件',
      children: [{
        text: 'FitsGroupTable 分组表格',
        link: '/components/Table/GroupTable'
      }, {
        text: 'FitsTable 表格',
        link: '/components/Table/Table'
      }]
    }, {
      text: '其他组件',
      children: [{
        text: 'FitsEditor富文本编辑器',
        link: '/components/Other/Editor'
      },
      {
        text: 'FitsUpload文件上传',
        link: '/components/Other/Upload'
      }]
    }],
  '/resources/': 'structure'
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
