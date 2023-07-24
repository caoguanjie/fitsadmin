<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #buttons>
            <fits-input-search @input-search="InputSearch" @input-change="(val) => inputValue = val">
            </fits-input-search>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTable, FitsInputSearch } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const inputValue = ref('')
const gridOptions: FitsTableProps = {
    columns: [
        { field: 'name', title: '姓名', },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期' },
        { field: 'address', title: '地址', width: 320 },
    ],
    proxyConfig: {
        enabled: true,
        autoLoad: false,
        ajax: {
            query: () => {
                return new Promise(resolve => {
                    const form = { input: inputValue.value }
                    // 文档看不到请求效果，所以用alert来展示
                    alert(`表单参数：${JSON.stringify(form)}`)
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
    toolbarConfig: {
        slots: {
            buttons: 'buttons'
        },
        tools: {}
    }
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

/**
 * 点击搜索按钮的回调
 */
function InputSearch() {
    xGrid.value?.fitsTablePro.commitProxy('query')
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>