<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #name_header="{ name, row }">
            姓名
            <el-button size="small" type="primary">
                按钮
            </el-button>
        </template>
        <template #birth_header="{ name, row }">
            出生日期
            <span class="vxe-icon-chart-bar-y"></span>
        </template>
        <template #operation_header="{ name, row }">
            <el-input placeholder='自定义' v-model="opeInput" />
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTableProps, useFitsTablePro, FitsTable } from '@/fits-components';
import { VxeGridInstance } from 'vxe-table';

const opeInput = ref('')

const gridOptions: FitsTableProps = {
    columns: [
        { field: 'name', title: '姓名', slots: { header: 'name_header' } },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期', slots: { header: 'birth_header' }, headerClassName: 'birthHeader' },
        { field: 'address', title: '地址', width: 320 },
        { field: 'operation', title: '操作', slots: { header: 'operation_header' } },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ]
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>
:deep(.birthHeader) span {
    color: red;
}
</style>

<style lang="scss">

</style>