<template>
    <div class="department-manage">
        <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents">
            <template #operate="{ slotProps }">
                <span @click="editBtn(slotProps.row)">编辑</span>
                <span @click="removeBtn(slotProps.row)">删除</span>
            </template>
            <template #status="{ slotProps }">
                <el-switch v-model="slotProps.row.status"
                    style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
            </template>
        </fits-table>
        <fits-form-dialog :option="dialogOpt" @submit="submitDialogForm" @cancel="dialogOpt.visible = false"
            class="dialogFormExample" ref="formtypeRef" />
        <fits-dialog class="baseDepartment" :visible="dialogData.baseDepartment.visible"
            :class="'Department-baseDialog'" :dialogProp="dialogData.baseDepartment.props"
            @submit="onSubmit(dialogData.baseDepartment.key)" @cancel="closeDialog('baseDepartment')">
            {{ dialogData.baseDepartment.dialogText }}
        </fits-dialog>
    </div>
</template>
<script lang='ts' setup name="Department">
import XEUtils from 'xe-utils';
import { getDepartmentTableList } from '@/api/base/system';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance, VxeGridListeners, VXETable } from 'vxe-table';
import { useFitsTablePro, FitsTableProps, FitsTable } from 'fits-admin-ui'
import { ref } from 'vue'
import { FitsDialog } from '@/fits-components/FeedBack/Dialog';
import { ElNotification } from 'element-plus'
import { FitsFormCreateModel, FitsFormDialog } from '@/fits-components';
import FitsTreeSelect from '@/fits-components/Form/Select/FitsTreeSelect.vue'
import { FitsTreeSelectModel } from '@/fits-components/Form/Select/select';
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
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 60 },
        { field: 'Title', title: '部门名称', minWidth: 210, treeNode: true, },
        { field: 'code', title: '部门编码', minWidth: 150, align: 'center' },
        { field: 'Sort', title: '排序', minWidth: 150, align: 'center' },
        {
            field: 'remark', title: '备注', minWidth: 120,
        },
        { field: 'status', title: '部门状态', minWidth: 120, slots: { default: 'status' }, align: 'center' },
        { field: 'CreateTime', title: '创建时间', minWidth: 180, align: 'center' },
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
        rowField: 'id',
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
        contentMethod: ({ column, row }) => {
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
                dialogOpt.visible = true
                dialogOpt.dialogProp.title = '新增部门'
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

//表格的删除事件
const removeBtn = async (obj: any) => {
    // const $table = xGrid.value
    // const type = await VXETable.modal.confirm('您确定要删除该数据?')
    // if (type === 'confirm') {
    //     $table.fitsTablePro.remove(obj)
    //     nextTick(() => {
    //         $table.fitsTablePro.commitProxy('query')
    //     })
    // }
    dialogData.baseDepartment.visible = true
    dialogData.baseDepartment.dialogText = '是否确定删除选中的部门?'
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
            width: '40%'
        },
        info: {}
    },
    baseDepartment: {
        dialogText: '',
        key: '',
        visible: false,
        props: {
            title: "提示",
            width: '30%'
        }
    }
})
//关闭弹窗
const closeDialog = (key: string) => {
    switch (key) {
        case 'addDepartment':
            dialogData.addDepartment.visible = false
            // dialogData.addDepartment.info = {}
            break
        case 'baseDepartment':
            dialogData.baseDepartment.visible = false
            xGrid.value.fitsTablePro.setAllCheckboxRow(false)
            break
    }
}
let rowResult = ref()
//对话框配置项目
const dialogOpt = reactive({
    visible: false,
    forms: [
        {
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: 'title',
                        field: "PId",
                        title: "上级部门",
                        component: markRaw(FitsTreeSelect),
                        props: {
                            options: new FitsTreeSelectModel({
                                select: {
                                    placeholder: "请选择",
                                    clearable: true
                                },
                                input: {
                                    placeholder: "部门搜索",
                                },
                                tree: {
                                    nodeKey: "id",
                                    data: [
                                        {
                                            id: '150000198607018427',
                                            label: '广州华侨医院',
                                            children: [
                                                {
                                                    id: '15000019860701848',
                                                    PId: '150000198607018427',
                                                    label: '医院医技',
                                                    children: [
                                                        {
                                                            id: '15000019860701842',
                                                            PId: '15000019860701848',
                                                            label: '医院医技01'
                                                        },
                                                        {
                                                            id: '15000019860701846',
                                                            PId: '15000019860701848',
                                                            label: '医院医技02',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            id: '150000198607018400',
                                            label: '广州第一人民医院',
                                            children: [
                                                {
                                                    id: '16000019860701848',
                                                    PId: '150000198607018400',
                                                    label: '医院医技',
                                                    children: [
                                                        {
                                                            id: '15100019860701842',
                                                            PId: '16000019860701848',
                                                            label: '医院医技01'
                                                        },
                                                        {
                                                            id: '15120019860701842',
                                                            PId: '16000019860701848',
                                                            label: '医院医技02',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            id: '150100198607018400',
                                            label: '广州南方医科附属第三医院',
                                            children: [
                                                {
                                                    id: '16000019860701748',
                                                    PId: '150100198607018400',
                                                    label: '医院医技',
                                                    children: [
                                                        {
                                                            id: '15100019860721842',
                                                            PId: '16000019860701748',
                                                            label: '医院医技01'
                                                        },
                                                        {
                                                            id: '15100019860751842',
                                                            PId: '16000019860701748',
                                                            label: '医院医技02',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                    checkStrictly: true
                                },
                            })
                        },
                        validate: [
                            { required: true, message: "请选择", trigger: 'change' }
                        ],
                    },
                    {
                        type: "input",
                        field: "Title",
                        title: "部门名称",
                        props: {
                            placeholder: "请输入",
                        },
                        effect: {
                            required: '请输入部门名称'
                        }
                    },
                    {
                        type: "input",
                        field: "code",
                        title: "部门编号",
                        props: {
                            placeholder: "请输入"
                        },
                        effect: {
                            required: '请输入部门编号'
                        }
                    },
                    {
                        type: "input",
                        field: "remark",
                        title: "部门描述",
                        props: {
                            placeholder: "请输入"
                        },
                    },
                    {
                        type: "input",
                        field: "Sort",
                        title: "排序",
                        props: {
                            placeholder: "请输入"
                        },
                    },
                    {
                        type: "radio",
                        field: "status",
                        title: "状态",
                        options: [
                            {
                                value: true,
                                label: "启用"
                            },
                            {
                                value: false,
                                label: "禁用"
                            }
                        ]
                    },
                ],
                option: {
                    form: {
                        labelPosition: 'right',
                        inline: true,
                    },
                    submitBtn: false,
                    resetBtn: false
                },
                col: 1
            }),
        },
        // {
        //     title: '组织关系',
        //     iconClass: 'fits-system',
        //     form: new FitsFormCreateModel({
        //         rule: [
        //             {
        //                 type: "input",
        //                 field: "officenumber",
        //                 title: "办公号码",
        //                 props: {
        //                     placeholder: "请输入办公号码"
        //                 },
        //                 validate: [
        //                     {
        //                         validator: (rule: any, val: any) => {
        //                             return val ? isHomeNumber(val) || isPhoneNumber(val) : true
        //                         },
        //                         message: "请输入正确的手机号或固话"
        //                     }
        //                 ]
        //             },
        //             {
        //                 type: "datePicker",
        //                 field: "offJobDate",
        //                 title: "离职日期",
        //                 props: {
        //                     placeholder: "请选择离职日期"
        //                 }
        //             },
        //             {
        //                 type: "select",
        //                 field: "UserTag",
        //                 title: "用户标签",
        //                 props: {
        //                     filterable: true,
        //                     placeholder: "请选择用户标签",
        //                 },
        //                 options: [
        //                     {
        //                         value: "1",
        //                         label: "选项1"
        //                     },
        //                     {
        //                         value: "2",
        //                         label: "选项2"
        //                     }
        //                 ],
        //             },
        //         ],
        //         option: {
        //             form: {
        //                 labelPosition: 'right',
        //                 inline: true,
        //             },
        //             submitBtn: false,
        //             resetBtn: false
        //         },
        //     }),
        // }
    ],
    dialogProp: {
        title: '',
        width: '35%'
    },
    formType: 'dialog'
})
//表格的编辑按钮
function editBtn(obj: any) {
    rowResult.value = obj
    dialogOpt.visible = true
    dialogOpt.dialogProp.title = '修改部门'
    if (obj.PId === "null") {
        obj.PId = obj.id
    }
    nextTick(() => {
        formtypeRef.value.formRef.forEach((item: any) => {
            item.fApi.setValue(obj)
        })
    })
}
//对话框的提交按钮
function submitDialogForm(formValue: any) {
    if (dialogOpt.dialogProp.title = "新增部门") {
        dialogOpt.visible = false
        return
    }
    if (dialogOpt.dialogProp.title = "修改部门") {
        const arr = xGrid.value.fitsTablePro.reactData.tableData
        let obj = arr.find((item: any) => {
            return item.id == rowResult.value.id
        })
        Object.assign(obj, formValue)
        xGrid.value.fitsTablePro.commitProxy('query')
        dialogOpt.visible = false
    }
}
</script>
<style lang='scss' scoped>
.department-manage {
    padding: 0 $basePadding;
    background-color: #fff;
    user-select: none;

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

