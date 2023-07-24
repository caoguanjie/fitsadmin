<template>
    <div class="timeout">
        <title-item title="工单超时" @refresh-data="getEchartsData">
            <el-date-picker v-model="timeRange" type="daterange" unlink-panels range-separator="一"
                start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" @change="getEchartsData" />
        </title-item>
        <div class="selects">
            <el-select v-model="project" placeholder="所属项目" @change="getEchartsData">
                <el-option v-for="item in projectOps" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="workGroup" placeholder="选择工作组" @change="getEchartsData">
                <el-option v-for="item in workGroupOps" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
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
        type: "pie",
        isHasGap: true,
        legend: {
            show: true
        }
    }),
    projectOps: [
        { value: "工时系统", label: "工时系统" },
        { value: "个案管理系统", label: "个案管理系统" },
        { value: "电子病历", label: "电子病历" },
    ],
    workGroupOps: [
        { value: "网络组", label: "网络组" },
        { value: "运维组", label: "运维组" },
        { value: "客户组", label: "客户组" },
        { value: "维修组", label: "维修组" },
        { value: "框架组", label: "框架组" },
    ],
    shortcuts: [
        {
            text: '昨天',
            value: () => {
                const end = new Date()
                const start = moment().subtract(1, 'days').valueOf()
                return [start, end]
            },
        },
        {
            text: '近3个月',
            value: () => {
                const end = new Date()
                const start = moment().subtract(90, 'days').valueOf()
                return [start, end]
            },
        },
        {
            text: '近半年',
            value: () => {
                const end = new Date()
                const start = moment().subtract(180, 'days').valueOf()
                return [start, end]
            },
        },
    ],
    project: "",
    workGroup: "",
    timeRange: "",
})

const { echartsOptions, projectOps, workGroupOps, project, workGroup, timeRange, shortcuts } = toRefs(state)

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
        state.echartsOptions.xAxisNames = ["2022-08-01", "2022-08-02", "2022-08-03", "2022-08-04", "2022-08-05", "2022-08-06", "2022-08-07"]
        state.echartsOptions.data = [
            { value: randomNum(), name: '处理中' },
            { value: randomNum(), name: '成功处理' },
            { value: randomNum(), name: '失败处理' },
            { value: randomNum(), name: '新建状态' },
        ]
    }, 0);
}
getEchartsData()
</script>

<style lang="scss" scoped>
.timeout {
    flex: 2;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    background-color: #ffffff;

    &>* {
        margin: 16px;
    }

    .selects {
        margin: 0 16px;
        display: flex;

        .el-select {
            width: 130px;
            margin-right: 8px;
        }
    }

    .chart {
        flex: 1;
    }
}
</style>
