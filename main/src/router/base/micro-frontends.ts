import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";


// 微前端结构
export const microRouter: RouteRecordRaw = {
    path: "/microFrontends",
    component: Layout,
    redirect: "/microFrontends/vite-vue3/keepalive",
    meta: { title: "微前端wujie", icon: "fits-yewu", roles: ["admin", "editor"] },
    children: [
        {
            path: "vite-vue3",
            name: "ViteVue3",
            redirect: "/microFrontends/vite-vue3/keepalive",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "vue3子应用", roles: ["admin", "editor"], icon: 'fits-vue3' },
            children: [
                {
                    path: "keepalive1",
                    name: "ViteKeepalive1",
                    component: () => import("@/views/wujie/vite-vue3/KeepAliveView1.vue"),
                    meta: { title: "保活模式1", path: '/sysManger/orgin/user', },
                },
                {
                    path: "keepalive2",
                    name: "ViteKeepalive2",
                    component: () => import("@/views/wujie/vite-vue3/KeepAliveView2.vue"),
                    meta: { title: "保活模式2", path: '/componentManger/formcomponents/treeSelect', },
                },
                {
                    path: "singleView1",
                    name: "SingleViewTest1",
                    component: () => import("@/views/wujie/vite-vue3/SingleView.vue"),
                    meta: { title: "单例模式1", path: '/componentManger/formcomponents/treeSelect' },
                },
                {
                    path: "singleView2",
                    name: "SingleViewTest2",
                    component: () => import("@/views/wujie/vite-vue3/SingleView.vue"),
                    meta: { title: "单例模式2", path: '/componentManger/formcomponents/treeSelect' },
                },
                // {
                //     path: "re-view",
                //     name: "Review",
                //     component: () => import("@/views/ready/index.vue"),
                //     meta: { title: "重建模式" },
                // }
            ],
        },
        {
            path: "webpack-vue2",
            name: "ViteVue3",
            redirect: "/microFrontends/vite-vue3/keepalive",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "vue2子应用", roles: ["admin", "editor"], icon: 'fits-vue2' },
            children: [
                {
                    path: "example1",
                    name: "example1",
                    component: () => import("@/views/wujie/webpack-vue2/index.vue"),
                    meta: { title: "工作流范例", path: '/businessRouter/Workflow', },
                },
                {
                    path: "example2",
                    name: "example2",
                    component: () => import("@/views/wujie/webpack-vue2/index.vue"),
                    meta: { title: "组织机构管理", path: '/sysManger/user/organ' },
                },
                {
                    path: "example3",
                    name: "example3",
                    component: () => import("@/views/wujie/webpack-vue2/index.vue"),
                    meta: { title: "个人信息", path: '/useinfo/index' },
                }
            ],
        },
        {
            path: "jQuery",
            name: "JqueryView",
            redirect: "/microFrontends/jQuery/DynamicTable",
            component: () => import("@/views/business-example/index.vue"),
            meta: { title: "jQuery项目", roles: ["admin", "editor"], icon: "fits-jq", alwaysShow: true },
            children: [
                {
                    path: "BasicTable",
                    name: "BasicTable",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "公司内部旧前端项目" },
                }
            ],
        },
        {
            path: "angular",
            name: "angular",
            redirect: "/microFrontends/angular/ionic-angular",
            component: () => import("@/views/business-example/index.vue"),
            meta: { title: "Angular项目", roles: ["admin", "editor"], icon: "fits-Angular", alwaysShow: true },
            children: [
                {
                    path: "ionic-angular",
                    name: "IonicAngular",
                    component: () => import("@/views/wujie/Angular/indev.vue"),
                    meta: { title: "APP旧Angular框架" },
                }
            ],
        },
        {
            path: "outersize",
            name: "OuterSize",
            redirect: "/microFrontends/outersize/wujieurl",
            component: () => import("@/views/business-example/index.vue"),
            meta: { title: "第三方网站", roles: ["admin", "editor"], icon: "fits-outsize", alwaysShow: true },
            children: [
                {
                    path: "wujieurl",
                    name: "wujieurl",
                    component: () => import("@/views/wujie/out-size/index.vue"),
                    meta: { title: "无界官网" },
                },
            ],
        },
    ],
};


