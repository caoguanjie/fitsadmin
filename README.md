# 介绍

## 项目简介
**FitsAdmin** 是基于[vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin)升级的 Vue3 + Element Plus 版本的后台管理前端解决方案。

项目使用 Vue3 + Vite2 + TypeScript + Element Plus + Vue Router + Pinia + Volar 等前端主流技术栈，基于此项目模板生成的前端框架相信能解决您们大部分的难题，里面内置动态路由，权限验证，提炼了典型的业务模型、封装了通用型各种业务组件，提供了丰富的范例展示，可以帮助你快速搭建企业级的中后台产品原型


## 功能清单

![图 2](https://github.com/caoguanjie/fitsadmin/blob/master/docs/.vuepress/public/images/20220810085530.png)  



## 前期准备


你需要在本地安装 [node](https://nodejs.org/en/)和 [Git](https://git-scm.com/)。本项目技术栈基于[ES2015+](https://es6.ruanyifeng.com/)、[vue3.2](https://cn.vuejs.org/)、[Pinia](https://pinia.vuejs.org/)、[vue-router](https://router.vuejs.org/zh/) 、[vite](https://vitejs.cn/) 、[axios](https://github.com/axios/axios)、[Volar](https://github.com/johnsoncodehk/volar) 和 [Element Plus](https://element-plus.org/zh-CN/#/zh-CN)。 所有的请求数据都使用[Yapi](http://192.168.32.108:8012/#/tools/yapi/)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

**本项目不支持IE浏览器和需要Chrome64以上版本，有需求请自行添加 polyfill** [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)

在开始学习本项目之前，可以先看看以下一些文章，学习一些基础知识，再来实践本项目

* [Vue2.x的开发规范](http://192.168.32.108:8012/#/knowledge/docs/vue2)
* [Pinia.js上手指南](http://192.168.32.108:8012/#/knowledge/docs/piniajs)
* [Vue3的新特性](http://192.168.32.108:8012/#/knowledge/docs/vue3)
* [关于ES6的吐槽大会](http://192.168.32.108:8012/#/knowledge/docs/es6)
* [前端如何建数据表](http://192.168.32.108:8012/#/knowledge/docs/newClass)
* [TypeScript简单入门](http://192.168.32.108:8012/#/knowledge/docs/ts)
* [echarts的性能优化之路：从入门到放弃](http://192.168.32.108:8012/#/hybirdapp/ionic5/docs/echarts)
* [Axios网络请求库封装](http://192.168.32.108:8012/#/hybirdapp/ionic5/docs/http)

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```sh
├── hook                       # 构建相关的nodejs操作系统文件
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   └── favicon.ico            # favicon图标
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题、字体、图片等静态资源
│       ├── icons              # 项目所有 svg icons
│       └── Base               # 框架本身所有用到的svg、png图片。
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│       ├── base               # 框架预定义的一些常量路由
│       └── modules            # 这块是存放业务级别的路由，每个项目的业务路由不一样
│   ├── store                  # 全局 store管理
│       ├── base               # 框架本身预定义的一些全局状态管理
│       └── modules            # 各个项目可以自定义的一些状态管理文件
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法、工具类
│       ├── base               # 框架定义的共用方法
│       ├── http               # 封装的http统一接口处理的服务
│       └── is                 # is函数类
│   ├── types                  # ts全局声明的interface、type、class的类型
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   ├── components.d.ts        # 声明文件，声明全局组件的类型
│   └── env.d.ts               # 声明文件，环境变量的声明文件，方便vs做ts类型检查、提示
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .prettierrc.js             # 配置代码规范、格式
├── .commitlint-config         # 前端代码提交规范，跟husky配合使用，只适用git
├── index.html                 # html模板
├── vite.config.ts             # vite 配置
├── README.md                  # 项目的说明文件
├── tsconfig.json              # ts项目的配置文件
└── package.json               # package.json
```

## 安装
```sh
# 先从SVN检出项目
# SVN地址是：https://192.168.32.12/svn/Proj2015005-FitsDemo/04.项目编码/前端框架/PC/FitsPCFrame_V3.0

# 进入项目目录
cd FitsPCFrame_V3.0

# 安装依赖
npm install

#建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题, 也可以通过VPN科学上网的方式解决npm带来的问题
yarn 
# 或者
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev
```