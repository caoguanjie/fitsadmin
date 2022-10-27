<template>
    <fits-table :option="fitsTablePro" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTableProps, useFitsTablePro, FitsTable } from '@/fits-components';
import { VxeGridInstance } from 'vxe-table';
import { AxiosResponse } from 'axios';
import XEUtils from 'xe-utils';
import { getMenuList } from '@/api/base/system';

const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    columns: [
        { field: 'Indexes', title: '序号', type: 'seq' },
        { field: 'Icon', title: '图标' },
        { field: 'ComponentPath', title: '组件路径' },
        { field: 'IsUrL', title: '外链' },
        { field: 'IsCache', title: '缓存' },
        { field: 'CreateTime', title: '创建日期' },
    ],
    toolbarConfig: {
        tools: {
            enabled: true,
        }
    },
    pagerConfig: {
        // enabled: true
    },
    proxyConfig: {
        form: true, // 启用表单代理
        autoLoad: false,
        ajax: {
            query: ({ form }: any) => {
                return new Promise(resolve => {
                    // 整合分页参数
                    const pageParam = {
                        pageIndex: 11,
                        pageSize: 23,
                    }
                    // formConfig?.data和proxyConfig不能同时存在，会报【参数 "grid.data" 与 "grid.proxy-config" 有冲突】这个错误信息，所以需要把data这个默认值赋值给form变量
                    // XEUtils.merge(form, gridOptions.formConfig?.data)
                    getMenuList(form, pageParam).then((result: AxiosResponse) => {
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
                            result: XEUtils.toTreeArray(ReturnData.TableList, { clear: true }),
                            page: {
                                total: ReturnData.ItemCount
                            },
                        })

                    })
                })

            }
        }
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>