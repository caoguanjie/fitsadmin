<template>
    <div class="department-manage">
        <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents">
            <template #operate="{ slotProps }">
                <span @click="editBtn(slotProps.row)">编辑</span>
                <span @click="removeBtn(slotProps.row)">删除</span>
            </template>
            <template #status="{ slotProps }">
                <el-switch v-model="slotProps.row.status"
                    style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6"></el-switch>
            </template>
        </fits-table>
        <!-- <fits-dialog ref="formtypeRef" :visible="dialogData.addDepartment.visible"
            :dialogProp="dialogData.addDepartment.props" @submit="submitDepartment"
            @cancel="closeDialog('addDepartment')" class="dialogFormExample">
            <departmentDialog @addChange="addChange" :departmentInfo="dialogData.addDepartment.info" ref="departmentDialogInstance"/>
        </fits-dialog> -->
        <fits-dialog ref="formtypeRef" :visible="dialogData.addDepartment.visible"
            :dialogProp="dialogData.addDepartment.props"
            @cancel="closeDialog('addDepartment')" class="dialogFormExample" :showFooter="false">
            <departmentDialog @addChange="addChange" :departmentInfo="dialogData.addDepartment.info" ref="departmentDialogInstance"/>
        </fits-dialog>
        <fits-dialog class="baseDepartment" :visible="dialogData.baseDepartment.visible"
            :class="'Department-baseDialog'" :dialogProp="dialogData.baseDepartment.props"
            @submit="onSubmit(dialogData.baseDepartment.key)" @cancel="closeDialog('baseDepartment')">
            {{ dialogData.baseDepartment.dialogText }}
        </fits-dialog>
    </div>
</template>

<script lang='ts' setup>
import XEUtils from 'xe-utils';
import { getDepartmentTableList } from '@/api/base/system';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance, VxeGridListeners, VXETable } from 'vxe-table';
import { useFitsTablePro, FitsTableProps, FitsTable } from 'fits-admin-ui'
import { ref } from 'vue'
import { FitsDialog } from '@/fits-components/FeedBack/Dialog';
import { ElNotification } from 'element-plus'
import departmentDialog from './departmentDialog.vue'
const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()
//表格的配置项
const gridOptions: FitsTableProps = {
    keepSource: true,
    id: 'department-part',
    rowConfig: {
        height: 52,
        isHover: true,
        useKey: true,
    },
    storage: {
        enabled: true,
        key: 'SystemManageDepartmentList',
        dataBase: (user.userInfo as any).id,
    },
    formConfig: {
        items: [
            { field: 'name', span: 3, title: '部门名称', itemRender: { name: '$input', props: { placeholder: '请输入部门名称' } } },
            { field: 'code', span: 3, title: '部门编码', itemRender: { name: '$input', props: { placeholder: '请输入部门编码' } } },
            { field: 'status', span: 3, title: '部门状态', itemRender: { name: '$select', options: [{ value: '0', label: '启用' }, { value: '1', label: '停用' }], props: { placeholder: '请选择状态' } } },
        ]
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        { field: 'Title', title: '部门名称', minWidth: 210, treeNode: true },
        { field: 'code', title: '部门编码', minWidth: 150 },
        { field: 'Sort', title: '排序', minWidth: 120 },
        {
            field: 'remark', title: '备注', minWidth: 150,
            slots: {
                'default': (params) => h(
                    'div',
                    {
                        style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;'
                    },
                    [
                        h('span', params.row.remark)
                    ]
                )
            },
        },
        { field: 'status', title: '部门状态', minWidth: 200, slots: { default: 'status' } },
        { field: 'CreateTime', title: '创建时间', minWidth: 140 },
        { field: 'Operation', title: '操作', minWidth: 150, slots: { default: 'operate' }, fixed: 'right' }
    ],
    showOverflow: "tooltip",
    toolbarConfig: {
        buttons: [
            { code: 'add', name: '新增部门', status: 'primary' },
            { code: 'enable', name: '启用' },
            { code: 'disable', name: '禁用' },
            { code: 'export', name: '导出' },
            { code: 'Depdelete', name: '批量删除' }
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
                    getDepartmentTableList(form, pageParam).then((result: AxiosResponse) => {
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
    tooltipConfig: {
        contentMethod: ({ type, column, row, items }) => {
            const { field } = column
            if (field === 'remark') {
                return row[field]
            }
        }
    },
}
//表格的配置事件
const gridEvents: VxeGridListeners = {
    async toolbarButtonClick({ code }) {
        const $grid = xGrid.value.fitsTablePro
        //选中的数据
        let record = $grid.getCheckboxRecords()
        switch (code) {
            case 'add': {
                // dialogOpt.visible = true
                // dialogOpt.dialogProp.title = "新增部门"
                dialogData.addDepartment.visible = true
                dialogData.addDepartment.props.title = '新增部门'
                break
            }
            case 'enable': {
                if (record.length) {
                    dialogData.baseDepartment.visible = true
                    dialogData.baseDepartment.dialogText = '是否确定启用选中的部门?'
                    dialogData.baseDepartment.key = 'Departmentenable'
                }
                else {
                    ElNotification({
                        message: '未选中启动的相关部门',
                        type: 'error',
                    })
                }

                break
            }
            case 'disable': {
                if (record.length) {
                    dialogData.baseDepartment.visible = true
                    dialogData.baseDepartment.dialogText = "是否确定禁用选中的部门?"
                    dialogData.baseDepartment.key = 'Departmentdisable'
                }
                else {
                    ElNotification({
                        message: '未选中禁用的相关部门',
                        type: 'error',
                    })
                }
                break
            }
            case 'export': {
                break
            }
            case 'Depdelete': {
                if (record.length) {
                    dialogData.baseDepartment.visible = true
                    dialogData.baseDepartment.dialogText = '是否确定删除选中的部门?'
                    dialogData.baseDepartment.key = 'Departmentremove'
                }
                else {
                    ElNotification({
                        message: '未选中删除的相关部门',
                        type: 'error',
                    })
                }

                break
            }
        }
    }
}
//对话框的配置项
let formtypeRef = ref()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

function editBtn(obj: any) {
    dialogData.addDepartment.visible = true
    dialogData.addDepartment.props.title = '修改部门'
    dialogData.addDepartment.info = obj
}
//表格的删除事件
const removeBtn = async (obj: any) => {
    const $table = xGrid.value
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
        $table.fitsTablePro.remove(obj)
        nextTick(() => {
            $table.fitsTablePro.commitProxy('query')
        })
    }
}
//对话框的提交事件
const onSubmit = (key: string) => {
    const $grid = xGrid.value
    let data = xGrid.value.fitsTablePro.getCheckboxRecords(true)
    switch (key) {
        case 'Departmentenable':
            data.forEach((item: any, key: number) => {
                item.status = true
            })
            nextTick(() => {
                $grid.fitsTablePro.commitProxy('query')
            })
            break;
        case 'Departmentdisable':

            data.forEach((item: any, key: number) => {
                item.status = false
            })
            nextTick(() => {
                $grid.fitsTablePro.commitProxy('query')
            })
            break
        case 'Departmentremove':
            $grid.fitsTablePro.remove(data)
            nextTick(() => {
                $grid.fitsTablePro.commitProxy('query')
            })
            break
    }
    closeDialog('baseDepartment')
}
let resultData = ref()
const addChange = (val: any) => {
    resultData.value = val
}

let departmentDialogInstance = ref()

// const submitDepartment = () => {
//     console.log(123)
//     console.log(departmentDialogInstance.value,'111')
//     // let target = xGrid.value.fitsTablePro.reactData.tableData
//     // if (resultData.value) {
//     //     let i = target.findIndex((item: any) => item.id === resultData.value.Id)
//     //     xGrid.value.fitsTablePro.reactData.tableData.splice(i, 0, resultData.value)
//     // }
//     // nextTick(() => {
//     //     xGrid.value.fitsTablePro.commitProxy('query')
//     // })
//     // dialogData.addDepartment.visible = false
//     // dialogData.addDepartment.info = {}
// }
onMounted(() => {

    nextTick(() => {

        // xGrid.value?.xGrid?.commitProxy('query')
    })
    setTimeout(() => {

        // gridOptions.id = 'test'
        // gridOptions.formConfig = {}
    }, 2000)
})

const dialogData = reactive({
    addDepartment: {
        visible: false,
        props: {
            title: '新增部门',
            width: '460px'
        },
        info: {}
    },
    baseDepartment: {
        dialogText: '',
        key: '',
        visible: false,
        props: {
            title: "提示",
            width: '460px'
        }
    }
})
//关闭弹窗
const closeDialog = (key: string) => {
    switch (key) {
        case 'addDepartment':
            dialogData.addDepartment.visible = false
            dialogData.addDepartment.info = {}
            break
        case 'baseDepartment':
            dialogData.baseDepartment.visible = false
            xGrid.value.fitsTablePro.setAllCheckboxRow(false)
            break
    }
}
</script>
<style lang='scss' scoped>
.department-manage {
    padding: 0 $basePadding;
    background-color: #fff;

    span {
        width: 24px;
        height: 16px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #0e84ff;
        line-height: 16px;
        cursor: pointer;
        margin-right: 20px;
        text-decoration: underline;
    }

    span:nth-child(2) {
        color: #FF4300;
    }

    .dialog {
        :deep(.el-scrollbar__view) {
            padding: 24px 80px;
        }
    }

    :deep(.Department-baseDialog) {

        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding-top: 30px;
            padding-bottom: 20px;
        }
    }

}
</style>