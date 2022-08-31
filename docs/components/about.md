# 关于FitsAdminUI

FitsAdmin UI 组件是有前端框架组在[element plus](https://element-plus.org/zh-CN/)的基础下进行二次开发封装，主动贴合框架的UI风格进行优化，把公司内部相同的逻辑、使用频率高的组件进行封装固化，提供给各位前端开发人员使用

## 安装

```sh
npm install fits-admin-ui --save-dev
```

## 使用

```ts
// 路径：src/main.ts

// 引入相关css
import 'fits-admin-ui/style.css';
import FitsAdmin from 'fits-admin-ui'

const app = createApp(App);
// 全局注册即可
app.use(FitsAdmin)
```

::: danger 在业务系统中使用注意事项
如果发现在组件库中传入的相关属性，但是项目效果却没有生效的话，一定要检查`fits-admin-ui`版本号是否更到最新了。
:::