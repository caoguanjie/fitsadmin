<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #buttons>
            <fits-input-search @input-search="InputSearch" @input-change="(val) => inputValue = val" />
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTable, FitsInputSearch } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';
import { AxiosResponse } from 'axios';
import { getTableList } from '@/api/business/table';

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
                    getTableList({ input: inputValue.value }).then((result: AxiosResponse) => {
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
 * @param input 拿到的表单数据
 */
function InputSearch(input: any) {
    inputValue.value = input
    xGrid.value?.fitsTablePro.commitProxy('query')
}
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>