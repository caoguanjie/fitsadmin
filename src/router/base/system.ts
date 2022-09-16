
import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

const systemRouter: RouteRecordRaw = {
    path: "/sysManger",
    component: Layout,
    redirect: "/sysManger/orgin/user",
    meta: { title: "系统管理", icon: "fits-system", activeMenu: '/sysManger' },
    children: [
        {
            path: "orgin",
            name: "orgin",
            redirect: "/sysManger/orgin/user",
            component: () => import("@/views/system-manage/index.vue"),
            meta: { title: "组织机构", icon: "fits-zhuji" },
            children: [
                {
                    path: "user",
                    name: "user",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "用户管理", icon: "" },
                },
                {
                    path: "roles",
                    name: "roles",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "角色管理" },
                },
                {
                    path: "department",
                    name: "department",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "部门管理" },
                },
                {
                    path: "menu",
                    name: "menu",
                    component: () => import("@/views/system-manage/menu/index.vue"),
                    meta: { title: "菜单管理" },
                },
            ]
        },
        {
            path: "setting",
            name: "setting",
            redirect: "/sysManger/setting/dictionary",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "基础设置", icon: "fits-base-setting", alwaysShow: true },
            children: [
                {
                    path: "dictionary",
                    name: "dictionary",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "数据字典", },
                }
            ]
        },
    ],
};
export default systemRouter;
