# 更新日志

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
  

### 新增功能（New features）
- **页面缓存机制:** 通过全局配置控制组件是否缓存

## [v1.0.0](https://github.com/caoguanjie/fitsadmin/tree/v1.0.0) (2022-11-10)
FitsAdmin正式发布， FitsAdmin 是基于 Vue3 + Element Plus 版本的后台管理前端解决方案。框架项目使用 Vue3 + Vite2 + TypeScript + Element Plus + Vue Router + Pinia + Volar 等前端最主流技术栈，基于此项目模板生成的前端框架相信能解决您们大部分的难题，里面内置动态路由，权限验证，提炼了典型的业务模型、封装了通用型各种业务组件，包括后台管理系统中最重要的表格组件和表单组件，提供了丰富的范例展示，还有详细的文档支持，不仅可以帮助你们快速搭建的中后台产品项目框架，还能让你们前后端开发人员、项目管理人员、设计人员通过丰富的文档说明、组件展示和全新的设计标准等全方位了解FitsAdmin，