<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #buttons>
            <el-button @click="queryData">
                手动查询数据
            </el-button>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTable } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    columns: [
        { field: 'Checkbox', type: 'checkbox', width: 50 },
        { field: 'name', title: '姓名', editRender: { name: 'input', defaultValue: '小明' } },
        { field: 'phone', title: '电话', editRender: { name: 'input', defaultValue: '13578459562' } },
        { field: 'birth', title: '出生日期', editRender: { name: 'input', defaultValue: '2006-11-07' } },
        { field: 'address', title: '地址', editRender: { name: 'input', defaultValue: '广东省广州市越秀区中山路快乐小区6号楼801' }, width: 320 },
    ],
    formConfig: {
        items: [
            { field: 'name', title: '姓名', itemRender: { name: 'ElInput', props: { placeholder: '请输入姓名' } } },
        ]
    },
    toolbarConfig: {
        tools: {
            export: false,
            fullscreen: false,
            custom: false,
            search: false,
            query: false
        },
        slots: {
            buttons: 'buttons'
        }
    },
    proxyConfig: {
        enabled: true,
        form: true, // 启用表单代理
        autoLoad: true, // 自动加载
        ajax: {
            query: () => {
                return new Promise(resolve => {
                    const TableList = [
                        {
                            "id": "530000198307057387",
                            "birth": "2000-12-01",
                            "phone": "13254548965",
                            "name": "张晓明",
                            "address": "上海快乐大道11111"
                        },
                        {
                            "id": "820000199611275163",
                            "birth": "2011-07-26",
                            "phone": "18752365489",
                            "name": "陈美美",
                            "address": "上海快乐大道11111"
                        },
                        {
                            "id": "81000019751226373X",
                            "birth": "1987-05-12",
                            "phone": "13784525698",
                            "name": "王明",
                            "address": "上海快乐大道11111"
                        },
                        {
                            "id": "12000020130303977X",
                            "birth": "1988-10-06",
                            "phone": "13784525698",
                            "name": "李晶晶",
                            "address": "广东省广州市天河区五山小路2街101"
                        },
                        {
                            "id": "510000201010286614",
                            "birth": "2011-07-26",
                            "phone": "18952364784",
                            "name": "王明",
                            "address": "广东省广州市天河区五山小路2街101"
                        },
                        {
                            "id": "310000200307208631",
                            "birth": "1987-05-12",
                            "phone": "18952364784",
                            "name": "王明",
                            "address": "广东省广州市天河区五山小路1街545"
                        },
                        {
                            "id": "340000197608296947",
                            "birth": "1987-05-12",
                            "phone": "18952364784",
                            "name": "黄白",
                            "address": "北京市朝阳区群街道办"
                        },
                    ]
                    setTimeout(() => {
                        resolve({
                            list: TableList
                        })
                    }, 500)
                })
            },
        },
        props: {
            list: 'list'
        }
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

function queryData() {
    xGrid.value?.fitsTablePro.commitProxy('query')
}
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>