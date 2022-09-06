import { Directive } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router';

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 自定义样式
import '@/styles/index.scss';

const app = createApp(App);
// 自定义指令
import * as directive from '@/directive';
import { setupStore } from '@/store';
import setupOtherImports from './other-imports';


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
app
  .mount('#app');
