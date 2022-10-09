<template>
    <div class="pie">
        <title-item title="工单超时" @refresh-data="getEchartsData" />
        <chart-conditions-item @refresh-data="getEchartsData" />
        <div class="chart">
            <fits-echarts :config="echartsOptions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FitsEchartsProps } from '@/components/Echarts/type';
import TitleItem from "./TitleItem.vue"
import ChartConditionsItem from "./ChartConditionsItem.vue"

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        type: "pie",
        legend: {
            show: true
        }
    }),
})
const { echartsOptions } = toRefs(state)

/**
 * 随机数
 */
function randomNum() {
    return Math.ceil(Math.random() * 100);
}

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.data = [
            { value: randomNum(), name: '家具家电', color: "rgba(91, 143, 249, 0.85)" },
            { value: randomNum(), name: '粮油副食', color: "rgba(90, 216, 166, 0.85)" },
        ]
    }, 0);
}
getEchartsData()
</script>

<style lang="scss" scoped>
.pie {
    background: #fff;
    margin-left: 16px;
    flex: 3;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    .chart {
        flex: 1;
    }
}
</style>
