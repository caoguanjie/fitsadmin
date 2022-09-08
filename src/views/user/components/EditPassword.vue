<template>
    <div class="edit-password">
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

const FormRef: any = ref(null)

const form = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "div",
                children: ["修改密码"],
                class: "title",
            },
            {
                type: "input",
                field: "oldPwd",
                title: "原密码",
                value: '123456',
                props: {
                    placeholder: "请输入原密码",
                    type: "password",
                    showPassword: true
                },
                $required: "请输入原密码"
            },
            {
                type: "input",
                field: "newPwd",
                title: "新密码",
                value: '123456wzl!',
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
                value: '123456wzl!',
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
                className: "saveBtn el-button el-button--medium",
                innerText: "保存内容",
            },
            resetBtn: {
                show: true,
                className: "el-button el-button--medium",
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

    .el-input {
        width: 480px;
        height: 32px;
    }

    .title {
        padding: 0px;
        color: #333;
        font-weight: 700;
        font-size: 18px;
    }

    .el-col-24 {
        margin-top: 28px;
    }

    .el-button+.el-button {
        margin-left: 16px;
    }

    button {
        border-radius: 2px;
        font-size: 12px;
        padding: 0 20px;
    }

    .saveBtn {
        padding: 0 24px;
    }
}
</style>

<style lang="scss" scoped>
</style>