<template>
    <fits-table :option="fitsTablePro" class="expandRowTable" ref="xGrid">
        <template #expand="{ slotProps: { row } }">
            <el-descriptions title="User Info">
                <el-descriptions-item label="姓名">{{ row.name }}</el-descriptions-item>
                <el-descriptions-item label="电话">{{ row.phone }}</el-descriptions-item>
                <el-descriptions-item label="出生日期">{{ row.birth }}</el-descriptions-item>
                <el-descriptions-item label="地址">{{ row.address }}</el-descriptions-item>
            </el-descriptions>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTableProps, FitsTable } from '@/fits-components';
import { useFitsTablePro } from '@/fits-components/type'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { VxeGridInstance } from 'vxe-table';

const gridOptions: FitsTableProps = {
    columns: [
        { field: 'expand', type: 'expand', slots: { content: 'expand' } },
        { field: 'name', title: '姓名' },
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
    expandConfig: {

    }
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>
.expandRowTable {
    :deep(.myDescriptions) {
        margin: 20px;
    }
}

.el-descriptions {
    margin: 20px;
}
</style>

<style lang="scss">

</style>