<template>
    <div class="work-group-statistics">
        <title-item title="工作组统计" @refresh-data="getEchartsData" />
        <div class="chart">
            <fits-echarts :config="echartsOptions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FitsEchartsProps } from '@/components/Echarts/type';
import TitleItem from "./TitleItem.vue"

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        legend: {
            show: true,
            positon: "topRight",
            data: [
                { name: "新建状态", color: "rgba(91, 143, 249, 0.85)" },
                { name: "处理中", color: "rgba(90, 216, 166, 0.85)" },
                { name: "挂起", color: "#7484a1" },
                { name: "失败解决", color: "#f6c638" },
                { name: "成功解决", color: "#ea7d64" },
                { name: "已关闭", color: "#82cfee" },
            ]
        },
        isShowZoom: true,
        isStack: true,
        hasBarRadius: false
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
    for (let index = 0; index < 7; index++) {
        list.push([randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()])
    }
    return list
}

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.xAxisNames = ["网络组", "运维组", "客户组", "维修组", "框架组", "其他组"]
        state.echartsOptions.data = randomArray()
    }, 0);
}
getEchartsData()
</script>

<style lang="scss" scoped>
.work-group-statistics {
    flex: 5;
    padding: 16px;
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;

    .chart {
        flex: 1;
    }
}
</style>
