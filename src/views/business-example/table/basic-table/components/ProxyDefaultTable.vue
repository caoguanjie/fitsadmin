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
// const myData = ref({
//     name: '123'
// })

const gridOptions: FitsTableProps = {
    columns: [
        { field: 'Checkbox', type: 'checkbox', width: 50 },
        { field: 'name', title: '姓名', editRender: { name: 'input', defaultValue: '小明' } },
        { field: 'phone', title: '电话', editRender: { name: 'input', defaultValue: '13578459562' } },
        { field: 'birth', title: '出生日期', editRender: { name: 'input', defaultValue: '2006-11-07' } },
        { field: 'address', title: '地址', editRender: { name: 'input', defaultValue: '广东省广州市越秀区中山路快乐小区6号楼801' }, width: 320 },
    ],
    formConfig: {
        // formConfig?.data和proxyConfig不能同时存在，会报【参数 "grid.data" 与 "grid.proxy-config" 有冲突】这个错误信息。可以通过1. defaultValue 2.
        data: {
            name: '123'
        },
        items: [
            // , defaultValue: '123'
            { field: 'name', title: '姓名', itemRender: { name: 'ElInput', props: { placeholder: '请输入姓名' } } },
        ]
    },
    proxyConfig: {
        enabled: true,
        form: false, // 启用表单代理
        autoLoad: false,
        ajax: {
            query: ({ form }: any) => {
                // console.log(myData.value, 'myData');

                return new Promise(resolve => {
                    // XEUtils.merge(form, gridOptions.formConfig?.data)
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
    toolbarConfig: {
        tools: {}
    }
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

onMounted(() => {
    // console.log(fitsTablePro);
    // console.log(xGrid.value.fitsTablePro.getFormItems());
    // fitsTablePro.proxyConfig!.form = true
    // fitsTablePro.formConfig!.data = {
    //     name: '123'
    // }
    // console.log(fitsTablePro, 1223);
})
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>