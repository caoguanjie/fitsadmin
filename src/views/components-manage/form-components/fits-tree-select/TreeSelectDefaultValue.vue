<template>
    <tree-select :filterInput="filterInput" :selectInput="selectInput" :tree="tree" :modelValue="91" />
</template>

<script lang="ts" setup>
import TreeSelect from '@/components/Form/TreeSelect.vue';
import { reactive, toRefs } from 'vue'

const state = reactive({
    filterInput: {
    },
    selectInput: {
    },
    tree: {
        nodeKey: "id",
        defaultExpandAll: false,
        data: [
            {
                id: 1,
                label: 'Level 1',
                children: [
                    {
                        id: 4,
                        label: 'Level 1-1',
                        children: [
                            {
                                id: 9,
                                label: 'Level 1-1-1',
                            },
                            {
                                id: 11,
                                label: 'Level 1-1-2',
                            },
                        ],
                    },
                ],
            },
            {
                id: 21,
                label: 'Level 2',
                children: [
                    {
                        id: 5,
                        label: 'Level 2-1',
                        children: [
                            // 默认设置了该节点
                            {
                                id: 91,
                                label: 'Level 2-1-1',
                            },
                            {
                                id: 111,
                                label: 'Level 2-2-2',
                            },
                        ],
                    },
                    {
                        id: 6,
                        label: 'Level 2-2',
                    },
                ],
            },
            {
                id: 3,
                label: 'Level 3',
                children: [
                    {
                        id: 7,
                        label: 'Level 3-1',
                    },
                    {
                        id: 8,
                        label: 'Level 3-2',
                        children: [
                            {
                                id: 92,
                                label: 'Level 3-2-1',
                            },
                            {
                                id: 120,
                                label: 'Level 3-2-2',
                            },
                        ],
                    },
                ],
            },
        ],
    }
})
const { filterInput, selectInput, tree } = toRefs(state)
</script>
<style lang="scss" scoped>
</style>

<style lang="scss">
</style>
