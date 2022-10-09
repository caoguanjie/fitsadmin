// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 目前不支持自动按需加载, 需要手动导入一下 auto-import.js 文件
import install from '@form-create/element-ui/auto-import'
import formCreate from '@form-create/element-ui';

formCreate.use(install)

export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        app.use(formCreate)
    },
});