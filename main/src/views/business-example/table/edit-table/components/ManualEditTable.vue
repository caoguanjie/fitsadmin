<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #operation_default="{ slotProps: { row } }">
            <el-button @click="editRow(row)">
                编辑
            </el-button>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTable } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const gridOptions: FitsTableProps = {
    keepSource: true,
    columns: [
        {
            field: 'name', title: '姓名',
            editRender: {
                name: 'input'
            }
        },
        {
            field: 'phone', title: '电话',
            editRender: {
                name: 'input'
            }
        },
        {
            field: 'birth', title: '出生日期',
            editRender: {
                name: 'ElDatePicker'
            }
        },
        {
            field: 'address', title: '地址', width: 320,
            editRender: {
                name: 'input'
            }
        },
        { field: 'operation', title: '操作', slots: { default: 'operation_default' } },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401', operation: '12' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
    editConfig: {
        trigger: 'manual',
        mode: 'row'
    },
    toolbarConfig: {
        tools: {
            enabled: false
        }
    },
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
function editRow(row: any) {
    xGrid.value.fitsTablePro.setEditRow(row)
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>
