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
        legend: {
            show: true,
            data: [
                { name: "处理中" },
                { name: "挂起" },
                { name: "失败解决" },
                { name: "成功解决" },
                { name: "已关闭" },
            ]
        },
        hasBarRadius: false,
        isStack: true
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
