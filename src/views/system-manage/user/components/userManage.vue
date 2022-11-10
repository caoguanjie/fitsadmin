<template>
    <fits-table ref="xGrid" :option="fitsTablePro" :grid-events="gridEvents">
        <template #operate="{ slotProps }">
            <span @click="editBtn(slotProps.row)">编辑</span>
            <span @click="removeBtn(slotProps.row)">删除</span>
            <el-popover trigger="hover" placement="bottom" popper-class="tag-popover">
                <template #reference>
                    <span>更多</span>
                </template>
                <div class="btn">
                    <el-button>分配权限</el-button>
                </div>
                <div class="btn">
                    <el-button>重置密码</el-button>
                </div>
            </el-popover>
        </template>
        <template #status="{ slotProps }">
            <el-switch v-model="slotProps.row.status" :active-value=0 :inactive-value=1
                style="--el-switch-on-color: #020202; --el-switch-off-color: #dcdfe6"></el-switch>
        </template>
    </fits-table>
    <fits-form-dialog :option="dialogOpt" @submit="submitDialogForm" @cancel="closeForm" class="dialogFormExample"
        ref="formtypeRef" />
    <fits-dialog :visible="visibleRelate" :dialogProp="dialogRelateProp" class="relate" :showFooter=false>
        <user-list @closeDialog="closeDialogRelate" />
    </fits-dialog>
    <fits-dialog :visible="dialogData.visible" :class="'Users-baseDialog'" :dialogProp="dialogData.props"
        @cancel="closeDialog" @submit="onSubmint(dialogData.key)">
        {{ dialogData.dialogText }}
    </fits-dialog>

</template>
<script lang="ts" setup>
import userList from './userList.vue'
import { getUserList } from '@/api/base/system';
import { useFitsTablePro, FitsTableProps, FitsTable } from 'fits-admin-ui'
import { FitsFormCreateModel } from '@/fits-components/Form/FormCreate/model'
import FitsTreeSelect from '@/fits-components/Form/Select/FitsTreeSelect.vue'
import { FitsTreeSelectModel } from '@/fits-components/Form/Select/select';
import { FitsDialog } from '@/fits-components/FeedBack/Dialog';
import { FitsFormDialog } from '@/fits-components/Form/Other'
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance, VXETable, VxeGridListeners } from 'vxe-table';
import XEUtils from 'xe-utils';
import { ElNotification } from 'element-plus'
import { isPhoneNumber } from '@/utils/is';
const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()
defineExpose({ xGrid })
const { setting } = useStore();
let colNum = setting.formType === 'dialog' ? 2 : 1
let formtypeRef = ref()
//标识对话框
let flag = ref(true)
//表格的配置项
const gridOptions: FitsTableProps = {
    keepSource: true,
    showOverflow: "tooltip",
    id: 'userManage',
    rowConfig: {
        height: 52,
        isCurrent: true,
    },
    storage: {
        enabled: true,
        key: 'SystemManageUserList',
        dataBase: (user.userInfo as any).id,
    },
    formConfig: {
        items: [
            { field: 'name', span: 3, title: '用户名', itemRender: { name: 'input', props: { placeholder: '请输入用户名' } } },
            { field: 'mobiTel', span: 3, title: '手机号码', itemRender: { name: 'input', props: { placeholder: '请输入手机号' } } },
            {
                field: 'status', span: 3, title: '用户状态', itemRender: {
                    name: 'ElSelect',
                    props: {
                        // multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '在职',
                        },
                        {
                            value: '3',
                            label: '离职',
                        },
                        {
                            value: '4',
                            label: '挂起',
                        },
                        {
                            value: '5',
                            label: '已关闭',
                        },
                    ]
                }
            },
            {
                field: 'tap', span: 3, title: '用户标签', itemRender: {
                    name: 'ElSelect',
                    props: {
                        // multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '项目私立',
                        }
                    ]
                }
            },
            {
                field: 'department', span: 3, title: '上级机构', itemRender: {
                    name: 'ElSelect',
                    props: {
                        // multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '检测机构',
                        },
                        {
                            value: '3',
                            label: '供应商',
                        },
                        {
                            value: '4',
                            label: '客户',
                        },
                        {
                            value: '5',
                            label: '运维商',
                        },
                    ]
                }
            },
        ]
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    // align:'center',
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', minWidth: 50 },
        { field: 'name', title: '用户名称', minWidth: 80 },
        { field: 'account', title: '用户账号', minWidth: 80 },
        { field: 'mobiTel', title: '手机号码', minWidth: 100 },
        { field: 'sex', title: '性别', minWidth: 50 },
        { field: 'department', title: '上级机构', minWidth: 80 },
        // {
        //     field: 'tap', title: '用户标签', minWidth: 80, slots: {
        //         'default': (params) => h(
        //             'div',
        //             {
        //                 style: 'overflow: hidden;  white-space: nowrap; width: 100%;background:#ECF5FF;border-radius:2px;border:1px solid #79BBFF;text-align:center'
        //             },
        //             [
        //                 h('span', { style: ' color: #007DFF; ' }, params.row.tap)
        //             ]
        //         )
        //     },
        // },
        { field: 'status', title: '用户状态', slots: { default: 'status' }, minWidth: 100 },
        { field: 'comeDate', title: '入职时间', minWidth: 100 },
        { field: 'Operation', title: '操作', minWidth: 160, slots: { default: 'operate' }, fixed: "right" }
    ],
    toolbarConfig: {
        buttons: [
            { code: 'AddUser', name: '新建用户', status: 'primary', onClick: () => { alert(1) } },
            { code: 'RelateUser', name: '关联角色' },
            { code: 'EnableUser', name: '启用' },
            { code: 'DisableUser', name: '禁用' },
            { code: 'DeleteUser', name: '批量删除' }
        ],
        tools: {
            enabled: true
        },
    },
    tooltipConfig: {
        contentMethod: ({ column, row }) => {
            const { field } = column
            if (field === 'department') {
                return row[field]
            }
        }
    },
    proxyConfig: {
        form: true, // 启用表单代理
        autoLoad: true,
        ajax: {
            query: ({ form }) => {
                return new Promise(resolve => {
                    // 整合分页参数
                    const pageParam = {
                        pageIndex: 10,
                        pageSize: 20
                    }
                    // formConfig?.data和proxyConfig不能同时存在，会报【参数 "grid.data" 与 "grid.proxy-config" 有冲突】这个错误信息，所以需要把data这个默认值赋值给form变量
                    // XEUtils.merge(form, gridOptions.formConfig?.data)
                    getUserList(form, pageParam).then((result: AxiosResponse) => {
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
const gridEvents: VxeGridListeners = {
    async toolbarButtonClick({ code }) {
        const $grid = xGrid.value.fitsTablePro
        let record = $grid.getCheckboxRecords()
        switch (code) {
            case 'AddUser': {
                dialogOpt.visible = true
                dialogOpt.dialogProp.title = '新增部门'
                break
            }
            case 'RelateUser': {
                visibleRelate.value = true
                break
            }
            case 'EnableUser': {
                if (record.length) {
                    dialogData.visible = true
                    dialogData.dialogText = "是否确定启用选中的用户?"
                    dialogData.key = 'EnableUser'
                }
                else {
                    ElNotification({
                        message: '未选中启用的相关用户',
                        type: 'error',
                    })
                }
                break
            }
            case 'DisableUser': {
                if (record.length) {
                    dialogData.visible = true
                    dialogData.dialogText = "是否确定禁用选中的用户?"
                    dialogData.key = "DisableUser"
                }
                else {
                    ElNotification({
                        message: '未选中禁用的相关用户',
                        type: 'error',
                    })

                }
                break
            }
            case 'DeleteUser': {
                if (record.length) {
                    dialogData.visible = true
                    dialogData.dialogText = '是否确定删除选中的用户?'
                    dialogData.key = "DeleteUser"
                }
                else {
                    ElNotification({
                        message: '未选中删除的相关用户',
                        type: 'error',
                    })
                }

                break
            }
        }
    }
}
//对话框的配置项
const dialogOpt = reactive({
    visible: false,
    forms: [
        {
            title: '用户信息',
            iconClass: 'user',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: "input",
                        field: "name",
                        title: "用户名称",
                        props: {
                            placeholder: "请输入",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入用户名称" }
                        ],
                    },
                    {
                        type: "input",
                        field: "account",
                        title: "用户账号",
                        props: {
                            placeholder: "请输入",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入用户账号" }
                        ],
                    },
                    {
                        type: "input",
                        field: "mobiTel",
                        title: "手机号码",
                        props: {
                            placeholder: "请输入"
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入手机号码" },
                            {
                                validator: (rule: any, val: any) => {
                                    return isPhoneNumber(val)
                                },
                                message: "请输入正确的手机号"
                            }
                        ],
                    },
                    {
                        type: "input",
                        field: "pwd",
                        title: "初始密码",
                        props: {
                            type: 'password',
                            placeholder: "请输入"
                        },
                        effect: {
                            required: '请输入原始密码'
                        }
                    },
                    {
                        type: "input",
                        field: "number",
                        title: "电话",
                        props: {
                            placeholder: "请输入"
                        },
                        // validate: [
                        //     {
                        //         validator: (rule: any, val: any) => {
                        //             return val ? isPhoneNumber(val) : true
                        //         },
                        //         message: "请输入正确的电话"
                        //     }
                        // ]
                    },
                    {
                        type: "datePicker",
                        field: "birth",
                        title: "生日",
                        props: {
                            placeholder: "请选择"
                        }
                    },
                    {
                        type: "input",
                        field: "email",
                        title: "邮件",
                        props: {
                            placeholder: "请输入"
                        },
                        // validate: [
                        //     {
                        //         validator: (rule: any, val: any) => {
                        //             return val ? isEmail(val) : true
                        //         },
                        //         message: "请输入正确的电子邮件"
                        //     }
                        // ],
                    },
                    {
                        type: "radio",
                        field: "sex",
                        title: "性别",
                        options: [
                            {
                                value: "男",
                                label: "男"
                            },
                            {
                                value: "女",
                                label: "女"
                            },
                        ]
                    },
                    {
                        type: "input",
                        field: "shortNum",
                        title: "短号",
                        props: {
                            placeholder: "请输入"
                        },
                        // validate: [
                        //     {
                        //         validator: (rule: any, val: any) => {
                        //             return val ? isShortNumber(val) : true
                        //         },
                        //         message: "请输入正确的短号"
                        //     }
                        // ],
                    },
                    {
                        type: "radio",
                        field: "status",
                        title: "状态",
                        options: [
                            {
                                value: 0,
                                label: "启用"
                            },
                            {
                                value: 1,
                                label: "禁用"
                            },
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
                col: colNum
            }),
        },
        {
            title: '组织关系',
            iconClass: 'fits-system',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: 'title',
                        field: "department",
                        title: "所属部门",
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
                                    defaultExpandAll: false,
                                    data: [
                                        {
                                            id: '1',
                                            label: '总经办',
                                            children: [
                                                {
                                                    id: '4',
                                                    label: '业务部',
                                                    children: [
                                                        {
                                                            id: '9',
                                                            label: '业务A部'
                                                        },
                                                        {
                                                            id: '11',
                                                            label: '业务B部',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            id: '21',
                                            label: '研发部',
                                            children: [
                                                {
                                                    id: '5',
                                                    label: '研发1部',
                                                },
                                                {
                                                    id: '6',
                                                    label: '研发2部',
                                                },
                                            ],
                                        },
                                        {
                                            id: '3',
                                            label: '财务部',
                                            children: [
                                                {
                                                    id: '7',
                                                    label: '财务1部',
                                                },
                                                {
                                                    id: '8',
                                                    label: '财务2部',
                                                },
                                            ],
                                        },
                                    ],
                                    checkStrictly: true
                                }
                            })
                        },
                        validate: [
                            { required: true, message: "请选择", trigger: 'change' }
                        ],
                    },
                    {
                        type: "datePicker",
                        field: "comeDate",
                        title: "入职日期",
                        props: {
                            placeholder: "请选择"
                        },
                        validate: [
                            { required: true, type: 'string', message: "请选择入职日期" }
                        ]
                    },
                    {
                        type: "input",
                        field: "office",
                        title: "办公室",
                        props: {
                            placeholder: "请输入"
                        },
                    },
                    {
                        type: "input",
                        field: "offiTel",
                        title: "办公号码",
                        props: {
                            placeholder: "请输入"
                        },
                        // validate: [
                        //     {
                        //         validator: (rule: any, val: any) => {
                        //             return val ? isHomeNumber(val) || isPhoneNumber(val) : true
                        //         },
                        //         message: "请输入正确的手机号或固话"
                        //     }
                        // ]
                    },
                    {
                        type: "datePicker",
                        field: "leaveDate",
                        title: "离职日期",
                        props: {
                            placeholder: "请选择"
                        }
                    },
                    {
                        type: "select",
                        field: "tap",
                        title: "用户标签",
                        props: {
                            filterable: true,
                            placeholder: "请选择",
                        },
                        options: [
                            {
                                value: "项目私立",
                                label: "项目私立"
                            },
                            {
                                value: "项目私立1",
                                label: "项目私立1"
                            },
                            {
                                value: "项目私立2",
                                label: "项目私立2"
                            }
                        ],
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
                col: colNum
            }),
        }
    ],
    dialogProp: {
        title: '新增用户',
        width: '60%'
    },
    formType: setting.formType
})
let rowResult = ref()
//表格编辑按钮事件
function editBtn(obj: object | any) {
    dialogOpt.dialogProp.title = '编辑用户'
    dialogOpt.visible = true
    flag.value = false
    nextTick(() => {
        formtypeRef.value.formRef.forEach((item: any) => {
            item.fApi.setValue(obj)
        });
    })
    rowResult.value = obj
}
//表格删除按钮事件
const removeBtn = async (obj: any) => {
    const $table = xGrid.value
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
        nextTick(() => {
            $table.fitsTablePro.commitProxy('query')
        })
    }
}
//新建用户和编辑对话框的提交按钮
const submitDialogForm = async (formValue: any) => {
    if (flag.value === true) {
        const $grid = xGrid.value
        $grid.fitsTablePro.insert(formValue)
        dialogOpt.visible = false
    }
    else {
        const $table = xGrid.value.fitsTablePro
        let arr = $table.reactData.tableData
        let i = arr.findIndex((item: any) => item.id === rowResult.value.id)
        arr.splice(i, 1, formValue)
        $table.loadData(arr)
        dialogOpt.visible = false
    }
    nextTick(() => {
        const $grid = xGrid.value
        $grid.fitsTablePro.commitProxy('query')
    })
}
//新建用户和编辑对话框的关闭按钮
function closeForm() {
    dialogOpt.visible = false
    flag.value = true
}
//控制对话框的显示与隐藏
let visibleRelate = ref(false)

const dialogRelateProp = reactive({
    title: '关联角色',
    width: '75%'
})
const dialogData = reactive({
    dialogText: '',
    key: "",
    visible: false,
    props: {
        title: '提示',
        width: "460px"
    }
})

const onSubmint = (key: string) => {
    const $grid = xGrid.value
    let data = xGrid.value.fitsTablePro.getCheckboxRecords(true)
    switch (key) {
        case 'EnableUser':
            data.forEach((item: any) => {
                item.status = 0
            })
            nextTick(() => {
                $grid.fitsTablePro.commitProxy('query')
            })
            break;
        case 'DisableUser':
            data.forEach((item: any) => {
                item.status = 1
            })
            nextTick(() => {
                $grid.fitsTablePro.commitProxy('query')
            })
            break
        case 'DeleteUser':
            $grid.fitsTablePro.remove(data)
            nextTick(() => {
                $grid.fitsTablePro.commitProxy('query')
            })
            break
    }
    closeDialog()

}
const closeDialog = () => {
    dialogData.visible = false
    xGrid.value.fitsTablePro.setAllCheckboxRow(false)
}

const closeDialogRelate = (a: any) => {
    visibleRelate.value = false
}
</script>
<style lang='scss' scoped>
span {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #0e84ff;
    cursor: pointer;
    // margin:5px 20px 5px 0;
    margin-right: 20px;

    text-decoration: underline;
}

span:nth-child(2) {
    color: #FF4300;
}

.vxe-grid :deep(.vxe-default-input) {
    border-radius: 2px;
}

.el-popper {
    padding: 0 !important;
}

.btn {
    padding: 0 !important;
    margin-right: 0px !important;
    width: 110px !important;

    :deep(.el-button) {
        border: none;
        font-size: 14px;
        width: 110px;
        height: 44px;
        border-radius: 0;
    }
}

.dialog:deep(.el-overlay)>div:first-child>.relate>.el-dialog__body>.dialog-body>.el-scrollbar>.el-scrollbar__wrap>.el-scrollbar__view {
    display: flex;
    justify-content: space-between;
    padding: 8px;

    .left {
        width: 212px;
    }

    .roleList {
        width: 241px;

        .el-input {
            --el-border-radius-base: 2px;
        }
    }


}

.dialog {
    :deep(.dialog-body) {
        .el-scrollbar {
            .el-scrollbar__wrap {
                :deep(.el-scrollbar__view) {
                    display: flex !important;
                    justify-content: space-between;

                }
            }

        }
    }
    :deep(.baseDepartment){
        border-radius: 2px;
    }
}


:deep(.Users-baseDialog) {
    .fits-dialog {
        border-radius: 2px;
    }

    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        padding-top: 30px;
        padding-bottom: 20px;
    }
}
</style>
<style lang="scss">
.el-popover.tag-popover {
    min-width: 110px;
    width: 110px !important;
    padding: 0;
    border-radius: 0px;
}
</style>