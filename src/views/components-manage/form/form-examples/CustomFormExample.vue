<template>
    <fits-form-create :form="customForm" />
</template>

<script setup lang="ts">
import { FitsFormCreateModel, FitsCheckboxAllModel, FitsIconSelectModel, FitsTreeSelectModel, FitsTreeSelect, FitsIconSelect, FitsCheckboxAll, FitsFormCreate } from '@/fits-components';

const data = [
    {
        id: '1',
        label: 'Level 1',
        children: [
            {
                id: '4',
                label: 'Level 1-1',
            },
        ],
    },
    {
        id: '21',
        label: 'Level 2',
        children: [
            {
                id: '5',
                label: 'Level 2-1',
            },
        ],
    },
    {
        id: '3',
        label: 'Level 3',
    },
]

const customForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: 'title',
                component: markRaw(FitsTreeSelect),
                field: "treeSearch",
                title: "下拉选择树(单选)",
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
                            data
                        }
                    })
                },
                effect: {
                    required: true
                }
            },
            {
                field: "treeSearchMultiple",
                title: "下拉选择树(多选)",
                type: 'title',
                component: markRaw(FitsTreeSelect),
                props: {
                    options: new FitsTreeSelectModel({
                        select: {
                            placeholder: "请选择组织机构",
                            multiple: true,
                            clearable: true,
                        },
                        input: {
                            placeholder: "部门搜索",
                        },
                        tree: {
                            showCheckbox: true,
                            nodeKey: "id",
                            defaultExpandAll: false,
                            data
                        }
                    })
                },
                effect: {
                    required: true
                }
            },
            {
                field: "iconSelect",
                title: "图标选择(单选)",
                type: 'title',
                component: markRaw(FitsIconSelect),
                // value: 'edit',
                props: {
                    options: new FitsIconSelectModel({
                        select: {
                            placeholder: "请选择图标",
                            clearable: true
                        },
                        input: {
                            placeholder: "图标搜索",
                        },
                    })
                },
                validate: [
                    { required: true, message: "请选择图标", trigger: 'change' }
                ],
            },
            {
                field: "iconSelectMultiple",
                title: "图标选择(多选)",
                type: 'title',
                component: markRaw(FitsIconSelect),
                value: ['edit', 'client'],
                props: {
                    options: new FitsIconSelectModel({
                        select: {
                            placeholder: "请选择图标",
                            multiple: true,
                            clearable: true
                        },
                        input: {
                            placeholder: "图标搜索",
                        },
                    })
                },
                validate: [
                    { type: 'array', required: true, message: "请选择图标", trigger: 'change' }
                ],
            },
            {
                type: 'title',
                component: markRaw(FitsCheckboxAll),
                title: "多选(全选)",
                field: "checkbox2",
                // value: ['生态蔬菜'],
                props: {
                    options: new FitsCheckboxAllModel({
                        option: [
                            {
                                label: "生态蔬菜",
                            },
                            {
                                label: "新鲜水果",
                            },
                            {
                                label: "蛋糕甜点",
                            }
                        ],
                    })
                },
                effect: {
                    required: true
                }
            },
        ],
        option: {
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            }
        }
    })
)
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>