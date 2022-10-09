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
import { FitsEchartsProps } from '@/components/Echarts/type';
import TitleItem from "./TitleItem.vue"
import ChartConditionsItem from "./ChartConditionsItem.vue"

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        legend: {
            show: true,
            positon: "bottomCenter",
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
    for (let index = 0; index < 6; index++) {
        list.push([randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()])
    }
    return list
}

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["网络组", "运维组", "客户组", "维修组", "框架组"]
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
