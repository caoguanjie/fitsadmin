<template>
    <el-button @click="openForm">
        打开表单
    </el-button>
    <form-type :option="dialogOpt" @submit="submitDialogForm" @cancel="dialogOpt.visible = false"
        class="dialogFormExample" ref="formtypeRef" />
</template>

<script setup lang="ts">
import { FitsFormCreateModel } from '@/components/Common/model'
import { isHomeNumber, isPhoneNumber, isShortNumber } from '@/utils/is';

const formtypeRef = ref()

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
                        field: "UserName",
                        title: "用户名称",
                        props: {
                            placeholder: "请输入用户名称",
                        },
                        effect: {
                            required: '请输入用户名称'
                        }
                    },
                    {
                        type: "input",
                        field: "UserAccount",
                        title: "用户账号",
                        props: {
                            placeholder: "请输入用户账号",
                        },
                        effect: {
                            required: '请输入用户账号'
                        }
                    },
                    {
                        type: "input",
                        field: "oldPwd",
                        title: "初始密码",
                        props: {
                            type: 'password',
                            placeholder: "请输入原始密码"
                        },
                        effect: {
                            required: '请输入原始密码'
                        }
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
            }),
        },
        {
            title: '组织关系',
            iconClass: 'fits-system',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: "datePicker",
                        field: "onJobDate",
                        title: "入职日期",
                        props: {
                            placeholder: "请选择入职日期"
                        },
                        effect: {
                            required: '请选择入职日期'
                        }
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
            }),
        }
    ],
    dialogProp: {
        title: '新增用户',
        width: '50%'
    },
    formType: 'dialog'
})

function openForm() {
    dialogOpt.forms.map(item => item.form.col = 2)
    dialogOpt.visible = true
}

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