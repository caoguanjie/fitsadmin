<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #myBtn>
            <el-button @click="changeTrigger('click')">
                切换单击触发
            </el-button>
            <el-button @click="changeTrigger('dblclick')">
                切换双击触发
            </el-button>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTableProps, useFitsTablePro, FitsTable } from '@/fits-components';
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()

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
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401', },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
    editConfig: {
        trigger: 'click',
        mode: 'row'
    },
    toolbarConfig: {
        slots: {
            buttons: 'myBtn'
        },
        tools: {
            enabled: false
        }
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
function changeTrigger(t: any) {
    fitsTablePro.editConfig!.trigger = t
}
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>
