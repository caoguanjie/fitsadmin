<template>
    <fits-table :option="gridOptions" />
</template>

<script lang='ts' setup>
import { FitsTableProps } from '@/components/List/type';

const gridOptions = reactive<FitsTableProps>({
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
            children: [
                { name: '业务部', rate: 9, numner: 24, level: 1 },
                {
                    name: '客户部',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '客户A部', rate: 13, numner: 32, level: 1 },
                        { name: '客户B部', rate: 9, numner: 29, level: 4 },
                    ]
                },
            ]
        },
        {
            name: '研发部',
            level: '',
            numner: '',
            rate: '',
            children: [
                {
                    name: '研发A部',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '第一组', rate: 9, numner: 29, level: 4 },
                        { name: '第二组', rate: 22, numner: 28, level: 5 }
                    ]
                },
                {
                    name: '研发B部',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        {
                            name: '分部',
                            level: '',
                            numner: '',
                            rate: '',
                            children: [
                                { name: '研发1部', rate: 77, numner: 29, level: 4 },
                                { name: '研发2部', rate: 34, numner: 21, level: 2 }
                            ]
                        },
                        { name: '总部', rate: 22, numner: 26, level: 5 }
                    ]
                },
                {
                    name: '研发C部',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '研发中心组', rate: 11, numner: 35, level: 1 },
                        { name: '客户中心', rate: 40, numner: 18, level: 4 },
                        { name: '服务台', rate: 22, numner: 20, level: 2 }
                    ]
                }
            ]
        },
        {
            name: '产品部',
            level: '',
            numner: '',
            rate: '',
            children: [
                { name: '产品A队', rate: 3, numner: 22, level: 2 },
                { name: '产品B队', rate: 5, numner: 25, level: 3 },
                { name: '产品C队', rate: 17, numner: 35, level: 4 }
            ]
        }
    ],
    treeConfig: {
        iconOpen: 'vxe-icon-square-minus',
        iconClose: 'vxe-icon-square-plus',
    },
})



</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>