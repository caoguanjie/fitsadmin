
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
import WujieVue from "wujie-vue3";
import useStore from '@/store';
import ENV from './environment';
// 自动加载按需加载ele组件
function setupOtherImports(app: App) {

    app
        .use(VXETable)
        .use(useOutline)
        .use(WujieVue)
    // 使用ele的组件兼容插件
    VXETable.use(VXETablePluginElement)
    // 自定义工具栏
    VXETable.use(VXETablePluginFits)
    const { microFrontends: { setupSubApp, preloadSubApp } } = useStore()
    if (import.meta.env.MODE !== 'dev') {
        setupSubApp();
        preloadSubApp();
    }

}
export default setupOtherImports