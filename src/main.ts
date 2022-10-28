import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'xe-utils';
import { Directive } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router';

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 自定义样式
import '@/styles/index.scss';

// 自定义指令
import * as directive from '@/directive';
import { setupStore } from '@/store';

// vxe-table插件，整合了element组件库
import VXETable from 'vxe-table'

import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

import setupOtherImports from './other-imports';
const app = createApp(App);
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});
app.use(VXETable)
app.use(ElementPlus)

// 挂载路由
setupRouter(app);
// 挂载pinia状态管理
setupStore(app);
// 全局注册更多第三方的组件库、插件等内容
setupOtherImports(app)

VXETable.use(VXETablePluginElement)
// 注册全局组件
app.mount('#app');
