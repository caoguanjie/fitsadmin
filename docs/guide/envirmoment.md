---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-22
---

# 多环境配置

## vite的环境变量

::: tip 
官方教程: [环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)
:::

1. env配置文件

项目根目录分别添加 开发、生产和模拟环境配置

* 开发环境配置：.env.development

```sh
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_APP_TITLE = 'fits-admin'
VITE_APP_PORT = 3000
VITE_APP_BASE_API = '/api'
```


* 生产环境配置：.env.production

```sh
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_APP_TITLE = 'fits-admin'
VITE_APP_PORT = 3000
VITE_APP_BASE_API = '/newapi'
```

2. 环境变量智能提示

添加环境变量类型声明

```ts
// src/ env.d.ts
// 环境变量类型声明
interface ImportMetaEnv {
  VITE_APP_TITLE: string,
  VITE_APP_PORT: string,
  VITE_APP_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

```

后面在使用自定义环境变量就会有智能提示 

![图 4](/images/20220822035523.png)  

vite的环境配置方案挺好的，但是对于一些复杂的项目，多客户的项目，这种方案存在以下的缺点：

1. 对于FitsAdmin常用的环境有开发环境、生产环境、106验证环境、105测试环境、QA环境、客户1环境、客户2环境......随着环境的增多，要不断增加`.env`文件，对项目的维护性不利
2. 在使用场景中，我们针对不同的客户，想通过环境变量，在预编译的阶段，编译不同的界面，`.env`显然无法处理这么复杂的场景
3. `.env`的文件无法与`ts`文件做交互，同样无法处理一些复杂的逻辑

综上所述，在`FitsAdmin`项目中，需要对多环境配置进行重新的规划，可以结合`.env`的优点，做多环境和复杂情况下的处理

小编以前也写过两篇文章，针对app的多环境配置的解决思路探索，有兴趣的朋友，可以点击下面的链接去了解一下本次多环境配置方案的思路来源，我这次就不多做赘叙了

* [ionic6的自动化构建和多环境配置](http://192.168.32.108:8012/#/hybirdapp/ionic5/docs/build)
* [ionic3的多环境配置和自动打包](http://192.168.32.108:8012/#/hybirdapp/ionic3/ionic/1-ionic%E6%95%99%E7%A8%8B/08-%E5%A4%9A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE%E5%92%8C%E8%87%AA%E5%8A%A8%E6%89%93%E5%8C%85?id=%e5%a4%9a%e7%8e%af%e5%a2%83%e9%85%8d%e7%bd%ae%e5%92%8c%e8%87%aa%e5%8a%a8%e6%89%93%e5%8c%85)


## 新环境配置构建过程

### 配置文件结构
```sh
......                        
├── src                                 
│   ├── environment                     # 多环境配置文件夹
│       ├── modules                     # 存放不同的环境变量
│           ├── dev.ts                  # 开发环境的变量、配置项
│           └── prod.ts                 # 生产环境的变量、配置项
│       ├── index.ts                    # 环境配置的入口文件，多环境配置方案的关键代码
│       └── type.ts                     # 预定义的环境变量、相关配置项
......    
```

### 使用策略模式
当开发者通过vite的命令行：`--mode dev` 输入了环境变量的指令之后,我的逻辑判断能根据这个指令，选择出这个环境的相应动作或者策略方案，具体点说：就是能适配出`dev`这个开发环境变量的具体配置项的路径，

根据之前已经实现过相关功能的文档[ionic6的自动化构建和多环境配置](http://192.168.32.108:8012/#/hybirdapp/ionic5/docs/build)可以知道，在webpack的前端工程项目中，有`require.context`这个方法能实现这个策略模式，于是乎，我们只需要找到在`vite`环境底下是否也有相关的api能够达到相同的目的，最终找到了`import.meta.globEager`

#### 什么是**import.meta.globEager**
::: info
官方文档：[Glob 导入](https://cn.vitejs.dev/guide/features.html#glob-import)
::: 

Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块：
```js
const modules = import.meta.globEager('./modules/*.ts')
```

以上将会被转译为下面的样子：
```js
// vite 生成的代码
const modules = {
  './modules/dev.ts': () => import('./modules/dev.ts'),
  './modules/prod.ts': () => import('./modules/prod.ts')
}

```

你可以遍历 modules 对象的 key 值来访问相应的模块：

```js
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```

::: warning
* 这只是一个 Vite 独有的功能而不是一个 Web 或 ES 标准
* 该 Glob 模式会被当成导入标识符：必须是相对路径（以 ./ 开头）或绝对路径（以 / 开头，相对于项目根目录解析）
* 你还需注意，glob 的导入不接受变量，你应直接传递字符串模式。
::: 

### 核心设计思想
 
1. 获取到文件夹`src/environments/modules`里面所有的文件路径,能得到以下的路径数组：

```js
// vite 生成的代码
const modules = {
  './modules/dev.ts': () => import('./modules/dev.ts'),
  './modules/prod.ts': () => import('./modules/prod.ts')
}

```

2. 通过正则运算匹配提取关键字`dev`、`prod`作为一个空对象里面的属性，并且通过`import`的关键词`default`得到`export`导出的对象，如下：
```js
const modules = {
  'dev': () => import('./modules/dev.ts').default,
  'prod': () => import('./modules/prod.ts').default
}

// 进一步转化为：
const modules = {
  'dev': () => FitsDefaultSetting,
  'prod': () => FitsDefaultSetting
}

```

3. 根据命令行`--mode dev`的环境变量得到当前环境`dev`,然后得到对应的配置，把这个配置项放入实体类`FitsDefaultSetting`中，会得到所有的配置项

```js
const NODE_ENV = process.env.NODE_ENV || 'dev'
const ENV: FitsDefaultSetting = new FitsDefaultSetting(_modules[NODE_ENV])
```

::: info 实体类FitsDefaultSetting是什么？
* 考虑到以后环境配置项越来越多，每个环境其实不需要把所有的配置项都进行配置的
* 实体类FitsDefaultSetting的产生，主要解决当你只配置了项目配置的属性，其他配置项可以不填，由实体类里面的方法初始化默认值。
:::

### 核心关键代码

::: tabs

@tab:active index.ts

```ts
import { FitsDefaultSetting } from "./type";
const importModules = import.meta.globEager('./modules/*.ts');
// 环境变量默认是以开发环境为主
interface PreviousValue {
    [envKey: string]: any;
}
const _modules: PreviousValue = Object.keys(importModules).reduce((modules: PreviousValue, modulesPath: string) => {
    const modulesName = modulesPath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1")
    const value = importModules[modulesPath]
    modules[modulesName] = value.default;
    return modules
}, {})
const NODE_ENV = process.env.NODE_ENV || 'dev'
const ENV: FitsDefaultSetting = new FitsDefaultSetting(_modules[NODE_ENV])
export default ENV
```

@tab dev.ts

```ts
import { FitsSetting } from "../type"

const ENV: FitsSetting = {
    project: {
        title: 'FitsAdmin后台管理系统',
        subTitle: 'FITS ADMIN',
        company: '广东丰德科技有限公司',
        version: "1.0.0",
        api_address: 'http://192.168.32.108:3000/mock/78',
        http_timeout: 15000
    },
    system: {
        showSettings: true,
        tagsView: true,
        fixedHeader: false,
        sidebarLogo: true,
        isInsensitivity: false,
        coutDownTime: 30,
        errorLog: true
    },
    login: {
        appScanCode: true,
        smsLogin: true,
        accountLogin: true,
        appDownload: true
    }

}

export default ENV
```

@tab .env

```sh
# 这个文件主要是利用dotenv的使用，后面可以根据dotenv的语法糖进行动态渲染
# 该文件只做vite.config.ts需要用的变量，由于import()和require()都无法在vite.config.ts文件中导入模块，无法导入src/environment/modules的环境配置

# 开发环境的端口
VITE_APP_PORT_dev = 3000
# 上架环境的端口号
VITE_APP_PORT_prod = 3001
```
:::

::: warning 为什么要保留.env文件
在实践过程中，我们发现import()和require()都无法在vite.config.ts文件中导入模块，也就意味着，无法动态导入src/environment/modules的环境配置

为什么会出现这种情况呢？

1. require()和import()都不支持动态变量的字符串，例如**require(`src/environment/modules/${mode}.ts`)**这种写法
2. `import.meta.globEager`这个函数只会在`vite`环境下有效，而文件`vite.config.ts`执行的是vite的配置项，还未到vite的构建环境。
3. 不想因为解决`vite.config.ts`这个文件的问题，而在`index.ts`文件中写一大段nodejs的逻辑处理，通过nodejs的方法的确可以做到`import.meta.globEager`相同的效果。但是目前暂时没发现写这个兼容的必要性，后面可以根据实际场景可以优化该方法。
:::

综上所述，我们通过新建`.env`的方式，把`vite.config.ts`需要的变量存放起来使用，下面是具体的使用方法。


```ts
export default defineConfig({
  // mode代表是当前的环境变量
  // env[`VITE_APP_PORT_${mode}` == env.VITE_APP_PORT_dev
    server: {
        host: 'localhost', 
        port: Number(env[`VITE_APP_PORT_${mode}`]), 
        open: true, // 启动是否自动打开浏览器
        proxy: {
            '/apis': {
                target: 'http://192.168.32.108:3000/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apis/, '')
            }
        }
    },
})
```

### 具体使用方法

在页面中，通过解构赋值的方式，获取配置项信息

```vue
<script setup lang="ts">
// 路径：src/views/login/index.vue
// API依赖
import ENV from '@/environment/index';

const { project: { title, subTitle }, login: loginSetting } = ENV
</script>
```
## 实际环境配置
```ts
// 路径：src/environment/modules/dev.ts
import { FitsSetting } from "../type"

const ENV: FitsSetting = {
    project: {
        title: 'FitsAdmin后台管理系统',
        subTitle: 'FITS ADMIN',
        company: '广东丰德科技有限公司',
        version: "1.0.0",
        api_address: 'http://192.168.32.108:3000/mock/78',
        http_timeout: 15000
    },
    system: {
        showSettings: true,
        tagsView: true,
        fixedHeader: false,
        sidebarLogo: true,
        isInsensitivity: false,
        coutDownTime: 30,
        errorLog: true
    },
    login: {
        appScanCode: true,
        smsLogin: true,
        accountLogin: true,
        appDownload: true
    }

}
export default ENV
```
如果不想配置系统、登录的这两项配置项，可以仅填写项目配置项，如下图所示：

```ts
// 路径：src/environment/modules/prod.ts
import { FitsSetting } from "../type"

const ENV: FitsSetting = {
    project: {
        title: 'FitsAdmin后台管理系统',
        subTitle: 'FITS ADMIN PROD',
        company: '广东丰德科技有限公司',
        version: "1.0.1",
        api_address: 'http://192.168.32.108:3000/mock/78',
        http_timeout: 15000
    }
}
export default ENV
```

::: tip 这里留下一个优化方向
当我在开发环境配置好了整个项目的全部配置项之后，其他环境能否根据这个齐全的配置进行继承，例如我在上架环境的`prod.ts`文件，只需要配置项目名称即可，其他属性全部继承`dev.ts`的配置。

初步的思路是:
1. 在`FitsSetting属性`里面新增一个`source`来源属性，通过这个属性对对两个文件的配置项进行`Object.assign()`合并
2. `ENV`这个变量是无法存放到store里面的，所以可以考虑把所有的配置通过加密的方式存放到session里面。

:::


## 配置项设计

### FitsSetting属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| project | 项目配置 | FitsProjectSetting | 必填 |  - |
| system | 系统配置 | FitsSystemSetting | 非必填 |  - |
| login | 登录配置 | LoginSetting | 非必填 |  - |

### FitsProjectSetting项目配置属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| title | 网站标题，项目名称 | string | - |  - |
| subTitle | 网站副标题, 英文标题 | string | - |  - |
| company | 公司名字 | string | - |  - |
| version | 版本号 | string | - |  1.0.0 |
| api_address | 项目的接口地址 | string | - |  - |
| http_timeout | 项目的接口超时时间，也就是接口请求超过多少秒之后，会返回超时状态 | number | - |  15000，单位：毫秒 |

### FitsSystemSetting系统配置属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| tagsView | 是否要需要多页签 | boolean | - |  true |
| fixedHeader | 是否要固定网页的头部 | boolean | - |  true |
| sidebarLogo | 是否显示菜单栏的logo | boolean | - |  true |
| isInsensitivity | token失效时是否进行无感操作 | boolean | - |  true |
| showSettings | 是否配置默认设置 | boolean | - |  true |
| errorLog | 是否显示错误日志 | boolean | - |  true |
| coutDownTime | 倒计时的时间 | number | - |  30，单位：秒 |
| showFooterBreadcrumb | 是否展示底部的面包屑功能 | boolean | - |  true |
| formType | 表单的展示形式,`dialog`弹窗形式，`drawer`右边弹出的抽屉形式 | FormType | dialog / drawer |  dialog |

### LoginSetting登录配置属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| appScanCode | app扫码登录 | boolean | - |  true |
| smsLogin | 短信登录 | boolean | - |  true |
| accountLogin | 账号登录 | boolean | - |  true |
| appDownload | app下载功能，二维码展示 | boolean | - |  true |