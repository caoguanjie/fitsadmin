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
        legend: {
            show: true,
            data: [
                { name: "处理中", color: "purple" },
                { name: "挂起", color: "#F56C6C" },
                { name: "失败解决", color: "#67C23A" },
                { name: "成功解决", color: [{ offset: 0, color: "red" }, { offset: 1, color: "blue" }] },
                { name: "已关闭", color: [{ offset: 0, color: "#fff" }, { offset: 1, color: "#000" }] },
            ]
        },
        hasBarRadius: false
    }),
})

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["网络组", "运维组", "客户组", "维修组"]
        state.echartsOptions.data = [
            [111, 28, 65, 72],
            [24, 57, 11, 99],
            [100, 50, 44, 89],
            [124, 55, 35, 48],
            [56, 24, 92, 38],
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
