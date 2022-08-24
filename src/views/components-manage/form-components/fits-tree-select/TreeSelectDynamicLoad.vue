<template>
    <tree-select :filterInput="filterInput" :selectInput="selectInput" :tree="tree" />
</template>

<script lang="ts" setup>
import TreeSelect from '@/components/Form/TreeSelect.vue';
import { reactive, toRefs } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'

const state = reactive({
    filterInput: {
        show: true,
    },
    selectInput: {
    },
    tree: {
        nodeKey: "id",
        load: loadNode,
        lazy: true,
        // data: [],
    }
})
const { filterInput, selectInput, tree } = toRefs(state)
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
<style lang="scss" scoped>
</style>

<style lang="scss">
</style>
