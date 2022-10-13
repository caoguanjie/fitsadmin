<template>
    <fits-table :option="gridOptions" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTableProps } from '@/components/List/type';
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance>()

const state = reactive({
})
const { }: any = toRefs(state);

const gridOptions = reactive<FitsTableProps>({
    stripe: true,
    rowConfig: {
        isHover: true,
    },
    columns: [
        { field: 'name', title: '姓名', },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期' },
        { field: 'address', title: '地址', width: 320 },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
})

</script>
<style lang='scss' scoped>
.basic-table {
    padding: 0 $basePadding;
    background-color: #fff;
}
</style>

<style lang="scss">

</style>