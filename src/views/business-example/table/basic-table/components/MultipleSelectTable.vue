<template>
    <fits-table :option="fitsTablePro" @checkbox-change="checkboxChange" @toolbar-button-click="toolbarButtonClick"
        ref="xGrid">
        <template #myButtons>
            <el-button @click="setAllChecked(true)">
                选中所有可选行
            </el-button>
            <el-button @click="setAllChecked(false)">
                清楚所有勾选行
            </el-button>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTableProps, useFitsTablePro, FitsTable } from '@/fits-components';
import { ElButton, ElMessage } from 'element-plus';
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()
const gridOptions: FitsTableProps = {
    id: 'table2',
    columns: [
        { field: 'Checkbox', type: 'checkbox', width: 50 },
        { field: 'name', title: '姓名' },
        { field: 'phone', title: '电话' },
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
    checkboxConfig: {
        range: true,
        checkMethod
    },
    toolbarConfig: {
        slots: {
            buttons: 'myButtons'
        },
        // tools: {
        //     enabled: false
        // }
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
// 手动勾选行的复选框时触发
function checkboxChange({ rowIndex }: any) {
    console.log('checkboxChange');
    ElMessage({
        message: `你选中了第 ${rowIndex + 1} 条数据`,
        type: 'success',
    })
}


function toolbarButtonClick({ code, button, $event }: any) {
    console.log($event);
}

function checkMethod({ row }: any) {
    // 禁用地址在“幸福小区”的勾选项
    return row.address.indexOf('幸福小区') === -1
}

function setAllChecked(isChecked: boolean) {
    xGrid.value.fitsTablePro.setAllCheckboxRow(isChecked)
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>