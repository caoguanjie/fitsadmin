<template>
    <fits-checkbox-all :options="state" />
</template>

<script lang="ts" setup>
import FitsCheckboxAll from '@/components/Form/FitsCheckboxAll.vue';
import { FitsCheckboxAllModel } from '@/components/Form/model';
import { reactive } from 'vue';

const state = reactive(new FitsCheckboxAllModel({
    option: [
        {
            label: "生态蔬菜",
            disabled: false
        },
        {
            label: "新鲜水果",
            disabled: false
        },
        {
            label: "蛋糕甜点",
            disabled: false
        },
    ]
}))

</script>
<style lang="scss" scoped>
</style>

<style lang="scss">
</style>
