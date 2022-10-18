<template>
    <fits-table :option="gridOptions" />
</template>

<script lang='ts' setup>
import { FitsTableProps } from '@/components/List/type';

const gridOptions = reactive<FitsTableProps>({
    columns: [
        { field: 'name', title: '姓名', sortable: true, sortBy: sortByLength },
        { field: 'phone', title: '电话', sortable: true },
        { field: 'birth', title: '出生日期', sortable: true },
        { field: 'address', title: '地址', width: 320, sortable: true },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '欧阳星星', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
})

// 根据name的长度排序
function sortByLength({ row }: any) {
    return row.name.length
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>