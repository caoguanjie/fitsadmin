<template>
    <fits-form-create :form="slotForm" />
</template>

<script setup lang="ts">
import { FitsFormCreate } from '@/fits-components';
import { FitsFormCreateModel } from '@/fits-components/type'
import { Search } from '@element-plus/icons-vue'

const slotForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: 'button',
                field: 'slotButton',
                title: '使用按钮的插槽',
                props: {
                    type: 'primary'
                },
                children: [
                    {
                        type: 'div',
                        slot: 'icon',
                        component: markRaw(Search),
                    },
                    '按钮名称'
                ]
            },
            {
                type: 'input',
                field: 'slotInput',
                title: '使用输入框的插槽',
                children: [
                    {
                        type: 'div',
                        component: markRaw(Search),
                        class: 'el-icon',
                        slot: 'prefix',
                    },
                    {
                        type: 'span',
                        slot: 'suffix',
                        // 显示为文本
                        children: ['suffix']
                    },
                ]
            },
            {
                type: 'select',
                field: 'slotSelect',
                title: '使用下拉框的插槽',
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                    },
                ],
                // select的插槽
                children: [
                    {
                        type: 'span',
                        children: ['我是select的默认插槽']
                    },
                    // 无效，未解决
                    {
                        type: 'svg',
                        slot: 'empty',
                        component: markRaw(Search),
                    },
                    // 无效，未解决
                    {
                        type: 'svg',
                        slot: 'prefix',
                        component: markRaw(Search),
                    }
                ]
            },
        ],
        option: {
            submitBtn: false,
            resetBtn: false
        },
    })
)
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>