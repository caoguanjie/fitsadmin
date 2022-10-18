// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";

// 引入svg注册脚本
import 'virtual:svg-icons-register';

import formCreate from '@form-create/element-ui';

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        app
        .use(formCreate)
        .use(ElementPlus, {
            locale: zhCn,
        })
        .use(VXETable)
    },
});