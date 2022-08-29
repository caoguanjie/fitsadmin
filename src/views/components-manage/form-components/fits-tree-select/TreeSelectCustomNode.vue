<template>
    <fits-tree-select :options="state" />
</template>

<script lang="ts" setup>
import { FitsTreeSelectModel } from '@/components/Form/model';
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue';
import { reactive } from 'vue'

const state = reactive(new FitsTreeSelectModel({
    tree: {
        nodeKey: "id",
        defaultExpandAll: true,
        showCheckbox: true,
        expandOnClickNode: false,
        data: [
            {
                id: 1,
                label: 'Level one 1',
                children: [
                    {
                        id: 4,
                        label: 'Level two 1-1',
                        children: [
                            {
                                id: 9,
                                label: 'Level three 1-1-1',
                            },
                            {
                                id: 10,
                                label: 'Level three 1-1-2',
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                label: 'Level one 2',
                children: [
                    {
                        id: 5,
                        label: 'Level two 2-1',
                    },
                    {
                        id: 6,
                        label: 'Level two 2-2',
                    },
                ],
            },
            {
                id: 3,
                label: 'Level one 3',
                children: [
                    {
                        id: 7,
                        label: 'Level two 3-1',
                    },
                    {
                        id: 8,
                        label: 'Level two 3-2',
                    },
                ],
            },
        ],
        renderContent,
    }
}))

const append = (data: any) => {
    let id = 1000
    const newChild = { id: id++, label: 'testtest', children: [] }
    if (!data.children) {
        data.children = []
    }
    data.children.push(newChild)
    state.tree.data = [...state.tree.data]
}

const remove = (node: any, data: any) => {
    const parent = node.parent
    const children: any[] = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    state.tree.data = [...state.tree.data]
}

function renderContent(
    h: any,
    {
        node,
        data,
        store,
    }: any
) {
    return h(
        'span',
        {
            class: 'custom-tree-node',
        },
        h('span', null, node.label),
        h(
            'div',
            {
                style: 'display: flex'
            },
            h(
                'div',
                {
                    onClick: (e: any) => {
                        e.stopPropagation();
                        append(data)
                    },
                    class: 'operation'
                },
                'Append '
            ),
            h(
                'div',
                {
                    style: 'margin-left: 8px',
                    class: 'operation',
                    onClick: (e: any) => {
                        e.stopPropagation();
                        remove(node, data)
                    },
                },
                'Delete'
            )
        )
    )
}
</script>
<style lang="scss" scoped>
</style>

<style lang="scss">
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .operation {
        color: #007dff;
        display: inline-block;
        position: relative;
    }

    .operation::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: #007dff;
        transform-origin: bottom right;
        transition: transform 0.15s ease-out;
    }

    .operation:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
}
</style>
