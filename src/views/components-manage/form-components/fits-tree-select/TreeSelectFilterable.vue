<template>
    <div class="treeSelectFilterable">
        <div class="filterType">
            <span>开启外部输入筛选</span>
            <fits-tree-select :options="state1" />
        </div>
        <div class="filterType">
            <span>开启下拉框内部输入筛选</span>
            <fits-tree-select :options="state2" />
        </div>
    </div>
    <div class="customFilter">
        <span>自定义筛选方法（返回label字段不包含该关键字的所有节点）</span>
        <fits-tree-select :options="state3" />
    </div>
</template>

<script lang="ts" setup>
import { FitsTreeSelectModel } from '@/components/Form/model';
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue';
import { reactive } from 'vue'
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'

const state1 = reactive(new FitsTreeSelectModel({
    input: {
        show: false,
    },
    select: {
        filterable: true
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
}))

const state2 = reactive(new FitsTreeSelectModel({
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
}))

const state3 = reactive(new FitsTreeSelectModel({
    input: {
        show: false,
    },
    select: {
        filterable: true
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
        filterNodeMethod: (value: string, data: TreeNodeData, node: any) => {
            if (!value) return true
            return node.label.indexOf(value) === -1
        }
    }
}))

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
