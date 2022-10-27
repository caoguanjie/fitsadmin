<template>
    <fits-table :option="fitsTablePro" />
</template>

<script lang='ts' setup>
import { useFitsTablePro } from '@/components/FitsTablePro/FitsTable/FitsTableProHook';
import { FitsTableProps } from '@/components/FitsTablePro/FitsTable/type';
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    border: 'full',
    columns: [
        { field: 'name', title: '姓名', },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期' },
        { field: 'address', title: '地址', width: 320 },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '暂无数据', birth: '暂无数据', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
    mergeCells: [
        { row: 0, col: 2, rowspan: 2, colspan: 1 },
        { row: 4, col: 1, rowspan: 1, colspan: 2 }
    ]
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>