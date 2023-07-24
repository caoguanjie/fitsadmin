<template>
    <fits-form-create :form="inlineForm" />
</template>

<script setup lang="ts">
import { FitsFormCreate } from '@/fits-components';
import { FitsFormCreateModel } from '@/fits-components/type'

const inlineForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                title: "输入框",
                field: "input",
            },
            {
                type: "select",
                title: "下拉选择",
                field: "select",
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                    },
                ]
            },
            {
                type: "DatePicker",
                title: "日期选择",
                field: "DatePicker1",
            },
            {
                type: "input",
                title: "多行文本",
                field: "textarea",
                props: {
                    type: "textarea",
                    placeholder: "请输入商品名称",
                    rows: 5,
                    autosize: { minRows: 2, maxRows: 5 }
                }
            },
        ],
        option: {
            form: {
                labelPosition: "right",
                inline: true
            },
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            },
        },
        col: 2,
    })
)
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>