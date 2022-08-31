import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";


// 业务范例
export const businessRouter: RouteRecordRaw = {
    path: "/businessRouter",
    component: Layout,
    redirect: "/businessRouter/Enclosure/EnclosureDownload",
    meta: { title: "业务范例", icon: "fits-yewu", roles: ["admin", "editor"] },
    children: [
        {
            path: "Enclosure",
            name: "Enclosure",
            redirect: "/businessRouter/Enclosure/EnclosureDownload",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "附件功能", roles: ["admin", "editor"], icon: 'fits-fujian' },
            children: [
                {
                    path: "EnclosureDownload",
                    name: "EnclosureDownload",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "附件下载" },
                },
                {
                    path: "EnclosurePreview",
                    name: "EnclosurePreview",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "附件预览" },
                },
                {
                    path: "EnclosureUpload",
                    name: "EnclosureUpload",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "附件上传" },
                },
                {
                    path: "List",
                    name: "EnclosureTable",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "综合附件列表" },
                },
            ],
        },
        {
            path: "Table",
            name: "Table",
            redirect: "/businessRouter/Table/DynamicTable",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "复杂表格", roles: ["admin", "editor"], icon: "fits-table-menu" },
            children: [
                {
                    path: "DynamicTable",
                    name: "DynamicTable",
                    component: () =>
                        import("@/views/ready/index.vue"),
                    meta: { title: "动态表格" },
                },
                {
                    path: "ComplexTable",
                    name: "ComplexTable",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "复杂表头" },
                },
                {
                    path: "DrapTable",
                    name: "DrapTable",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "拖拽table" },
                },
                {
                    path: "EditTable",
                    name: "EditTable",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "table内编辑" },
                },
                {
                    path: "ComplexReport",
                    name: "ComplexReport",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "复杂报表" },
                },
                {
                    path: "VirtualScroll",
                    name: "VirtualScroll",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "虚拟滚动" },
                },
                {
                    path: "AllTable",
                    name: "AllTable",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "综合表格" },
                },
            ],
        },

        {
            path: "Excle",
            name: "Excle",
            redirect: "/businessRouter/Excle/ExploreExcle",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "execle功能", roles: ["admin", "editor"], icon: "fits-execle" },
            children: [
                {
                    path: "ExploreExcle",
                    name: "ExploreExcle",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "导出excle" },
                },
                {
                    path: "ExploreSelected",
                    name: "ExploreSelected",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "导出已选择项" },
                },
                {
                    path: "ExploreMultistageTableHead",
                    name: "ExploreMultistageTableHead",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "导出多级表头" },
                },
                {
                    path: "UploadExcle",
                    name: "UploadExcle",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "上传excle" },
                },
                {
                    path: "DownloadExcle",
                    name: "DownloadExcle",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "下载excle" },
                },
            ],
        },
        {
            path: "PDF",
            name: "PDF",
            redirect: "/businessRouter/PDF/PreviewPDF",
            component: () => import("@/views/ready/index.vue"),
            meta: { title: "pdf功能", roles: ["admin", "editor"], icon: 'fits-pdf' },
            children: [
                {
                    path: "PreviewPDF",
                    name: "PreviewPDF",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "预览pdf" },
                },
                {
                    path: "UploadPDF",
                    name: "UploadPDF",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "上传pdf" },
                },
                {
                    path: "DownloadPDF",
                    name: "DownloadPDF",
                    component: () => import("@/views/ready/index.vue"),
                    meta: { title: "下载pdf" },
                },
            ],
        },

        {
            path: "echarts",
            name: "Echarts",
            redirect: "/businessRouter/echarts/bar-echarts",
            component: () => import("@/views/components-manage/index.vue"),
            meta: { title: "echarts图表", roles: ["admin", "editor"], icon: 'fits-charts' },
            children: [
                {
                    // path (kebab-case) 是fitsAdmin的路由命名规范
                    path: "bar-echarts",
                    name: "BarEcharts",
                    component: () => import("@/views/components-manage/echarts/BarEchartsExample.vue"),
                    meta: { title: "柱状图" },
                },
                {
                    // path (kebab-case) 是fitsAdmin的路由命名规范
                    path: "line-echarts",
                    name: "LineEcharts",
                    component: () => import("@/views/components-manage/echarts/LineEchartsExample.vue"),
                    meta: { title: "折线图" },
                },
                {
                    // path (kebab-case) 是fitsAdmin的路由命名规范
                    path: "pie-echarts",
                    name: "PieEcharts",
                    component: () => import("@/views/components-manage/echarts/PieEchartsExample.vue"),
                    meta: { title: "饼图" },
                },
                {
                    // path (kebab-case) 是fitsAdmin的路由命名规范
                    path: "comprehensive-example1",
                    name: "ComprehensiveExample1",
                    component: () => import("@/views/components-manage/echarts/ComprehensiveExample1.vue"),
                    meta: { title: "综合范例1" },
                },
                {
                    // path (kebab-case) 是fitsAdmin的路由命名规范
                    path: "comprehensive-example2",
                    name: "ComprehensiveExample2",
                    component: () => import("@/views/components-manage/echarts/ComprehensiveExample2.vue"),
                    meta: { title: "综合范例2" },
                },
            ],
        },
    ],
};


