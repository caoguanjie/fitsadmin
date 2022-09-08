<template>
    <fits-tree-select :options="state" modelValue="91" />
</template>

<script lang="ts" setup>
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue';
import { reactive } from 'vue'
import { FitsTreeSelectModel } from '@/components/Form/model';

const state = reactive(new FitsTreeSelectModel({
    select: {
        clearable: true,
        placeholder: '请选择'
    },
    input: {
        show: false,
        elementProps: {
            clearable: true,
        }
    },
    tree: {
        nodeKey: "id",
        defaultExpandAll: false,
        data: [
            {
                id: '1',
                label: 'Level 1',
                children: [
                    {
                        id: '4',
                        label: 'Level 1-1',
                        children: [
                            {
                                id: '9',
                                label: 'Level 1-1-1'
                            },
                            {
                                id: '11',
                                label: '我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据',
                            },
                        ],
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
                        children: [
                            {
                                id: '91',
                                label: 'Level 2-1-1',
                            },
                            {
                                id: '111',
                                label: 'Level 2-2-2',
                            },
                        ],
                    },
                    {
                        id: '6',
                        label: 'Level 2-2',
                    },
                ],
            },
            {
                id: '3',
                label: 'Level 3',
                children: [
                    {
                        id: '7',
                        label: 'Level 3-1',
                    },
                    {
                        id: '8',
                        label: 'Level 3-2',
                        children: [
                            {
                                id: '92',
                                label: 'Level 3-2-1',
                            },
                            {
                                id: '120',
                                label: 'Level 3-2-2',
                            },
                        ],
                    },
                ],
            },
        ],
    }
}))

</script>
<style lang="scss" scoped>
</style>

<style lang="scss">
</style>
