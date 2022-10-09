<template>
    <div class="work-group-statistics">
        <TitleItem title="工作组统计" @refresh-data="getEchartsData" />
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
            positon: "topLeft",
            data: [
                { name: "新建状态", color: "#00dba2" },
                { name: "处理中", color: "#3979ff" },
            ]
        },
        isShowZoom: true,
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
    for (let index = 0; index < 2; index++) {
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
    padding: 16px;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    height: 500px;
    background-color: #ffffff;

    .chart {
        flex: 1;
    }
}
</style>
