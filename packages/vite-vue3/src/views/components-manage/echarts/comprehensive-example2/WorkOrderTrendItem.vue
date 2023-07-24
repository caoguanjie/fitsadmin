<template>
    <div class="trend">
        <title-item title="工单趋势" @refresh-data="getEchartsData" />
        <div class="chart">
            <fits-echarts :config="echartsOptions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FitsEcharts, FitsEchartsProps } from "@/fits-components";
import TitleItem from "./TitleItem.vue"

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        type: "line",
        legend: {
            show: true,
            positon: "topLeft",
            data: [
                { name: "新建状态", color: "#397aff" },
                { name: "失败解决", color: "#a17bf4" },
                { name: "成功解决", color: "#f4961a" },
            ]
        },
        isShowArea: true // 显示面积
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
.trend {
    flex: 5;
    padding: 16px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;

    .chart {
        flex: 1;
    }
}
</style>
