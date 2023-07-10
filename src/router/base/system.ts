
import Layout from "@/layout/index.vue";
import { RouteRecordRaw, RouterView } from "vue-router";

const systemRouter: RouteRecordRaw = {
    path: "/sysManger",
    component: Layout,
    redirect: "/sysManger/orgin/roles",
    meta: { title: "系统管理", icon: "fits-system", activeMenu: '/sysManger' },
    children: [

        {
            path: "orgin",
            name: "Orgin",
            redirect: "/sysManger/orgin/roles",
            component: RouterView,
            meta: { title: "组织机构", icon: "fits-zhuji" },
            children: [
                {
                    path: "user",
                    name: "User",
                    component: () => import("@/views/system-manage/user/index.vue"),
                    meta: { title: "用户管理" },
                },
                {
                    path: "roles",
                    name: "Roles",

                    component: () => import("@/views/system-manage/roles/index.vue"),
                    meta: { title: "角色管理" },
                },
                {
                    path: "department",
                    name: "Department",
                    component: () => import("@/views/system-manage/department/index.vue"),
                    meta: { title: "部门管理" },
                },

                {
                    path: "menu",
                    name: "Menu",
                    component: () => import("@/views/system-manage/menu/index.vue"),
                    meta: { title: "菜单管理" },
                },

            ]
        },
        {
            path: "setting",
            name: "Setting",
            redirect: "/sysManger/setting/dictionary",
            component: RouterView,
            meta: { title: "基础设置", icon: "fits-base-setting", alwaysShow: true },
            children: [
                {
                    path: "dictionary",
                    name: "dictionary",
                    component: () => import("@/views/system-manage/setting/data-dictionary/index.vue"),
                    meta: { title: "数据字典", },
                }
            ]
        },
    ],
};
export default systemRouter;
