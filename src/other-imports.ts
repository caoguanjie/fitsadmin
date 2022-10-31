
// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
// import install from '@form-create/element-ui/auto-import'


import formCreate from '@form-create/element-ui';
import { App } from 'vue';
// vxe-table插件，整合了element组件库
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// 引入相关css
import 'fits-admin-ui/es/style.css';
//自动生成导航菜单
import { useOutline } from '@lazebird/vue3outline';
import VXETablePluginElement from '@/utils/base/VXETablePluginElement'

function setupOtherImports(app: App) {
    app
        .use(formCreate)
        .use(VXETable)
        .use(useOutline)

    VXETable.use(VXETablePluginElement)
}

export default setupOtherImports