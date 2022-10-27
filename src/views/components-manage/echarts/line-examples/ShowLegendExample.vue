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
        type: "line",
        legend: {
            show: true, // 显示图例组件
            data: [
                { name: "新建工单" },
                { name: "成功解决" },
                { name: "失败解决" },
            ]
        },
    }),
})

/**
 * 获取图表数据（使用setTimeout进行模拟）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["2022-08-01", "2022-08-02", "2022-08-03", "2022-08-04", "2022-08-05", "2022-08-06", "2022-08-07"]
        state.echartsOptions.data = [
            [4.2, 2.7, 3.7, 8, 5.7, 5.6, 6.3],
            [6.1, 4.1, 3.7, 3.9, 2.9, 2, 4.2],
            [8, 9, 8.3, 6, 8.2, 6, 3.7],
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
