<template>
    <div class="exportBase">
        <div class="contain">
            <div class="buttonClass">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="导出文件名称：">
                        <el-input v-model="fileName" placeholder="请输入文件名" />
                    </el-form-item>
                    <el-form-item label="是否根据Table宽度导出：">
                        <el-radio-group v-model="fileWidth" class="ml-4">
                            <el-radio :label="true" size="large">是</el-radio>
                            <el-radio :label="false" size="large">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="导出文件格式：">
                        <el-select v-model="fileType" placeholder="请选择文件格式">
                            <el-option v-for="(item, key) in options" :key="key" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="">
                        <a href="https://vxetable.cn/#/table/advanced/export" target="_blank" style="margin-left: 15px">
                            <el-tag type="info">Excel导出相关资料</el-tag>
                        </a>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-bottom:10px;" @click="exportForm" type="primary">导出选中</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- <fits-list-seach :formItem='formItem' /> -->
            <div class="tableClass">
                <fits-table :option="fitsTablePro" ref="xGrid">
                    <template #state="{ slotProps }">
                        <el-switch v-model="slotProps.row.Ustate"
                            style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
                        <!-- {{ slotProps.row.Ustate }} -->
                    </template>
                </fits-table>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup name="ExploreSelected">
import { getRoleList } from '@/api/base/system';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance } from 'vxe-table';
import { useFitsTablePro, FitsTableProps, FitsTable } from '@/fits-components'
import { ref } from 'vue'

const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    // border: true,
    keepSource: false,
    showOverflow: "tooltip",
    id: 'rolestable',
    rowConfig: {
        height: 52,
        isCurrent: true,
    },
    //数据缓存，如果其他表格也使用了同一个key会导致表格数据串用
    storage: {
        enabled: true,
        key: 'ExampleRoleList',
        dataBase: (user.userInfo as any).id,
    },
    // formConfig: {
    //     items: [
    //         { field: 'name', span: 3, title: '角色名称', itemRender: { name: 'ElInput', props: { placeholder: '请输入角色名称' } } },
    //         { field: 'code', span: 3, title: '角色编码', itemRender: { name: 'ElInput', props: { placeholder: '请输入角色编码' } } },
    //     ]
    // },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', minWidth: 80 },
        { field: 'Uname', title: '角色名称', minWidth: 130 },
        { field: 'Ucode', title: '角色编码', minWidth: 130 },
        { field: 'Udescribe', title: '角色描述', minWidth: 130 },
        { field: 'Sort', title: '排序', minWidth: 100 },
        { field: 'Ustate', title: '角色状态', slots: { default: 'state' }, minWidth: 100 },
    ],
    toolbarConfig: {
        buttons: [
        ],
        tools: {
            enabled: false
        },
    },

    proxyConfig: {
        form: true, // 启用表单代理
        autoLoad: true,
        ajax: {
            query: ({ form }) => {
                return new Promise(resolve => {
                    // 整合分页参数
                    const pageParam = {
                        pageIndex: 11,
                        pageSize: 23,
                    }
                    // formConfig?.data和proxyConfig不能同时存在，会报【参数 "grid.data" 与 "grid.proxy-config" 有冲突】这个错误信息，所以需要把data这个默认值赋值给form变量
                    // XEUtils.merge(form, gridOptions.formConfig?.data)
                    getRoleList(form, pageParam).then((result: AxiosResponse) => {
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
                            },
                        })
                    })
                })
            }
        }
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
const exportForm = () => {
    xGrid.value.fitsTablePro.exportData({
        type: fileType.value,
        filename: fileName.value,
        useStyle: fileWidth.value, //是否导出样式
        data: xGrid.value.fitsTablePro.getCheckboxRecords()
    })
}
let fileName = ref("默认文件名")
let fileType = ref("csv")
let fileWidth = ref(true)
const options = [
    {
        value: 'csv',
        label: 'csv',
    },
    {
        value: 'html',
        label: 'html',
    },
    {
        value: 'xml',
        label: 'xml',
    },
    {
        value: 'txt',
        label: 'txt',
    },
]
</script>
<style lang="scss" scoped>
.exportBase {
    height: 100%;
    margin: 0;
    padding: 14px $basePadding;

    .contain {
        .buttonClass {
            display: flex;
            justify-content: space-between;

            .item {
                display: flex;
            }
        }

        .tableClass {
            height: 80vh;
        }
    }
}
</style>