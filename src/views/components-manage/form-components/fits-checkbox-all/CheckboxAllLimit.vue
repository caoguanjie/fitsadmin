<template>
    <fits-checkbox-all :options="state" />
</template>

<script lang="ts" setup>
import { FitsCheckboxAllModel, FitsCheckboxAll } from '@/fits-components';
import { reactive } from 'vue';

const state = reactive(new FitsCheckboxAllModel({
    option: [
        {
            label: "生态蔬菜",
            disabled: false,
        },
        {
            label: "新鲜水果",
            disabled: false
        },
        {
            label: "蛋糕甜点",
            disabled: false
        },
        {
            label: "烧烤小吃",
            disabled: false
        },
        {
            label: "快餐便当",
            disabled: false
        },
        {
            label: "甜品饮料",
            disabled: false
        }
    ],
    checkboxGroup: {
        min: 1,
        max: 4
    }
}))

</script>
<style lang="scss" scoped>

</style>

<style lang="scss">

</style>
