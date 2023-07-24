<template>
    <div class="work-group-statistics">
        <title-item title="工作组统计" @refresh-data="getEchartsData" />
        <chart-conditions-item @refresh-data="getEchartsData" />
        <div class="chart">
            <fits-echarts :config="echartsOptions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FitsEcharts, FitsEchartsProps } from "@/fits-components";
import TitleItem from "./TitleItem.vue"
import ChartConditionsItem from "./ChartConditionsItem.vue"

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        legend: {
            show: true,
            positon: "topRight",
            data: [
                { name: "新建状态", color: [{ offset: 0, color: "#6bb1ff" }, { offset: 1, color: "#3979ff" }] },
            ]
        },
        isShowZoom: true
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
    return [[randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()]]
}

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["网络组", "运维组", "客户组", "维修组", "框架组", "医疗组"]
        state.echartsOptions.data = randomArray()
    }, 0);
}
getEchartsData()
</script>

<style lang="scss" scoped>
.work-group-statistics {
    margin-top: 16px;
    padding: 16px;
    background: #fff;
    height: 534px;
    display: flex;
    flex-direction: column;

    .chart {
        flex: 1;
    }
}
</style>
