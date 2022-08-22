
import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

const componentRouter: RouteRecordRaw = {
    path: "/componentManger",
    component: Layout,
    redirect: "/componentManger/package",
    meta: { title: "组件管理", icon: "fits-zujianguanli", roles: ["admin", "editor"] },
    children: [
        {
            path: "package",
            name: "package",
            redirect: "/componentManger/package/commonList",
            component: () => import("@/views/components-manage/index.vue"),
            meta: { title: "封装组件", icon: "fits-component1", alwaysShow: true },
            children: [
                {
                    path: "commonList",
                    name: "commonList",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "JSON列表", roles: ["admin", "editor"] },
                },
                {
                    path: "commonDialog",
                    name: "commonDialog",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "JSON弹窗", roles: ["admin", "editor"] },
                },
                {
                    path: "queryContent",
                    name: "queryContent",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "选择项", roles: ["admin", "editor"] },
                },
                {
                    path: "transfer",
                    name: "Transfer",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "穿梭框", roles: ["admin", "editor"] },
                },
                {
                    path: "tinymce",
                    name: "Tinymce",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "富文本编辑器", roles: ["admin", "editor"] },
                },
                {
                    path: "dialog",
                    name: "Dialog",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "拖拽对话框", roles: ["admin", "editor"] },
                },
                {
                    path: "Scrollbar",
                    name: "Scrollbar",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "滚动条范例", roles: ["admin", "editor"] },
                },
                {
                    path: "form",
                    name: "FormExample",
                    component: () => import("@/views/components-manage/form/FormExample.vue"),
                    meta: { title: "表单范例", roles: ["admin", "editor"] },
                },
                {
                    path: "echarts",
                    name: "EchartsExample",
                    component: () => import("@/views/components-manage/form/EchartsExample.vue"),
                    meta: { title: "Echarts范例", roles: ["admin", "editor"] },
                },
            ]
        },
        {
            path: "commonuse",
            name: "commonuse",
            redirect: "/sysManger/commonuse/GuidePage",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "常用功能", icon: "fits-changyong", roles: ["admin", "editor"] },
            children: [
                {
                    path: "GuidePage",
                    name: "GuidePage",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "引导页" },
                },

                {
                    path: "UploadComponent",
                    name: "UploadComponent",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "上传组件" },
                },
                {
                    path: "GoTop",
                    name: "GoTop",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "回到顶部", roles: ["admin", "editor"] },
                },
                {
                    path: "FixedTop",
                    name: "FixedTop",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "吸附顶部" },
                },
                {
                    path: "DrapList",
                    name: "DrapList",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "拖拽功能" },
                },
                {
                    path: "UploadComponents",
                    name: "UploadComponents",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "上传组件" },
                },
                {
                    path: "CopyText",
                    name: "CopyText",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "复制文本" },
                },
                {
                    path: "Workflow",
                    name: "Workflow",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "工作流范例", roles: ["admin", "editor"] },
                },

            ],
        },
        {
            path: "formcomponents",
            name: "formcomponents",
            redirect: "/componentManger/package/echarts",
            component: () => import("@/views/components-manage/index.vue"),
            meta: { title: "表单组件", icon: "fits-component1", alwaysShow: true },
            children: [
                {
                    path: "treeSelect",
                    name: "FitsTreeSelect",
                    component: () => import("@/views/components-manage/form-components/fits-tree-select/index.vue"),
                    meta: { title: "树筛选", roles: ["admin", "editor"] },
                },
            ]
        },
    ],
};
export default componentRouter;
