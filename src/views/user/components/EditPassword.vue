<template>
    <div class="edit-password">
        <div class="title">修改密码</div>
        <fits-form-create :form="form" ref="FormRef" />
    </div>
</template>

<script setup lang="ts">
import { postUserDetail } from '@/api/base/user';
import { FitsFormCreateModel } from '@/components/Common/model';
import { ResultEnum } from '@/utils/http/types';
import { isPassword } from '@/utils/is';
import { reactive, ref } from 'vue';
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue';
import { ElMessage } from 'element-plus';

const FormRef: any = ref(null)

const form = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                field: "oldPwd",
                title: "原密码",
                props: {
                    placeholder: "请输入原密码",
                    type: "password",
                    showPassword: true
                },
                validate: [
                    { required: true, type: 'string', message: "请输入原密码" },
                ],
            },
            {
                type: "input",
                field: "newPwd",
                title: "新密码",
                props: {
                    placeholder: "请输入新密码",
                    type: "password",
                    maxlength: 20,
                    showPassword: true
                },
                validate: [
                    { required: true, type: 'string', message: "请输入新密码" },
                    {
                        validator: (rule: any, val: any, d: any) => {
                            return isPassword(val)
                        },
                        message: "新密码长度10位以上，包含数字、字母、符号"
                    }
                ],
            },
            {
                type: "input",
                field: "againPwd",
                title: "确认新密码",
                props: {
                    placeholder: "再次确认新密码",
                    type: "password",
                    showPassword: true
                },
                validate: [
                    { required: true, type: 'string', message: "请再次输入新密码" },
                    {
                        validator: (rule: any, val: any, d: any) => {
                            return val === FormRef.value.fApi.getValue('newPwd')
                        },
                        message: "密码不一致"
                    }
                ]
            }
        ],
        option: {
            form: {
                labelPosition: "top",
            },
            submitBtn: {
                innerText: "保存内容",
            },
            resetBtn: {
                innerText: "重置"
            },
            onSubmit: (formData: any) => {
                saveUserPassword()
            },
        }
    })
)

async function saveUserPassword() {
    const formValue = FormRef.value.fApi.formData()
    const { Message, RetCode }: any = await postUserDetail(formValue);
    if (RetCode === ResultEnum.SUCCESS) {
        ElMessage.success(Message)
    }
}
</script>

<style lang="scss">
.edit-password {
    padding: 40px;
    background: #fff;
    margin: 16px;

    .FitsFormCreate {
        width: 35%;
        min-width: 480px;
        margin-top: 32px;
    }

    .el-input {
        height: 32px;
    }

    .title {
        padding: 0px;
        color: #333;
        font-weight: 700;
        font-size: 18px;
    }

    .el-col-24:last-child {
        margin-top: 28px;
    }

    .el-form-item {
        min-width: 480px !important;
    }

    @media screen and (max-width: 720px) {
        .el-form-item {
            min-width: 250px !important;
            width: 100%;
        }

        .FormCreate {
            width: 90% !important;
        }
    }
}
</style>

<style lang="scss" scoped>
.edit-password {
    .FormCreate {
        margin-top: 32px;
        width: 30%;
    }
}
</style>