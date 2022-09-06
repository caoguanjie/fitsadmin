<template>
    <div class="container">
        <fits-echarts :config="state.echartsOptions" />
    </div>
</template>

<script lang="ts" setup>
import FitsEcharts from "@/components/Echarts/FitsEcharts.vue"
import { FitsEchartsProps } from "@/components/Echarts/type";
import { reactive } from "vue";

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        type: "pie",
    }),
})

/**
 * 获取图表数据（使用setTimeout进行模拟）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.data = [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ]
    }, 500);
}
getEchartsData()
</script>

<style lang="scss" scoped>
.container {
    height: 25rem;
}
</style>
