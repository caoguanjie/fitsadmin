<template>
    <fits-table :option="fitsTablePro" ref="xGrid" />
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
        { type: 'seq', field: 'seq' },
        { field: 'Checkbox', type: 'checkbox', width: 50, sortable: true },
        { field: 'name', title: '姓名', editRender: { name: 'input', defaultValue: '小明' }, sortable: true },
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
            enabled: true,
        }
    },
    pagerConfig: {
        enabled: true
    },
    proxyConfig: {
        form: true, // 启用表单代理
        autoLoad: false,
        ajax: {
            query: ({ form, $grid, page, sort, sorts }: any) => {
                return new Promise(resolve => {
                    const pageParam = {
                        pageIndex: 11,
                        pageSize: 23,
                    }
                    getTableList(form, pageParam).then((result: AxiosResponse) => {
                        const { ReturnData } = result;
                        if (!ReturnData) {
                            // 当接口不给力，随便返回null的时候，我们要初始化值
                            resolve({
                                result: [],
                                page: {
                                    total: 0
                                }
                            })
                            return;
                        }
                        resolve({
                            result: ReturnData.TableList,
                            page: {
                                total: ReturnData.ItemCount
                            }
                        })
                    })
                })
            },
        },
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>