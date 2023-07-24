<template>
    <el-button @click="dialogOpt.visible = true">
        打开表单弹窗
    </el-button>
    <fits-form-dialog :option="dialogOpt" @submit="submitDialogForm" @cancel="dialogOpt.visible = false"
        class="dialogFormExample" ref="formtypeRef" />
</template>

<script setup lang="ts">
import useStore from '@/store';
import { isEmail, isHomeNumber, isPhoneNumber, isShortNumber } from '@/utils/is';
import { FitsFormDialog, FitsIconSelect, FitsTreeSelect } from '@/fits-components';
import { FitsFormCreateModel, FitsIconSelectModel, FitsTreeSelectModel } from '@/fits-components/type'


const { setting } = useStore();

const formtypeRef = ref()

let colNum = setting.formType === 'dialog' ? 2 : 1

const dialogOpt = reactive({
    visible: false,
    forms: [
        {
            title: '用户信息',
            iconClass: 'user',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: 'title',
                        field: "iconSelect",
                        title: "图标选择",
                        component: markRaw(FitsIconSelect),
                        props: {
                            options: new FitsIconSelectModel({
                                select: {
                                    class: "mySelect",
                                    placeholder: "请选择图标",
                                    multiple: true
                                },
                                input: {
                                    element: {
                                        placeholder: "图标搜索",
                                    },
                                },
                            })
                        },
                        validate: [
                            { required: true, message: "请选择图标", trigger: 'change' }
                        ],
                    },
                    {
                        type: "input",
                        field: "UserName",
                        title: "用户名称",
                        props: {
                            placeholder: "请输入用户名称",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入用户名称" }
                        ],
                    },
                    {
                        type: "input",
                        field: "UserAccount",
                        title: "用户账号",
                        props: {
                            placeholder: "请输入用户账号",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入用户账号" }
                        ],
                    },
                    {
                        type: "input",
                        field: "phone",
                        title: "手机号码",
                        props: {
                            placeholder: "请输入手机号码"
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
                        field: "oldPwd",
                        title: "初始密码",
                        props: {
                            type: 'password',
                            placeholder: "请输入原始密码"
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入原始密码" }
                        ],
                    },
                    {
                        type: "input",
                        field: "telephone",
                        title: "电话",
                        props: {
                            placeholder: "请输入电话"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isPhoneNumber(val) : true
                                },
                                message: "请输入正确的电话"
                            }
                        ]
                    },
                    {
                        type: "datePicker",
                        field: "birthday",
                        title: "生日",
                        props: {
                            placeholder: "请选择日期"
                        },
                    },
                    {
                        type: "input",
                        field: "email",
                        title: "电子邮件",
                        props: {
                            placeholder: "请输入电子邮箱"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isEmail(val) : true
                                },
                                message: "请输入正确的电子邮件"
                            }
                        ],
                    },
                    {
                        type: "radio",
                        field: "sex",
                        title: "性别",
                        options: [
                            {
                                value: "1",
                                label: "男"
                            },
                            {
                                value: "2",
                                label: "女"
                            },
                            {
                                label: "未知",
                                value: "0"
                            }
                        ]
                    },
                    {
                        type: "input",
                        field: "shortNum",
                        title: "短号",
                        props: {
                            placeholder: "请输入短号"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isShortNumber(val) : true
                                },
                                message: "请输入正确的短号"
                            }
                        ],
                    },
                    {
                        type: "radio",
                        field: "status",
                        title: "状态",
                        options: [
                            {
                                value: "1",
                                label: "启用"
                            },
                            {
                                value: "2",
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
                        field: "Department11",
                        title: "所属部门",
                        component: markRaw(FitsTreeSelect),
                        // value: '9',
                        props: {
                            options: new FitsTreeSelectModel({
                                select: {
                                    placeholder: "请选择组织机构",
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
                                }
                            })
                        },
                        validate: [
                            { required: true, message: "请选择", trigger: 'change' }
                        ],
                    },
                    {
                        type: "datePicker",
                        field: "onJobDate",
                        title: "入职日期",
                        props: {
                            placeholder: "请选择入职日期"
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
                            placeholder: "请输入办公室"
                        },
                    },
                    {
                        type: "input",
                        field: "officenumber",
                        title: "办公号码",
                        props: {
                            placeholder: "请输入办公号码"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isHomeNumber(val) || isPhoneNumber(val) : true
                                },
                                message: "请输入正确的手机号或固话"
                            }
                        ]
                    },
                    {
                        type: "datePicker",
                        field: "offJobDate",
                        title: "离职日期",
                        props: {
                            placeholder: "请选择离职日期"
                        }
                    },
                    {
                        type: "select",
                        field: "UserTag",
                        title: "用户标签",
                        props: {
                            filterable: true,
                            placeholder: "请选择用户标签",
                        },
                        options: [
                            {
                                value: "1",
                                label: "选项1"
                            },
                            {
                                value: "2",
                                label: "选项2"
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
        width: '50%'
    },
    formType: setting.formType
})

watch(() => setting.formType, (val: any) => {
    colNum = val === 'dialog' ? 2 : 1
    dialogOpt.formType = val
    dialogOpt.forms.map((item: any) => item.form.col = colNum)
})

function submitDialogForm(formValue: any) {
    alert(JSON.stringify(formValue));
}
</script>

<style lang="scss">
.dialogFormExample {
    .el-dialog {
        min-width: 780px;
    }
}
</style>

<style lang="scss" scoped>

</style>