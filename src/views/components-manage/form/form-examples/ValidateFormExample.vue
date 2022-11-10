<template>
    <fits-form-create :form="simpleForm" />
</template>

<script setup lang="ts">
import { FitsFormCreate } from '@/fits-components';
import { FitsFormCreateModel } from '@/fits-components/type'

const simpleForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                title: "姓名",
                field: "input",
                effect: {
                    required: true
                }
            },
            {
                type: "select",
                title: "性别",
                field: "select",
                options: [
                    {
                        value: "0",
                        label: "男",
                    },
                    {
                        value: "1",
                        label: "女",
                    },
                ],
                effect: {
                    required: true
                }
            },
            {
                type: "radio",
                title: "出行方式",
                field: "travelMode",
                options: [
                    {
                        value: "104",
                        label: "步行",
                    },
                    {
                        value: "105",
                        label: "地铁",
                    },
                ],
                validate: [{ required: true, message: '请选择你的出行方式', trigger: 'change' }]
            },
            {
                type: "DatePicker",
                title: "出生日期",
                field: "birthday",
                validate: [{ required: true, message: '请选择出生日期', trigger: 'change' }]
            },
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