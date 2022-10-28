
// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
// import install from '@form-create/element-ui/auto-import'
// 引入相关css
import 'fits-admin-ui/es/style.css';

import formCreate from '@form-create/element-ui';
import { App } from 'vue';



//自动生成导航菜单
import { useOutline } from '@lazebird/vue3outline';


function setupOtherImports(app: App) {
    app
        .use(formCreate)
        .use(useOutline)


}

export default setupOtherImports