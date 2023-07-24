<template>
    <div class="container">
        <fits-echarts :config="state.echartsOptions" />
    </div>
</template>

<script lang="ts" setup>
import { getWorkOrderType } from "@/api/work-order";
import { FitsEcharts, FitsEchartsProps } from "@/fits-components";
import { reactive } from "vue";

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        legend: {
            data: [
                { name: "处理中" },
                { name: "挂起" },
                { name: "失败解决" },
                { name: "成功解决" },
                { name: "已关闭" },
            ]
        },
    }),
})

/**
 * 获取图表数据
 */
async function getEchartsData() {
    const res = await getWorkOrderType({
        /* Your params here */
    })
    // 过滤成组件需要的数据格式
    const obj = res.ReturnData.StatisList.reduce((cur, pre) => {
        Object.keys(pre).forEach(key => {
            // 传入x轴刻度名
            key === "GroupInfo" && state.echartsOptions.xAxisNames?.push(pre[key] || "")
            // 过滤接口数据，过滤成number[][]类型的
            Object.prototype.hasOwnProperty.call(cur, key) && (cur[key]).push(pre[key] || 0)
        })
        return cur
    }, { Closed: [], FailureSolve: [], HangUp: [], InProcess: [], NewState: [], SuccessSolve: [] } as { [key: string]: number[] })
    state.echartsOptions.data = [obj.NewState, obj.InProcess, obj.HangUp, obj.FailureSolve, obj.SuccessSolve, obj.Closed]
}
getEchartsData()
</script>

<style lang="scss" scoped>
.container {
    height: 25rem;
}
</style>
