<template>
    <fits-form-create :form="simpleForm" />
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

import { FitsCheckboxAll, FitsFormTitle, FitsFormCreateModel, FitsCheckboxAllModel, FitsFormCreate } from '@/fits-components';

const simpleForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: 'title',
                component: markRaw(FitsFormTitle),
                field: "divider",
                value: '输入控件',
                style: "background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"
            },
            {
                type: "input",
                title: "输入框",
                field: "input",
                props: {
                    prefixIcon: markRaw(Search)
                },
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
            {
                type: 'title',
                component: markRaw(FitsFormTitle),
                field: "divider",
                value: '选择控件',
                style: "background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"
            },
            {
                type: "select",
                title: "下拉选择",
                field: "select1",
                props: {
                    clearable: true
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ],
            },
            {
                type: "select",
                title: "筛选、创建条目",
                field: "select2",
                props: {
                    filterable: true,
                    allowCreate: true,
                    multiple: true
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: false
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    }
                ]
            },
            {
                type: "radio",
                title: "单选",
                field: "radio1",
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                    {
                        value: "107",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "108",
                        label: "农产鸡蛋",
                        disabled: false
                    }
                ]
            },
            {
                type: "radio",
                title: "单选按钮组",
                field: "radio2",
                props: {
                    type: 'button'
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: false
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
            {
                type: 'title',
                component: markRaw(FitsFormTitle),
                field: "divider",
                value: '开关控件',
                style: "background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"
            },
            {
                type: "switch",
                title: "开关",
                field: "switch1",
                col: {
                    span: 4
                }
            },
            {
                type: "switch",
                title: "开关",
                field: "switch2",
                style: {
                    '--el-switch-on-color': '#000',
                    '-el-switch-on-color': 'pink'
                },
                props: {
                    size: "large",
                    inlinePrompt: true,
                    activeText: '开',
                    inactiveText: '关'
                },
                col: {
                    span: 4
                },
                on: {
                    change: (val: any) => {
                        console.log(val)
                    }
                }
            },
            {
                type: 'title',
                component: markRaw(FitsFormTitle),
                field: "divider",
                value: '日期、时间控件',
                style: "background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"
            },
            {
                type: "DatePicker",
                title: "日期选择",
                field: "DatePicker1",
            },
            {
                type: "DatePicker",
                title: "带快捷选项",
                field: "DatePicker2",
                props: {
                    shortcuts: [
                        {
                            text: '今日',
                            value: moment().format()
                        },
                        {
                            text: '昨日',
                            value: () => {
                                return moment().subtract(1, 'day').format()
                            },
                        },
                        {
                            text: '一周前',
                            value: () => {
                                return moment().subtract(7, 'day').format()
                            },
                        },
                    ]
                },
            },
            {
                type: "DatePicker",
                title: "日期范围",
                field: "DatePicker3",
                props: {
                    type: "daterange",
                    rangeSeparator: "至",
                    startPlaceholder: "开始日期",
                    endPlaceholder: "结束日期",
                    unlinkPanels: true
                },
            },
            {
                type: "DatePicker",
                title: "月范围",
                field: "DatePicker4",
                props: {
                    type: "monthrange",
                    rangeSeparator: "至",
                    startPlaceholder: "开始月份",
                    endPlaceholder: "结束月份",
                    unlinkPanels: true
                },
            },
            {
                type: "DatePicker",
                title: "日期时间选择",
                field: "DatePicker4",
                props: {
                    type: "datetimerange",
                },
            },
            {
                type: "TimePicker",
                field: "time",
                title: "时间",
            },
            {
                type: 'title',
                component: markRaw(FitsFormTitle),
                field: "divider",
                value: '复选框控件',
                style: "background:#F2F2F2;color:#303133;line-height:32px;padding-left:16px;"
            },
            {
                type: "checkbox",
                title: "多选",
                field: "checkbox1",
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
            {
                type: "checkboxAll",
                component: markRaw(FitsCheckboxAll),
                title: "全选组件",
                field: "checkbox2",
                props: {
                    options: new FitsCheckboxAllModel({
                        option: [
                            {
                                label: "生态蔬菜1",
                            },
                            {
                                label: "新鲜水果1",
                            },
                            {
                                label: "蛋糕甜点1",
                            }
                        ],
                    })
                },
            },
        ],
        option: {
            form: {
                labelPosition: 'right',
                labelWidth: '120px',
            },
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            },
        },
    })
)

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>