
## [2.0.0-beta.2](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-25)(2023-7-25)
### 重大改变
- 采用wujie作为微前端的集成方案

### BUG 修复（Bug Fixes）
- **fits-component** : 前端端多次修改vxetable的配置，没有自动赋值表格的高度，导致高度计算错误
- **fits-component** : 解决改变浏览器窗口后，表格的展开和搜索按钮不出现的问题

### 重大改变

- **改变项目目录** : 调整了项目结构，为了后续的微前端框架接入做好准备。
- **pnpm-workspace.yml** : 引入了 Monorepo 方案管理单一项目多个模块项目,为微前端方案做准备
- **.changesets** : 使用 changesets 管理包版本和发布
- **Vite.config.ts:** ： 改变了项目的导出路径，调整路径结构

## [v1.2.4](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-24)(2023-7-24)

### BUG 修复（Bug Fixes）

**Vite.config.ts:** 彻底解决生产环境 formcreate 自动导入没有注册 element 的组件的问题([2106aa9](https://github.com/caoguanjie/fitsadmin/commit/2106aa9aada4d7c6f988f2b2cf0978fa8c9ca669),[682394b](https://github.com/caoguanjie/fitsadmin/commit/682394bbdcd7e48e7d6ae69b0c0f9ed3420ffc99))

## [v1.2.3](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-20)(2023-7-20)

### BUG 修复（Bug Fixes）

- **RouteMeta:** 解决开发者自定义路由 meta 信息时，自定义 meta 信息丢失的问题([7a29c12](https://github.com/caoguanjie/fitsadmin/commit/7a29c121448d149d03f87413b43834c338761bfd))
- **Vite.config.ts:** 解决 window 系统路径反斜杠`\`导致 elementplus 导入失败、新增可以允许跨域([5247331](https://github.com/caoguanjie/fitsadmin/commit/52473317825df8793ea3db4f7172714ce27e8241)、[4e6040b](https://github.com/caoguanjie/fitsadmin/commit/4e6040be451965cd9ba3d69fee1d01ddf542cf68))
- **other-import:** 解决 formcreate 插件重复注册的问题，目前 formcreate 不存在自动导入的方案，只能全局导入([16bbc62](https://github.com/caoguanjie/fitsadmin/commit/16bbc6290ebd2eb7b7fc4fc47d90b28b1dc02147))

## [v1.2.2](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-14)(2023-7-14)

### BUG 修复（Bug Fixes）

- **Login:** 修复登录界面的点击登录显示登录成功，但未进入系统界面的 bug
- **Vite.config.ts:** 修复了打包正式包之后，按需加载 ElementPlus 的表单样式和组件丢失问题([8465180](https://github.com/caoguanjie/fitsadmin/commit/8465180781fd7f5a3dd61e20a25f68731b2af253))
- **Vite.config.ts:** 解决了 fullImportPlugin 函数替换的 ElementPlus 的引入位置问题([8465180](https://github.com/caoguanjie/fitsadmin/commit/8465180781fd7f5a3dd61e20a25f68731b2af253))
- **ElMessageBox:** 解决了按需加载弹框之后，程序二次导入导致的弹框样式消失问题（[2fa73c1](https://github.com/caoguanjie/fitsadmin/commit/2fa73c1876f5ff8775b50df2659e09600cd0facf)）

### 性能优化

- **FormCreate:** 升级了表单自动生成工具的 FormCreate 版本，升级到`v3.1.23`（[773a5e5](https://github.com/caoguanjie/fitsadmin/commit/773a5e592f3a76af08d30d3b84438f5ba02d2e56)）

## [v1.2.1](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-13)(2023-7-14)

### 重大变化

- **Mock Data:** 增加线上 demo 的接口请求方案，将内部部署的 Yapi 上 Demo 接口导入平台 ApiFox，开启云模拟。
- **patch-package:** 增加@vue/runtime-core 补丁方案。

```shell
# 由于Teleport组件存在严重的内存泄露问题，详情可以浏览https://github.com/caoguanjie/vue3-runtime-core
# 由于国内网络限制的原因，pnpm i https://github.com/caoguanjie/vue3-runtime-core.git。安装非常慢，甚至失败
# 而且不同项目之间由于vue的版本不一样，github方式太过死板，繁杂。现在有了新的思路，对node_module需要进行调整的源码，可以利用打补丁的方式解决。
# 思路可参考：https://juejin.cn/post/7119369833187115039, 下面以@vue/runtime-core为例子，讲述操作过程

# 第一步，先执行以下命令，记得带上版本号。
pnpm patch @vue/runtime-core@3.3.4
# 第二步，上面命令会把node_modules里面@vue/runtime-core的文件夹复制一份到临时目录（macOS系统）：/private/var/folders/68/k_1kgz_5733g0lfc_6zd_1l00000gq/T/97e44825a38a5cef38a069c1f1f8908d
# 我们到这个临时目录去把源码给修改掉，保存之后，执行以下代码
pnpm patch-commit /private/var/folders/68/k_1kgz_5733g0lfc_6zd_1l00000gq/T/97e44825a38a5cef38a069c1f1f8908d
# 这个代码会在项目的根目录下创建新的补丁文件：/patches/@vue__runtime-core@3.3.4.patch
# 并且会在package.json文件新增代码：
# "pnpm": {
#         "patchedDependencies": {
#             "@vue/runtime-core@3.3.4": "patches/@vue__runtime-core@3.3.4.patch"
#         }
#    }

# 任何人下载项目之后，直接执行pnpm install 之后pnpm命令会先执行补丁，替换源码。不过要提醒的是，以上命令必须保证你的当前的git是最新，不然会报错。
# 如果是用npm包管理工具的，可以参考：https://juejin.cn/post/7020302035207602183
```

## [v1.2.0](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-12)(2023-7-12)

### 性能优化

- **更新 vue3.3.x:** 升级最新的 vue3 的版本,由`v3.2.47`升级到`v3.3.4`
- **更新 element-plus:** 升级最新的 element 版本，从`v2.2.16`升级到`2.3.7`
- **更新 Vite4.x:** 升级最新的 vite 版本，从`v2.9.7`升级到`4.3.5`
- **相应升级升级 vue-router、pinia 版本**

### 重大变化

- fitsadmin 从`v1.1.0`升级到`v1.2.0`需要执行下面的以下命令：

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

不过这里要注意的是 node 的版本，可以将 node 版本升级到最新，小编升级的版本是`node-v20.4.0`。
在执行 npm run dev 启动之后，如果发现有缺哪些模块的，直接通过`npm i [模块名]`安装即可

- **全面拥抱 pnpm 包管理工具**

1. 升级 node 之后，执行命令`npm i -g pnpm`
2. 删除`yarn.lock`和`package-lock.json`文件
3. 重新执行`pnpn install`命令，生成版本锁定文件`pnpm-lock.yml`

### 代码调整

- **调整组件 ScrollPane:** 新版的 element plus 有新的 api 调整

```js
// 文件路径：src/layout/components/TagsView/ScrollPane.vue
// 调整的原因： 新的版本导出的组件的实例化对象变了
// 修改前
const scrollWrapper = computed(() => proxy?.$refs.scrollContainer.$refs.wrap$);
// 修改后
const scrollWrapper = computed(
  () => proxy?.$refs.scrollContainer.$refs.wrapRef
);
```

- **调整组件 SidebarItem:** element plus 的 menu 组件废弃 popper-append-to-body`属性

```diff
// 路径： src/layout/components/Sidebar/SidebarItem.vue
// 修改前：
- <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body :popper-class="popperClass"></el-sub-menu>


 // 修改后
+  <el-sub-menu v-else :index="resolvePath(item.path)" :popper-class="popperClass"></el-sub-menu>
```

- **调整组件 Sidebar:** 新版本的 pinia，生产环境的`$subscribe`监听事件的`mutation.event`无效([1117](https://github.com/vuejs/pinia/discussions/1117))

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

- **调整环境变量文件**

```diff
- // 修改之前
- const NODE_ENV = process.env.NODE_ENV || 'dev'

+ // 修改之后
+ const NODE_ENV = import.meta.env.MODE || 'dev'
```

## [v1.1.0](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-11)(2023-7-11)

### BUG 修复（Bug Fixes）

- **EventBus:** 避免函数的重复绑定，解决清除不完全，导致闭包的内存泄露

```ts
/**
 * 直接把框架文件`src/utils/base/EventBus.ts`的代码进行替换即可
 */
import mitt, { EventType } from "mitt";
import { onUnmounted } from "vue";

/**
 * on 绑定的事件是一个数组，也就是说相同的名字可以绑定多个callback
 * off 是解绑callback，但是emit有个漏洞，是如果绑定的事件是多个相同的callback的话，只会解绑第一个。
 * off 函数还有一个坑，就是取消绑定之后，没有删除绑定的关键词`eventName`属性。
 */
const emitter = mitt();

const eventBus = {
  on(eventName: EventType, callback: any) {
    const handlers = emitter.all!.get(eventName);
    // 是否存在相同的函数
    let hasSameFunction = false;

    handlers &&
      handlers.map((handler) => {
        // 判断绑定的事件中是否有相同的函数
        if (
          Function.prototype.toString.call(callback) !==
          Function.prototype.toString.call(handler)
        ) {
          hasSameFunction = true;
        }
      });
    if (!handlers || hasSameFunction) {
      // 如果没有绑定过值，直接绑定
      emitter.on(eventName, callback);
      onUnmounted(() => {
        eventBus.off(eventName, callback);
      });
    }
  },
  emit(eventName: EventType, params?: any) {
    emitter.emit(eventName, params);
  },
  off(eventName: EventType, callback?: any) {
    emitter.off(eventName, callback);
    const handlers = emitter.all!.get(eventName);
    handlers?.length === 0 && emitter.all.delete(eventName);
  },
};
export default eventBus;
```

- **keep-alive:** 修复当全局配置页面不缓存时，每次进入新的页面组件都会刷新两次的 bug

```ts
// 直接把框架文件`src/router/utils.ts`的代码中的函数`deleteCache`方法进行替换即可
/**
 * 清除缓存，利用了keep-alive组件的exclude属性：任何匹配name名称的组件都不会被缓存
 * 这里要注意一点，如果发现缓存页面不生效，要先去检查组件有没有对其进行name的命名，组件的名字和route表中name要对应上，才能匹配
 * @param router
 * @param reload 传入这个属性，可以出现进度条，其实是模拟页面刷新的交互效果，主要作用于组件取消缓存之后，刷新组件的时候一个好的交互效果
 */
export async function deleteCache(
  router: RouteLocationNormalized,
  reload = false
) {
  const { tagsView } = useStore();
  // 通过reload属性决定当前组件是否刷新，解决页面如果没有缓存的情况下，第一次打开会刷新两次的效果
  if (!reload) return;
  // 开启进度条
  NProgress.start();
  tagsView.addExcludeView(router);
  await nextTick();
  // 防抖设置，防止频繁点击组件刷新导致性能问题
  const _debounce = debounce(async () => {
    tagsView.delExcludeView(router);
    NProgress.done();
  }, 100);
  /**
   * 这里200ms对应的是transition组件router-fade的动画效果，设置200ms的动画持续时间
   * 如果要改，记得要去修改src/styles/transition.scss文件的样式
   */
  _debounce();
}
```

### 性能优化（Performance Improvements）

- **vite.config.ts:** 优化组件自动导入在开发环境时，打开新页面存在卡顿问题

  1. 使用 unplugin-vue-components 按需加载样式，开发环境会导致项目异常卡顿，相关问题的地址是：https://github.com/antfu/unplugin-vue-components/issues/361
  2. 主要问题是：vite 会预加载 style，当首次启动 vite 服务时会对 style 进行依赖预构建，，因为 element-plus 的按需样式会导入大量 style 文件，导致页面会卡住直至 style 构建完成
  3. 解决方案是：写一个自定义 vite 插件，在开发环境下全部导入 element-plus，在生产环境或者其他环境，按需导入。主要代码片段如下：

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      mode === "dev"
        ? fullImportPlugin()
        : Components({
            dts: "./src/components.d.ts",
            dirs: "",
            resolvers: [ElementPlusResolver()],
          }),
    ],
  };
};

/**
 * element全局导入插件
 * 通过修改编译后的代码，全局增加ele的js和ts
 * @returns
 */
function fullImportPlugin() {
  let config: ResolvedConfig;
  return <Plugin>{
    name: "fullImportElementPlus",
    async configResolved(conf) {
      config = conf;
    },
    transform(code, id) {
      // 判断当前处理的是否是 _src/main.ts_
      if (path.join(config.root, "src/main.ts") === id) {
        const name = "ElementPlus";

        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`;
        // 通过匹配字符串来使用 ElementPlus （此处替换规则根据 main.ts 的情况而定）
        // 相当于将字符串 `app.use(router).mount('#app')` 替换成 `app.use(router).use(ElementPlus).mount('#app')`
        code = code.replace(".mount(", ($1) => `.use(${name})` + $1);
        return prepend + code;
      }
      return code;
    },
  };
}
```

- **内存泄露:** 优化 vue 的底层源码，解决内置组件的内存泄露问题（[内存泄露（memory leak）](/guide/memory-leak.md)）

```shell
# 更新vue的版本至`v3.2.47`
npm i vue@3.2.47
#  安装`@vue/runtime-core`.
npm i https://github.com/caoguanjie/vue3-runtime-core.git
```

- **fits-admin-ui 优化:** 删除 fits-admin-ui 的引用方式，改用`@/fits-components`

```
抛弃fits-admin-ui的原因：
1. VXETablePluginElement插件引用fits-admin-ui之后，导致vxe-table出现重复引用，导致注册插件的方法消失。
2. `fits-admin-ui`编译之后，产生的包过大
3. `fits-admin-ui`编译之后，可拓展性差，就算插件存在bug，项目组的成员难以及时调整优化。
4. `fits-admin-ui`封装的组件不够成熟，带来很多小问题。

旧项目删除fits-admin-ui的步骤：
1. npm uninstall fits-admin-ui,卸载多余的依赖
2. 在代码编辑器中搜索fits-admin-ui,把关键词换成@/fits-components，即可完成平替。
3. 如果在文件other-imports.ts中，有全局注册组件的代码，请把相关代码删除： import FitsAdminUI from 'fits-admin-ui'; app.use(FitsAdminUI)
```

- **VXETablePluginElement 插件优化:** 删除 vxe-table 兼容 ELement 样式的插件 VXETablePluginElement，重新安装插件的最新代码

```
抛弃VXETablePluginElement的原因：
    1. 上面`fits-admin-ui`优化有说明其中一个原因
    2. 存在内存泄露问题
    3. 始终兼容代码不是github上最新的代码

 优化方案：
    1. 删除文件`src/utils/base/VXETablePluginElement.ts`
    2. 安装最新的代码: npm i vxe-table-plugin-element@3.0.7
    3. 创建src/fits-components/Table/FitsTable/components/ToolsPluginElement.ts文件。`ToolsPluginElement.ts`文件主要是为了兼容列表FitsTable组件的自定义工具栏，里面包括所有的工具栏的渲染器。直接在框架组复制该文件到项目即可
    4. 去otherImport.ts安装新的ToolsPluginElement.ts和vxe-table-plugin-element插件。具体实现看代码：VXETable.use(VXETablePluginElement)和VXETable.use(VXETablePluginFits)

```

```diff
// 路径：src/other-imports.ts
+ import VXETablePluginFits from '@/fits-components/Table/FitsTable/components/ToolsPluginElement'
// 自定义工具栏
+ VXETable.use(VXETablePluginFits)
```

- **删除 fitsadmin 文档相关内容:** 为了更好更新 vue 的版本，将稳定的文档编译代码和框架代码分离
- **删除 fitsadminUI 编译代码:** 全面抛弃了 fits-admin-ui 的引用方式

### 新增功能（New features）

- **页面缓存机制:** 通过全局配置控制组件是否缓存([Keepalive 页面缓存机制](/guide/keepalive.md))

### 重大变化

如果项目`npm install`之后无法正常运行，请升级 node 到最新版本即可，参考版本`v20.4.0`

## [v1.0.0](https://github.com/caoguanjie/fitsadmin/tree/v1.0.0) (2022-11-10)

FitsAdmin 正式发布， FitsAdmin 是基于 Vue3 + Element Plus 版本的后台管理前端解决方案。框架项目使用 Vue3 + Vite2 + TypeScript + Element Plus + Vue Router + Pinia + Volar 等前端最主流技术栈，基于此项目模板生成的前端框架相信能解决您们大部分的难题，里面内置动态路由，权限验证，提炼了典型的业务模型、封装了通用型各种业务组件，包括后台管理系统中最重要的表格组件和表单组件，提供了丰富的范例展示，还有详细的文档支持，不仅可以帮助你们快速搭建的中后台产品项目框架，还能让你们前后端开发人员、项目管理人员、设计人员通过丰富的文档说明、组件展示和全新的设计标准等全方位了解 FitsAdmin，
