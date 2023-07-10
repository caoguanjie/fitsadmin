
// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
// import install from '@form-create/element-ui/auto-import'


import formCreate from '@form-create/element-ui';
import { App } from 'vue';
// vxe-table插件，整合了element组件库
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// 引入相关css
//自动生成导航菜单
import { useOutline } from '@lazebird/vue3outline';
import VXETablePluginFits from '@/fits-components/Table/FitsTable/components/ToolsPluginElement'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
function setupOtherImports(app: App) {
    app
        .use(formCreate)
        .use(VXETable)
        .use(useOutline)
    // 使用ele的组件兼容插件
    VXETable.use(VXETablePluginElement)
    // 自定义工具栏
    VXETable.use(VXETablePluginFits)
}

export default setupOtherImports