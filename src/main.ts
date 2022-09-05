import { createApp, Directive } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router';




import Pagination from '@/components/Pagination/index.vue';
import FitsAdmin from 'fits-admin-ui'

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 自定义样式
import '@/styles/index.scss';

const app = createApp(App);

// 自定义指令
import * as directive from '@/directive';
import { setupStore } from '@/store';
import formCreate from '@form-create/element-ui';

// form-create表单构造
// import formCreate from '@form-create/element-ui'

Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

// 挂载路由
setupRouter(app);
// 挂载pinia状态管理
setupStore(app);


// 注册全局组件
app
  .component('Pagination', Pagination)

  .use(FitsAdmin)
  .use(formCreate)
  .mount('#app');
