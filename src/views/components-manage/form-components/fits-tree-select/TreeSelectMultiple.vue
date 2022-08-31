<template>
    <div class="innerBox">
        <span>
            默认值多选<br>
            <span class="describe">通过设置 tree.defaultCheckedKeys 传递一个由节点的key组成的数组设置多选的默认值</span>
        </span>
        <fits-tree-select :options="state1" @update:model-value="getValue" />
    </div>
    <div class="innerBox">
        <span>多选项以文字形式展示</span>
        <fits-tree-select :options="state2" />
    </div>

    <div class="innerBox">
        <span>鼠标悬浮文字出现多选项标签</span>
        <fits-tree-select :options="state3" />
    </div>
</template>

<script lang="ts" setup>
import { FitsTreeSelectModel } from '@/components/Form/model';
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue';
import { reactive } from 'vue'

const state1 = reactive(new FitsTreeSelectModel({
    select: {
        multiple: true,
    },
    tree: {
        defaultCheckedKeys: [91, 111],
        nodeKey: "id",
        highlightCurrent: false,
        showCheckbox: true,
        data: [
            {
                id: 1,
                label: 'Level 1',
                children: [
                    {
                        id: 4,
                        label: 'Level 1-1',
                        // disabled: true,
                        children: [
                            {
                                id: 9,
                                label: 'Level 1-1-1',
                                disabled: true
                            },
                            {
                                id: 11,
                                label: 'level 1-1-2',
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
    select: {
        multiple: true,
        collapseTags: true,
    },
    tree: {
        nodeKey: "id",
        highlightCurrent: false,
        showCheckbox: true,
        data: [
            {
                id: 1,
                label: 'Level 1',
                children: [
                    {
                        id: 4,
                        label: 'Level 1-1',
                        // disabled: true,
                        children: [
                            {
                                id: 9,
                                label: 'Level 1-1-1',
                                disabled: true
                            },
                            {
                                id: 11,
                                label: 'level 1-1-2',
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
    select: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true
    },
    tree: {
        nodeKey: "id",
        highlightCurrent: false,
        showCheckbox: true,
        data: [
            {
                id: 1,
                label: 'Level 1',
                children: [
                    {
                        id: 4,
                        label: 'Level 1-1',
                        // disabled: true,
                        children: [
                            {
                                id: 9,
                                label: 'Level 1-1-1',
                                disabled: true
                            },
                            {
                                id: 11,
                                label: 'level 1-1-2',
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

function getValue(value: any) {
    console.log(value);

}
</script>
<style lang="scss" scoped>
.innerBox {
    margin-top: 20px;

    .describe {
        font-size: 14px;
    }
}

.innerBox:first-child {
    margin-top: 0;
}

:deep(.el-select) {
    width: 90%;
}
</style>

<style lang="scss">
</style>
