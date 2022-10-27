<template>
    <fits-form-create :form="simpleForm" ref="FormRef" />
</template>

<script setup lang="ts">
import { FitsFormCreateModel, FitsFormCreate } from '@/fits-components';
import { isPassword } from '@/utils/is';

const FormRef: any = ref(null)

const simpleForm = reactive(
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
                title: "确认密码",
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
                labelPosition: 'right',
            },
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            }
        },
    })
)

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>