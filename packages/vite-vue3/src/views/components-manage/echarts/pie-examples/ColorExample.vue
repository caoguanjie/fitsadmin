<template>
    <div class="container">
        <fits-echarts :config="state.echartsOptions" />
    </div>
</template>

<script lang="ts" setup>
import { FitsEcharts, FitsEchartsProps } from "@/fits-components";
import { reactive } from "vue";

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        type: "pie",
        isHasGap: true,
        legend: {
            show: true
        }
    }),
})

/**
 * 获取图表数据（使用setTimeout进行模拟）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.data = [
            { value: 1048, name: 'Search Engine', color: "red" },
            { value: 735, name: 'Direct', color: "#000" },
            { value: 580, name: 'Email', color: "rgba(123, 234, 99, 0.5)" },
            { value: 484, name: 'Union Ads', color: [{ offset: 0, color: "blue" }, { offset: 1, color: "red" }] }, // 渐变色
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
