

import App from './App.vue';
import { setupRouter } from '@/router';
// 引入svg注册脚本
import 'virtual:svg-icons-register';
import { Directive } from 'vue';
// 自定义指令
import * as directive from '@/directive';
import { setupStore } from '@/store';
// default-passive-events会影响工作流范例的使用
import 'default-passive-events'
import setupOtherImports from './other-imports';
import formCreate from '@form-create/element-ui';
// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
import install from '@form-create/element-ui/auto-import'
// 自定义样式
import '@/styles/index.scss';
const app = createApp(App);
formCreate.use(install)
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});



// 挂载路由
setupRouter(app);
// 挂载pinia状态管理
setupStore(app);
// 全局注册更多第三方的组件库、插件等内容
setupOtherImports(app)

// 注册全局组件
app.use(formCreate).mount('#app');
