<template>
    <fits-tree-select :options="state" />
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import { FitsTreeSelectModel, FitsTreeSelect } from '@/fits-components';
const state = reactive(new FitsTreeSelectModel({
    tree: {
        nodeKey: "id",
        load: loadNode,
        lazy: true,
    }
}))
let count = 0
function loadNode(node: Node, resolve: any) {
    if (node.level === 0) {
        return resolve([{ label: 'Root1', id: count++ }, { label: 'Root2', id: count++ }])
    }
    if (node.level > 3) {
        return resolve([])
    }
    setTimeout(() => {
        let data: any = []
        data = [
            {
                id: count,
                label: `children${count++}`,
            },
            {
                id: count,
                label: `children${count++}`,
            },
        ]
        resolve(data)
    }, 500)
}
</script>
