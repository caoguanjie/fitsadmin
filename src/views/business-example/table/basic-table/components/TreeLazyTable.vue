<template>
    <fits-table :option="fitsTablePro" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTable } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

let i = 0

const loadMethod: any = ({ row }: any) => {
    // 异步加载子节点
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: row.id + 100000, parentId: row.id, name: '客户中心', rate: 9, numner: 24, level: 1 },
                { id: row.id + 150000, parentId: row.id, name: '服务中心', rate: 9, numner: 24, level: 1, hasChild: i < 2 }
            ])
            i++
        }, 500)
    })
}
const xGrid = ref<VxeGridInstance | any>()
const gridOptions: FitsTableProps = {
    columns: [
        { field: 'name', title: '部门', width: 200, treeNode: true },
        { field: 'level', title: '绩效', },
        { field: 'numner', title: '考核分数', },
        { field: 'rate', title: '等级', width: 150 },
    ],
    data: [
        {
            name: '总经办',
            level: '',
            numner: '',
            rate: '',
            hasChild: true,
        },
        {
            name: '产品部',
            level: '',
            numner: '',
            rate: '',
            hasChild: true,
        },
        {
            name: '研发部',
            level: '',
            numner: '',
            rate: '',
        }
    ],
    treeConfig: {
        lazy: true,
        loadMethod
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>