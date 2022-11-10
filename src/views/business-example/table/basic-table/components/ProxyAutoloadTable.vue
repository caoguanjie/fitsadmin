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
import { FitsTableProps, FitsTable } from '@/fits-components';
import { useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';
import { AxiosResponse } from 'axios';
import { getTableList } from '@/api/business/table';

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
            query: ({ form }: any) => {
                return new Promise(resolve => {
                    getTableList(form).then((result: AxiosResponse) => {
                        const { ReturnData } = result;
                        if (!ReturnData) {
                            // 当接口不给力，随便返回null的时候，我们要初始化值
                            resolve({
                                list: [],
                            })
                            return;
                        }
                        resolve({
                            list: ReturnData.TableList
                        })
                    })
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