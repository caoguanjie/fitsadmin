
// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
import install from '@form-create/element-ui/auto-import'
// 引入相关css
import 'fits-admin-ui/style.css';
import FitsAdmin from 'fits-admin-ui'
import formCreate from '@form-create/element-ui';
import { App } from 'vue';

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// vxe-table插件，整合了element组件库
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import 'element-plus/dist/index.css'

//自动生成导航菜单
import { useOutline } from '@lazebird/vue3outline';

formCreate.use(install)

VXETable.use(VXETablePluginElement)

function setupOtherImports(app: App) {
    app
        .use(FitsAdmin)
        .use(formCreate)
        .use(VXETable)
        .use(useOutline)
}

export default setupOtherImports