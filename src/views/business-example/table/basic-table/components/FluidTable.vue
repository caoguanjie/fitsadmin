<template>
    <fits-table :option="fitsTablePro" />
</template>

<script lang='ts' setup>
import { FitsTableProps, useFitsTablePro, FitsTable } from '@/fits-components';
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    maxHeight: 600,
    columns: [
        { field: 'Checkbox', type: 'checkbox', width: 50 },
        { field: 'name', title: '姓名', editRender: { name: 'input', defaultValue: '小明' } },
        { field: 'phone', title: '电话', editRender: { name: 'input', defaultValue: '13578459562' } },
        { field: 'birth', title: '出生日期', editRender: { name: 'input', defaultValue: '2006-11-07' } },
        { field: 'address', title: '地址', editRender: { name: 'input', defaultValue: '广东省广州市越秀区中山路快乐小区6号楼801' }, width: 320 },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
    ],
    toolbarConfig: {
        buttons: [
            // 传了icon 于是识别到了vxe自带的类型
            { name: '添加数据', code: 'insert', icon: 'vxe-icon-search', status: 'primary', },
            { name: '删除数据', code: 'remove', icon: 'vxe-icon-delete', },
        ],
        // slots: {

        // },
        // tools: {
        //     enabled: false
        // }
    },
    checkboxConfig: {
        range: true,
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>