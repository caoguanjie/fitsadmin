# 更新日志

## [v1.2.0](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-12)(2023-7-12)

### 性能优化
-  **更新vue3.3.x:** 升级最新的vue3的版本,由`v3.2.47`升级到`v3.3.4`
-  **更新element-plus:** 升级最新的element版本，从`v2.2.16`升级到`2.3.7`
-  **更新Vite4.x:** 升级最新的vite版本，从`v2.9.7`升级到`4.3.5`
-  **相应升级升级vue-router、pinia版本** 

### 重大变化

-  fitsadmin从`v1.1.0`升级到`v1.2.0`需要执行下面的以下命令：
```shell
npm i vite@^4.3.5
npm i vue-tsc@^1.6.5
npm i @vitejs/plugin-vue@^4.2.0
npm i type
npm i typescript@5.0.4
npm i vue-router@4.2.4
npm i pinia@2.1.4
npm i vue@3.3.4
npm i unplugin-auto-import@0.16.6
npm i unplugin-vue-components@0.25.1
npm i lodash@4.17.5
npm i terser@5.18.2
npm i element-plus@2.3.7
```
不过这里要注意的是node的版本，可以将node版本升级到最新，小编升级的版本是`node-v20.4.0`。
在执行npm run dev启动之后，如果发现有缺哪些模块的，直接通过`npm i [模块名]`安装即可

-  **全面拥抱pnpm包管理工具**
  1. 升级node之后，执行命令`npm i -g pnpm`
  2. 删除`yarn.lock`和`package-lock.json`文件
  3. 重新执行`pnpn install`命令，生成版本锁定文件`pnpm-lock.yml`


### 代码调整

-  **调整组件ScrollPane:** 新版的element plus有新的api调整
```js
// 文件路径：src/layout/components/TagsView/ScrollPane.vue
// 调整的原因： 新的版本导出的组件的实例化对象变了
// 修改前
const scrollWrapper = computed(() => proxy?.$refs.scrollContainer.$refs.wrap$);
// 修改后
const scrollWrapper = computed(() => proxy?.$refs.scrollContainer.$refs.wrapRef);
```

- **调整组件SidebarItem:** element plus的menu组件废弃popper-append-to-body`属性
```js
// 路径： src/layout/components/Sidebar/SidebarItem.vue
// 修改前：
 <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body :popper-class="popperClass"></el-sub-menu>


 // 修改后
  <el-sub-menu v-else :index="resolvePath(item.path)" :popper-class="popperClass"></el-sub-menu>
```



- **调整组件Sidebar:** 新版本的pinia，生产环境的`$subscribe`监听事件的`mutation.event`无效([1117](https://github.com/vuejs/pinia/discussions/1117))
```js
// 路径：src/layout/components/Sidebar/index.vue

// 修改前
const subscribe = permission.$subscribe((mutation, state) => {
  if ((mutation.events as any).key === 'activeMenu') {
    // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
    routes.value = getRouter(state.activeMenu)
  }
}, { detached: false })

// 修改后：
// 临时变量，用来保存当前激活的菜单值
let _activeMenu = permission.activeMenu
const subscribe = permission.$subscribe((mutation, state) => {
  if (state.activeMenu !== _activeMenu) {
    // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
    _activeMenu = state.activeMenu
    routes.value = getRouter(state.activeMenu)
  }
}, { detached: false })
```


## [v1.1.0](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-11)(2023-7-11)

### BUG修复（Bug Fixes）
-  **EventBus:** 避免函数的重复绑定，解决清除不完全，导致闭包的内存泄露
-  **keep-alive:** 修复当全局配置页面不缓存时，每次进入新的页面组件都会刷新两次的bug

### 性能优化（Performance Improvements）
- **vite.config.ts:** 优化组件自动导入在开发环境时，打开新页面存在卡顿问题
- **内存泄露:** 优化vue的底层源码，解决内置组件的内存泄露问题
- **fits-admin-ui优化:** 删除fits-admin-ui的引用方式，改用`@/fits-components`
- **VXETablePluginElement插件优化:** 删除vxe-table兼容ELement样式的插件
- **删除fitsadmin文档相关内容:** 为了更好更新vue的版本，将稳定的文档编译代码和框架代码分离
- **删除fitsadminUI编译代码:** 全面抛弃了fits-admin-ui的引用方式

### 重大变化
    如果项目`npm install`之后无法正常运行，请升级node到最新版本即可，参考版本`v20.4.0`

### 新增功能（New features）
- **页面缓存机制:** 通过全局配置控制组件是否缓存

## [v1.0.0](https://github.com/caoguanjie/fitsadmin/tree/v1.0.0) (2022-11-10)
FitsAdmin正式发布， FitsAdmin 是基于 Vue3 + Element Plus 版本的后台管理前端解决方案。框架项目使用 Vue3 + Vite2 + TypeScript + Element Plus + Vue Router + Pinia + Volar 等前端最主流技术栈，基于此项目模板生成的前端框架相信能解决您们大部分的难题，里面内置动态路由，权限验证，提炼了典型的业务模型、封装了通用型各种业务组件，包括后台管理系统中最重要的表格组件和表单组件，提供了丰富的范例展示，还有详细的文档支持，不仅可以帮助你们快速搭建的中后台产品项目框架，还能让你们前后端开发人员、项目管理人员、设计人员通过丰富的文档说明、组件展示和全新的设计标准等全方位了解FitsAdmin，