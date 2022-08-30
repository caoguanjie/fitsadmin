---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-23
---

# Pinia状态管理

::: tip
Pinia 是 Vue.js 的轻量级状态管理库，Vuex 的替代方案。

尤雨溪于2021.11.24 在 Twitter 上宣布：Pinia 正式成为 vuejs 官方的状态库，意味着 Pinia 就是 Vuex 5 。

:::

![图 1](/images/20220823023939.png)  


## 目录说明

```sh
......                        
├── src                                 
│   ├── store                     # 状态管理器文件目录
│       ├── base                  # 框架封装已经封装好的基础文件
│           ├── app.ts            # 控制侧边栏是否显示，设备、语言，组件大小
│           ├── permission.ts     # 主要处理路由相关逻辑
│           ├── tagsView.ts       # 主要处理多页签的路由逻辑处理
│           ├── settings.ts       # 处理全局设置配置项、是否固定头部，是否显示多页签等等
│           └── user.ts           # 处理用户信息、登录、注销、重置密码等
│       ├── modules               # 主要存放是业务系统需要状态变量，以后每个业务系统根据自己需求，把需要定义的文件新建这个文件夹里面
│           └── example.ts        # 例子
│       └── index.ts              # 状态管理器的注册事件，各个模块的注册事件，全局注册事件
│       └── type.ts               # 预定义的相关类型
......    
```

## 如何新建Pinia模块

### 新建pinia文件
在目录`src/store/modules/`下新建一个`example.ts`文件
### 定义容器

在`src/store/modules/example`中存放业务的状态管理方法

```ts
import { ExampleState } from '@/store/type';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
const useExampleStore = defineStore({
  id: 'example',
  state: (): ExampleState => ({
    app: 'test',
  }),
  actions: {
    /**
     *  
     * @param withoutAnimation 
     */
    someThing() {
     
    },
  /**
     *  开启数据缓存
     * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
     */
  persist: {
    enabled: true,
    strategies: [
      {
        key: "keyValue",
        storage: window.localStorage,
        paths: ['app']
      }
    ]
  }
});

export default useExampleStore;
```

### 定义类型

在目录`src/store/type.ts`中定义新状态管理`example.ts`文件的`state`类型

```ts
// 预定义state的属性
export interface ExampleState {
    app: string;
}
```

### 局部注册

```ts
// 路径：src/store/index.ts
import useUserStore from './base/user';
import useAppStore from './base/app';
import usePermissionStore from './base/permission';
import useSettingStore from './base/settings';
import useTagsViewStore from './base/tagsView';
import useExampleStore from './modules/example.ts';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist'
import { App } from 'vue';

const store = createPinia()
store.use(piniaPluginPersist)

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore()
  example: useExampleStore();
});

export function setupStore(app: App) {
  app.use(store);
}

export default useStore;
```

::: tip 为什么是导出useStore对象，而不是直接导出store
有很多同学不是很理解，为啥这里要多做一个useStore对象，直接在页面上使用useAppStore不就可以了吗？

没错，在view的页面上，是可以直接调用`useAppStore()`,这里之所以要多做一个对象，是因为降低耦合性，举个例子，如果10个页面都直接调用`useAppStore()`方法，如果某一天我删除了`app.ts`文件后，是不是要去10个页面中，把这个10个路径导入给删除掉，这样就太麻烦了，如果多做这个`useStore`对象，当某个状态管理器文件删除掉，只需要在`index.ts`入口文件这里把映射关系给删除掉即可
:::

### 直接使用
```html
<script setup lang="ts">
import useStore from '@/store';

const { example } = useStore();

console.log(example.app)
</script>
```

## Pinia集成过程

### 安装Pinia

```sh
npm install pinia
# 数据持久化的插件
npm install pinia-plugin-persist
```

### Pinia全局注册

```ts
// src/main.ts
// 挂载pinia状态管理
setupStore(app);

// src/store/index.ts
export function setupStore(app: App) {
  app.use(store);
}

```


### 数据持久化

这里要单独说一下数据持久化这块，FitsAdmin的框架的token存储主要采用的是cookie的存储方式，cookie存储主要的好处是，当浏览器所有窗口都关闭之后，token也会消失，下次打开浏览器就重新登录

因此我们采用第三方库`js-cookie`处理cookie的问题，主要应用如下：

```ts
// src/store/base/user.ts
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const cookiesStorage: any = {
  setItem(key: string, state: any) {
    // 默认有效期是7天
    const _state = JSON.parse(state);
    return Cookies.set("accessToken", _state.token);
  },
  getItem(key: string) {
    return JSON.stringify({
      token: Cookies.get("accessToken"),
    });
  },
};

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
   
  }),
  actions: {
   
  },
  /**
   *  开启数据缓存
   * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
   * pinia的插件storage默认情况下，存储设置为 sessionStorage，但您可以通过设置密钥来指定要用于每个策略的存储。
   * 下面的例子就是利用js-cookie插件做token的缓存
   */
  persist: {
    enabled: true,
    strategies: [
      {
        storage: window.localStorage,
        paths: [],
      },
      {
        storage: cookiesStorage,
        paths: ["token"],
      },
    ],
  },
});

export default useUserStore;

```

::: tip
想学习更多「Pinia」更多用法，可以点击[Pinia.js上手指南](http://192.168.32.108:8012/#/knowledge/docs/piniajs)查看
:::