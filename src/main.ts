import { createApp, Directive } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router';

import 'fits-admin-ui/libs/style.css';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import Pagination from '@/components/Pagination/index.vue';
import FitsAdmin from 'fits-admin-ui'
import 'default-passive-events';

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 自定义样式
import '@/styles/index.scss';

// 根据字典编码获取字典列表全局方法
import { getDictItemsByTypeCode } from '@/api/system/dict';

const app = createApp(App);

// 自定义指令
import * as directive from '@/directive';
import { setupStore } from '@/store';

// form-create表单构造
import formCreate from '@form-create/element-ui'

Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

// 全局方法
app.config.globalProperties.$getDictItemsByTypeCode = getDictItemsByTypeCode;
// 挂载路由
setupRouter(app);
// 挂载pinia状态管理
setupStore(app);


// 注册全局组件
app
  .component('Pagination', Pagination)
  .use(ElementPlus)
  .use(FitsAdmin)
  .use(formCreate)
  .mount('#app');
