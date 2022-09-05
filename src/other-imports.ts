
// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件, 详情：https://github.com/xaboy/form-create/issues/511
import install from '@form-create/element-ui/auto-import'

import formCreate from '@form-create/element-ui';
import { App } from 'vue';


formCreate.use(install)

function setupOtherImports(app: App) {
    app.use(formCreate)
}

export default setupOtherImports