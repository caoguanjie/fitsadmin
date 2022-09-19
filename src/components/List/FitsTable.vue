<template>
    <vxe-grid ref="xGrid" v-bind="gridOptions" />
</template>

<script lang='ts' setup>
import { VxeGridInstance, VxeGridProps } from 'vxe-table';


const xGrid = ref<VxeGridInstance>()
const gridOptions = reactive<VxeGridProps>({
    // border: true,
    keepSource: true,
    id: 'toolbar_demo_1',
    height: 530,
    printConfig: {},
    importConfig: {},
    exportConfig: {},
    columnConfig: {
        // resizable: true
    },
    customConfig: {
        storage: true
    },
    columns: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: {}, slots: { edit: 'name_edit' } },
        { field: 'nickname', title: 'Nickname', editRender: { autofocus: '.vxe-input--inner' }, slots: { edit: 'nickname_edit' } },
        { field: 'role', title: 'Role', editRender: {}, slots: { edit: 'role_edit' } },
        { field: 'address', title: 'Address', showOverflow: true, editRender: {}, slots: { edit: 'address_edit' } }
    ],
    data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
    ],
    toolbarConfig: {
        buttons: [
            { code: 'myInsert', name: '新增' },
            { code: 'mySave', name: 'app.body.button.save', status: 'success' },
            { code: 'myExport', name: '导出数据', type: 'text', status: 'warning' },
            {
                name: '禁用按钮',
                disabled: false,
                dropdowns: [
                    { code: 'other1', name: '下拉的按钮1', type: 'text', disabled: false },
                    { code: 'other2', name: '下拉的按钮2', type: 'text', disabled: true },
                    { code: 'other3', name: '下拉的按钮3', type: 'text', disabled: false }
                ]
            }
        ],
        tools: [
            { code: 'searchIcon', icon: 'vxe-icon-search' },
            { code: 'setting', icon: 'vxe-icon-setting' }
        ],
        refresh: {
            // 刷新
            icon: 'vxe-icon-refresh'
        },
        zoom: true,
        export: true,
        custom: true
    },
})
</script>
<style lang='scss' scoped>
:deep(.vxe-toolbar) {
    padding: 16px 0;
}

:deep(.vxe-tools--wrapper),
:deep(.vxe-custom--wrapper),
:deep(.vxe-tools--operate) {
    &>button {
        width: 36px;
        height: 32px;
        margin: 0 -1px 0 0;
        color: var(--fits-button-text-color);
        border-color: var(--fits-button-border-base-color);
        border-radius: 0 !important;
    }

    &>button:hover,
    &>button:focus,
    &>button:active {
        z-index: 1;
        color: var(--fits-base-color) !important;
        border-color: var(--fits-button-border-focus-color) !important;
        background-color: var(--fits-base-background-color) !important;
    }
}

:deep(.vxe-tools--wrapper) {
    &>button:first-child {
        border-top-left-radius: var(--fits-button-border-radius) !important;
        border-bottom-left-radius: var(--fits-button-border-radius) !important;
    }
}

:deep(.vxe-custom--wrapper) {
    margin-left: 0;

    &>button {
        border-top-right-radius: var(--fits-button-border-radius) !important;
        border-bottom-right-radius: var(--fits-button-border-radius) !important;
    }
}

// 下面是按钮的布局
:deep(.vxe-button) {
    font-size: 12px;
}

:deep(.vxe-button.type--button) {
    height: 32px;
    border-radius: 2px;
    padding: 0 1.5em;
    border: solid 1px #c0c4cc;
    color: var(--fits-button-text-color)
}


:deep(.vxe-button.type--button.is--circle) {
    padding: 0 0.5em;
}
</style>