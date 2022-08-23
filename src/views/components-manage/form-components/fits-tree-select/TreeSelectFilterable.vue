<template>
    <div class="treeSelectFilterable">
        <div class="filterType">
            <span>开启外部输入筛选</span>
            <tree-select :filterInput="filterInput1" :selectInput="selectInput1" :tree="tree" />
        </div>
        <div class="filterType">
            <span>开启下拉框内部输入筛选</span>
            <tree-select :filterInput="filterInput2" :selectInput="selectInput2" :tree="tree" />
        </div>
    </div>
    <div class="customFilter">
        <span>自定义筛选方法（返回label字段不包含该关键字的所有节点）</span>
        <tree-select :filterInput="filterInput1" :selectInput="selectInput1" :tree="tree2" />
    </div>
</template>

<script lang="ts" setup>
import TreeSelect from '@/components/Form/TreeSelect.vue';
import { reactive, toRefs } from 'vue'

const state = reactive({
    filterInput1: {
        show: false,
    },
    selectInput1: {
        filterable: true
    },
    filterInput2: {
        show: true,
    },
    selectInput2: {
        filterable: false
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
    },
    tree2: {
        nodeKey: "id",
        defaultExpandAll: false,
        // props: {
        //     label: 'name',
        //     children: 'child'
        // },
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
        filterNodeMethod: (value: any, data: any, node: any) => {
            console.log(node.label);
            if (!value) return true
            return node.label.indexOf(value) === -1
        }
    }
})
const { filterInput1, selectInput1, filterInput2, selectInput2, tree, tree2 } = toRefs(state)

</script>
<style lang="scss" scoped>
.treeSelectFilterable {
    display: flex;

    .filterType {
        flex: 1;
    }
}

.customFilter {
    margin-top: 10px;
}
</style>

<style lang="scss">
.treeSelectFilterable {
    .el-select {
        width: 90% !important;
        margin-top: 10px;
    }
}
</style>
