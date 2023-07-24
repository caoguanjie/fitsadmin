<template>
    <fits-table :option="fitsTablePro" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTable } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const gridOptions: FitsTableProps = {
    border: 'full',
    columns: [
        { type: 'seq', field: "Index", width: 50, title: '序号' },
        {
            title: '基本信息',
            field: "basic",
            children: [
                { field: 'name', title: '姓名' },
                {
                    title: '其他信息',
                    field: "other",
                    children: [
                        { field: 'phone', title: '电话' },
                        { field: 'birth', title: '生日' }
                    ]
                },
                { field: 'sex', title: '性别' }
            ]
        },
        { field: 'mark', title: '备注', sortable: true, showOverflow: true },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', sex: '男', mark: '下周五入住201房' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', sex: '男', mark: '无' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', sex: '女', mark: '已离职，归还设备' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', sex: '女', mark: '此人不存在 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', sex: '男', mark: '办理手续、护照、签证 、身份汇总' },
    ],
    headerAlign: 'center',
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

</style>