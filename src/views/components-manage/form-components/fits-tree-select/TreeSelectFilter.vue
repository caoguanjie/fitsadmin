<template>
    <fits-tree-select :options="state1" />
</template>

<script lang="ts" setup>
import { FitsTreeSelect } from '@/fits-components';
import { FitsTreeSelectModel } from '@/fits-components/type';
const state1 = reactive(new FitsTreeSelectModel({
    tree: {
        nodeKey: "id",
        defaultExpandAll: false,
        data: [
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
        ],
    },
}))

</script>
