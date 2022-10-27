<template>
    <div class="innerBox">
        <div>
            默认值
            <div class="describe">通过设置 modelValue 传递一个由节点的key组成的数组，设置多选默认值</div>
        </div>
        <fits-tree-select :options="state1" :modelValue="value" />
    </div>
    <div class="innerBox">
        <div>
            多选项省略，以数字形式展示
            <div class="describe">通过设置 select.collapseTags = true，折叠多选项内容</div>
        </div>
        <fits-tree-select :options="state2" />
    </div>

    <div class="innerBox">
        <div>
            鼠标悬浮文字出现多选项标签
            <div class="describe">通过设置 select.collapseTags = true 和 select.collapseTagsTooltip = true，鼠标悬浮在数字上时，显示折叠项
            </div>
        </div>
        <fits-tree-select :options="state3" />
    </div>

    <div class="innerBox">
        <div>
            点击节点时选中
            <div class="describe">设置 tree.checkOnClickNode = true ，点击节点时勾选上，默认通过点击复选框才能勾选。</div>
        </div>
        <fits-tree-select :options="state4" />
    </div>
</template>

<script lang="ts" setup>
import { FitsTreeSelectModel, FitsTreeSelect } from '@/fits-components';

const value = ref(['9', '11'])

const data = reactive([
    {
        id: '1',
        label: '总经办',
        children: [
            {
                id: '4',
                label: '业务部',
                children: [
                    {
                        id: '9',
                        label: '业务A部'
                    },
                    {
                        id: '11',
                        label: '业务B部',
                    },
                ],
            },
        ],
    },
    {
        id: '21',
        label: '研发部',
        children: [
            {
                id: '5',
                label: '研发1部',
            },
            {
                id: '6',
                label: '研发2部',
            },
        ],
    },
    {
        id: '3',
        label: '财务部',
        children: [
            {
                id: '7',
                label: '财务1部',
            },
            {
                id: '8',
                label: '财务2部',
            },
        ],
    },
])

const state1 = reactive(new FitsTreeSelectModel({
    select: {
        multiple: true,
    },
    tree: {
        nodeKey: "id",
        highlightCurrent: false,
        showCheckbox: true,
        data
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
        data
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
        data
    },
}))

const state4 = reactive(new FitsTreeSelectModel({
    select: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true
    },
    tree: {
        nodeKey: "id",
        showCheckbox: true,
        checkOnClickNode: true,
        data
    },
}))

</script>
<style lang="scss" scoped>
.innerBox {
    margin-top: 16px;

    .describe {
        font-size: 14px;
        margin: 4px 0;
    }
}
</style>

