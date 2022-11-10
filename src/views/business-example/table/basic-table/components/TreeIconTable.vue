<template>
    <fits-table :option="fitsTablePro" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTableProps, FitsTable } from '@/fits-components';
import { useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()
const gridOptions: FitsTableProps = {
    columns: [
        { field: 'name', title: '部门', width: 200, treeNode: true },
        { field: 'level', title: '权限标识', },
        { field: 'numner', title: '创建时间', },
        { field: 'rate', title: '修改时间', width: 150 },
    ],
    data: [
        {
            name: '入库管理',
            level: '',
            numner: '',
            rate: '',
        },
        {
            name: '系统管理',
            level: '',
            numner: '',
            rate: '',
            children: [
                {
                    name: '用户管理',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '用户新增', rate: '2022-10-12', numner: '2021-02-17', level: 'sys:user:add' },
                        { name: '用户编辑', rate: '2022-10-12', numner: '2021-02-17', level: 'sys:user:edit' },
                        { name: '用户删除', rate: '2022-10-12', numner: '2021-02-17', level: 'sys:user:delete' },
                    ]
                },
                {
                    name: '角色管理',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '总经理', rate: '2022-10-12', numner: '2021-02-17', level: 'sys:role:manager' },
                        { name: '副经理', rate: '2022-10-12', numner: '2021-02-17', level: 'sys:role:deputymanager' },
                        { name: '产品', rate: '2022-10-12', numner: '2021-02-17', level: 'sys:role:producer' },
                    ]
                },
                {
                    name: '菜单管理',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '研发中心组', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' },
                        { name: '客户中心', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' },
                        { name: '服务台', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' }
                    ]
                },
                {
                    name: '部门管理',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '研发中心组', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' },
                        { name: '客户中心', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' },
                        { name: '服务台', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' }
                    ]
                },
                {
                    name: '管理',
                    level: '',
                    numner: '',
                    rate: '',
                    children: [
                        { name: '研发中心组', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' },
                        { name: '客户中心', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' },
                        { name: '服务台', rate: '2021-02-17', numner: '2021-02-17', level: 'sys:role:producer' }
                    ]
                }
            ]
        },
        {
            name: '多级菜单',
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
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)


</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>