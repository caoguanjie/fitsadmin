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
                { name: "新建状态" },
                { name: "处理中" },
                { name: "挂起" },
                { name: "失败解决" },
                { name: "成功解决" },
                { name: "已关闭" },
            ]
        },
        isShowZoom: true
    }),
})

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["客户组超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本", "运维组", "实施组", "维修组", "框架组", "其他组"]
        state.echartsOptions.data = [
            [24, 57, 11, 99, 12, 123],
            [11, 132, 57, 34, 12, 123],
            [111, 28, 65, 72, 12, 123],
            [100, 50, 44, 89, 12, 123],
            [124, 55, 35, 48, 12, 123],
            [56, 24, 92, 38, 12, 123],
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
