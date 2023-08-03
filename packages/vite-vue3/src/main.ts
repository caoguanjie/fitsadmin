

import AppComponent from './App.vue';
import { setupRouter } from '@/router';
// 引入svg注册脚本
import 'virtual:svg-icons-register';
import { App, Directive } from 'vue';
// 自定义指令
import * as directive from '@/directive';
import { clearUserInfo, fixElementPlusTeleportCrash, setupStore } from '@/store';
// default-passive-events会影响工作流范例的使用
import 'default-passive-events'

// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
import install from '@form-create/element-ui/auto-import'
import formCreate from '@form-create/element-ui';
import setupOtherImports from './other-imports';
// 自定义样式
import '@/styles/index.scss';
import FitsLog from './utils/base/logger';

/**
 * 
 * @param app vue创建的实例
 * @param reload 拓展一个新的参数：是否要更新路由实例
 */
function init(app: App, reload = false) {
  Object.keys(directive).forEach((key) => {
    app.directive(key, (directive as { [key: string]: Directive })[key]);
  });

  formCreate.use(install)
  // 挂载路由
  setupRouter(app, reload);
  // 挂载pinia状态管理
  setupStore(app);
  // 全局注册更多第三方的组件库、插件等内容
  setupOtherImports(app)
  // 注册全局组件
  app.use(formCreate).mount('#app');
}

if (window.__POWERED_BY_WUJIE__ && window.$wujie.props?.type === "single") {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(AppComponent)
    init(instance, true)
    instance.dispose = fixElementPlusTeleportCrash()
    FitsLog.success('子应用mount创建成功')
  };
  /**
   * 每次销毁之前，先清空用户信息，在路由守卫方法中，是根据用户的角色是否存在，去执行动态路由生成。
   * 因此每次创建新的vue实例时，需要先清空用户信息，才保证路由守卫重新执行动态路由的生成
   */
  window.__WUJIE_UNMOUNT = () => {
    clearUserInfo()
    instance.dispose();
    instance.unmount();
    FitsLog.danger('子应用mount已销毁')
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount()
} else {
  init(createApp(AppComponent))
}

