<template>
    <div class="menu-manage">
        <!-- <fits-list-seach :formItem='formItem' /> -->
        <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents">

            <template #operate="{ slotProps }">
                <span class="FromButton underline" @click="FormOperation(slotProps.row, 'edit')">编辑</span>
                <span class="FromButton delete" @click="FormOperation(slotProps.row, 'delete')">删除</span>
            </template>

            <template #isUrl="{ slotProps }">
                <el-switch v-model="slotProps.row.IsUrl"
                    style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
            </template>
            <template #isCache="{ slotProps }">
                <el-switch v-model="slotProps.row.IsCache"
                    style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
            </template>
            <template #state="{ slotProps }">
                <el-switch v-model="slotProps.row.IsEnabled"
                    style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
                <!-- {{ slotProps.row.Ustate }} -->
            </template>
        </fits-table>
        <!-- 工具栏操作确认弹窗（关联、启用、禁用、导出、删除） -->
        <fits-dialog :class="'Menu-baseDialog'" :visible="dialogData.base.visible" :dialogProp="dialogData.base.props"
            @cancel="closeDialog('base')" @submit="onSubmint(dialogData.base.key)">
            {{ dialogData.base.dialogText }}
        </fits-dialog>
        <!-- 数据弹窗（新增业务字典、字典、编辑字典分类） -->
        <fits-dialog :class="'onfooter'" :visible="dialogData.operate.visible" dialogData.relateRole.visible=false
            :dialogProp="dialogData.operate.props" :showFooter="false" @cancel="closeDialog('operate')">
            <add-menu @dataChange="dataChange" @closeDialog="closeDialog" :keys="dialogData.operate.key"
                :setData="dialogData.operate.data" :requireData="requireData" />
        </fits-dialog>
    </div>
</template>

<script lang='ts' setup name="Menu">
import XEUtils from 'xe-utils';
import { getMenuList } from '@/api/base/system';
// import { FitsFormItemProps } from '@/fits-components/Form/FormCrea';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance, VxeGridListeners } from 'vxe-table';
// import { FitsTable, useFitsTablePro, FitsTableProps } from '../../../../FitsAdminUI/es/fits-components'

// import { useFitsTablePro, FitsTableProps, FitsTable } from '@/fits-components/Table/FitsTable'

import { useFitsTablePro, FitsTableProps, FitsTable } from 'fits-admin-ui'
// import FitsTable from '@/fits-components/Table/FitsTable/FitsTable.vue'
// import { useFitsTablePro } from '@/components/FitsTablePro/FitsTable/FitsTableProHook'
// import { FitsTableProps } from '@/components/FitsTablePro/FitsTable/type'
import { ref } from 'vue'
import { FitsDialog } from '@/fits-components'
import addMenu from "./addMenu.vue"
import { ElMessage } from 'element-plus'

const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    // border: true,
    keepSource: true,
    showOverflow: false,
    id: 'toolbar_demo_1',
    rowConfig: {
        height: 52
    },
    storage: {
        enabled: true,
        key: 'SystemManageMenuList',
        dataBase: (user.userInfo as any).id,
    },
    formConfig: {
        // data: {
        //     keyword: '1',
        //     number: '2',
        // },
        items: [
            { field: 'keyword', title: '模糊搜索', itemRender: { name: 'ElInput', props: { placeholder: '请输入菜单关键字、权限标识、路径' } } },
        ]
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        // { field: 'Indexes', title: '序号', type: 'seq', width: 50 },
        { field: 'Title', title: '菜单标题', minWidth: 130, treeNode: true },
        { field: 'Icon', title: '图标', minWidth: 100 },
        { field: 'Type', title: '组件标识', minWidth: 100 },
        { field: 'ComponentPath', title: '组件路径', minWidth: 100 },
        { field: 'IsUrL', title: '外链', minWidth: 100, slots: { default: 'isUrL' } },
        { field: 'IsCache', title: '缓存', minWidth: 100, slots: { default: 'isCache' } },
        { field: 'State', title: '菜单状态', slots: { default: 'state' }, minWidth: 100 },
        { field: 'Sort', title: '排序', minWidth: 80 },
        { field: 'CreateTime', title: '创建日期', minWidth: 130 },
        { field: 'Operation', title: '操作', minWidth: 150, slots: { default: 'operate' }, fixed: 'right' }
        // { field: 'Operati on', title: '操作列', width: 200, fixed: 'right', contentRender: { name: 'TableOpeate' } }
    ],

    toolbarConfig: {
        buttons: [
            { code: 'myadd', name: '新增', status: 'primary', onClick: () => { alert(1) } },
            { code: 'mySave', name: '启用' },
            { code: 'mydisable', name: '禁用' },
            { code: 'myExport', name: '导出' },
            { code: 'mydelete', name: '批量删除' }
        ],
        tools: {
            enabled: true
        },
    },

    treeConfig: {
        transform: true,
        rowField: 'Id',
        parentField: 'PId',
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
                        requireData.value = ReturnData.TableList;
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
let requireData: any = ref("")
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
//表头工具栏事件
const gridEvents: VxeGridListeners = {
    async toolbarButtonClick({ code }) {
        //表格
        const $grid = xGrid.value.fitsTablePro
        //获取选中的数据
        let record = $grid.getCheckboxRecords()
        if (record.length || code == 'myadd') {
            switch (code) {
                case 'myadd': {
                    dialogData.operate.visible = true
                    dialogData.operate.key = 'add'
                    let obj = {
                        Title: '',
                        Icon: '',
                        Type: '',
                        Sort: '',
                        ComponentPath: "",
                        IsUrL: false,
                        IsCache: false,
                        State: false,
                        CreateTime: "",
                    }
                    dialogData.operate.data = obj
                    console.log("myadd")
                    break
                }
                case 'mySave': {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否启用所选菜单？"
                    console.log("mySave")
                    break
                }
                case 'mydisable': {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否禁用所选菜单？"
                    console.log("mydisable")
                    break
                }
                case 'myExport': {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否导出所选菜单？"
                    console.log("myExport")
                    break
                }
                case 'mydelete': {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否删除所选菜单？"
                    console.log("mydelete")
                    break
                }
            }
        }
        else {
            openMessage()
        }
    }
}
const openMessage = () => {
    ElMessage({
        message: '请选择至少一个角色！',
        type: 'warning',
    })
}
const dialogData = reactive({
    base: {
        dialogText: "",
        key: "",
        visible: false,
        props: {
            title: '',
            width: '30%'
        }
    },
    operate: {
        dialogText: "",
        key: "",
        visible: false,
        data: {},
        props: {
            title: '',
            width: '50%'
        }
    }
})
//关闭弹窗
const closeDialog = (key: string) => {
    switch (key) {
        case "operate":
            dialogData.operate.visible = false
            break;
        case "base":
            dialogData.base.visible = false
            break;
    }
}

onMounted(() => {

    nextTick(() => {

        // xGrid.value?.xGrid?.commitProxy('query')
    })
    setTimeout(() => {

        // gridOptions.id = 'test'
        // gridOptions.formConfig = {}
    }, 2000)
})

//点击弹窗确定按钮
const onSubmint = (key: string) => {
    let checkedData = xGrid.value.fitsTablePro.getCheckboxRecords(true)
    switch (key) {
        case 'Dictable':
            checkedData.forEach((item: any, key: number) => {
                item.IsEnabled = true
            })
            break;
        case 'Dictunable':
            checkedData.forEach((item: any, key: number) => {
                item.IsEnabled = false
            })
            break;
        case 'DictExport':
            console.log("导出")
            break;
        case 'DictDelete':
            console.log("删除")
            break;
    }
    closeDialog('base')
}
//弹窗数据返回
const dataChange = (val: any, key: string) => {
    if (dialogData.operate.key == 'edit') {
        console.log("编辑", val)
    }
    else if (dialogData.operate.key == 'add') {
        console.log("新增", val)
    }
}
//表格中的操作按钮

//表格编辑按钮
const FormOperation = (val: any, key: string) => {
    if (key == 'edit') {
        dialogData.operate.visible = true
        dialogData.operate.props.title = "编辑菜单"
        dialogData.operate.key = "editRole"
        dialogData.operate.data = val
    } else if (key == 'delete') {
        dialogData.base.visible = true
        dialogData.base.dialogText = "是否确定关联选中的用户？"
        dialogData.base.key = "relaRole"
    }
}
</script>
<style lang='scss' scoped>
.menu-manage {
    padding: 0 $basePadding;
    background-color: #fff;

    .FromButton {
        color: #007DFF;
        margin-right: 10px;
        cursor: pointer;
    }

    .delete {
        color: #FF4300;
        text-decoration: underline;
    }

    .underline {
        text-decoration: underline;
    }

    :deep(.Menu-baseDialog) {

        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding-top: 30px;
            padding-bottom: 20px;
        }
    }

    :deep(.onfooter) {
        .el-dialog__body {
            .dialog-body {
                .el-scrollbar {
                    .el-scrollbar__wrap {
                        .el-scrollbar__view {
                            padding: 0px !important;
                        }
                    }
                }
            }
        }
    }
}
</style>