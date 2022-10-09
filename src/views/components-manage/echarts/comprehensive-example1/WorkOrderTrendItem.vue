<template>
    <div class="line">
        <title-item title="工单趋势" @refresh-data="getEchartsData" />
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
        type: "line",
        legend: {
            data: [
                { name: "新建工单" },
                { name: "成功解决" },
                { name: "失败解决" },
            ],
            show: true,
            positon: "bottomCenter",
        },
        isSmooth: true
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
 * 数组随机数据
 */
function randomArray() {
    let list = []
    for (let index = 0; index < 3; index++) {
        list.push([randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()])
    }
    return list
}

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["2022-08-01", "2022-08-02", "2022-08-03", "2022-08-04", "2022-08-05", "2022-08-06", "2022-08-07"]
        state.echartsOptions.data = randomArray()
    }, 0);
}
getEchartsData()
</script>

<style lang="scss" scoped>
.line {
    flex: 4;
    background: #fff;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    .chart {
        flex: 1;
    }
}
</style>
