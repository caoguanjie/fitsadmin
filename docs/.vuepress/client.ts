import ElementPlus from 'element-plus';
import { defineClientConfig } from '@vuepress/client'
import 'element-plus/dist/index.css'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.use(ElementPlus)
        // import('element-plus/dist/index.css').then((value) => {
        //     console.log(value)
        // })
    },

})