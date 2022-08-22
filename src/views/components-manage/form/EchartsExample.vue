<template>
    <div>
        <div class="container">
            <div class="bar-header">
                <div class="leftContainer">
                    <span>队列统计</span>
                </div>
            </div>
            <echarts-page type="bar" :option="barOption"></echarts-page>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import EchartsPage from './EchartsPage.vue'

const barOption: any = reactive({})
const lineOption = reactive({})
const pieOption = reactive({})

onMounted(() => {
    selectBarChartData()
    selectLineChartData();
    selectPieChartData();
})

/**
 * 柱状图的方法
 */
const barChartsOption = (
    xAxisArray: string[],
    createArray: number[],
    handlingArray: number[],
    hangupArray: number[],
    failArray: number[],
    successArray: number[],
    closeArray: number[]
) => {
    const opt = {
        legend: {
            data: [
                { name: "新建工单", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "处理中", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "挂起", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "失败解决", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "成功解决", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "已关闭", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
            ],
        },
        xAxis: {
            data: xAxisArray,
        },
        series: [
            {
                name: '新建工单',
                data: createArray,
            },
            {
                name: '处理中',
                data: handlingArray,
            },
            {
                name: '挂起',
                data: hangupArray,
            },
            {
                name: '失败解决',
                data: failArray,
            },
            {
                name: '成功解决',
                data: successArray,
            },
            {
                name: '已关闭',
                data: closeArray,
            }
        ],
    };
    Object.assign(barOption, opt)
}

/**
 * 折线图的方法
 * @param timeArray x轴的数据data
 * @param createArray 创建工单的数据
 * @param successArray 成功解决的数据
 * @param failArray 失败解决的数据
 */
const lineChartsOption = (timeArray: string[], createArray: number[], successArray: number[], failArray: number[]) => {
    // 指定图表的配置项和数据
    const opt = {
        legend: {
            data: [
                { name: "新建工单", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "失败解决", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "成功解决", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
            ]
        },
        xAxis: {
            data: timeArray,
        },
        series: [
            {
                name: '新建工单',
                data: createArray
            },
            {
                name: '成功解决',
                data: successArray
            },
            {
                name: '失败解决',
                data: failArray
            }
        ],
    };
    // 使用刚指定的配置项和数据显示图表。
    Object.assign(lineOption, opt)
}

/**
 * 初始化饼图数据
 * @param data 初始化的数据
 */
const pieChartsOption = (data: object[]) => {
    const opt = {
        legend: {
            data: [
                { name: "响应时间", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
                { name: "解决超时", icon: "circle", textStyle: { font: "12px", color: "#999999" } },
            ]
        },
        series: [
            {
                name: '工单超时',
                data: data,
            }
        ],
    };
    Object.assign(pieOption, opt)
}

/**
 * 查询柱状图的数据。
 */
const selectBarChartData = () => {
    const res = [
        {
            CreateCount: 1,
            TimeOutCount: 3,
            HangCount: 39,
            SolveCount: 40,
            failCount: 20,
            closeCount: 40,
            GroupInfo: "丰德运维组"
        },
        {
            CreateCount: 44,
            TimeOutCount: 22,
            HangCount: 33,
            SolveCount: 11,
            failCount: 30,
            closeCount: 42,
            GroupInfo: "维修组"
        },
        {
            CreateCount: 55,
            TimeOutCount: 33,
            HangCount: 66,
            SolveCount: 1,
            failCount: 10,
            closeCount: 30,
            GroupInfo: "网络组"
        },
        {
            CreateCount: 33,
            TimeOutCount: 15,
            HangCount: 6,
            SolveCount: 5,
            failCount: 20,
            closeCount: 21,
            GroupInfo: "客户组"
        },
        {
            CreateCount: 66,
            TimeOutCount: 2,
            HangCount: 5,
            SolveCount: 6,
            failCount: 20,
            closeCount: 22,
            GroupInfo: "我是名字最长的组啦啦啦"
        }
    ]
    const param = handleBarParams(res);
    barChartsOption(
        param.xAxis,
        param.create,
        param.handle,
        param.timeout,
        param.failSolve,
        param.successSolve,
        param.close
    );
    // }
}

/**
 * 查询折线图的数据。
 */
const selectLineChartData = () => {
    const res = [
        {
            CreateCount: 3,
            TimeOutCount: 0,
            HangCount: 0,
            SolveCount: 0,
            GroupInfo: "20180716"
        },
        {
            CreateCount: 1,
            TimeOutCount: 0,
            HangCount: 0,
            SolveCount: 0,
            GroupInfo: "20180719"
        },
        {
            CreateCount: 3,
            TimeOutCount: 0,
            HangCount: 0,
            SolveCount: 0,
            GroupInfo: "20180725"
        },
        {
            CreateCount: 5,
            TimeOutCount: 0,
            HangCount: 0,
            SolveCount: 0,
            GroupInfo: "20180730"
        },
        {
            CreateCount: 2,
            TimeOutCount: 0,
            HangCount: 0,
            SolveCount: 0,
            GroupInfo: "20180731"
        },
        {
            CreateCount: 1,
            TimeOutCount: 0,
            HangCount: 0,
            SolveCount: 0,
            GroupInfo: "20180803"
        },
        {
            CreateCount: 1,
            TimeOutCount: 0,
            HangCount: 1,
            SolveCount: 1,
            GroupInfo: "20180806"
        }
    ]
    const param = handleLineParams(res);
    lineChartsOption(param.time, param.create, param.successSolve, param.failSolve);
}

/**
 * 查询饼图的数据
 */
const selectPieChartData = () => {
    const res = [
        {
            CreateCount: 1,
            TimeOutCount: null,
            HangCount: null,
            SolveCount: null,
            GroupInfo: "解决超时"
        },
        {
            CreateCount: 22,
            TimeOutCount: null,
            HangCount: null,
            SolveCount: null,
            GroupInfo: "响应时间"
        }
    ]
    const param = handlePieParams(res);
    pieChartsOption(param);
}

/**
 * 处理柱状图的数据，转化我们想要的格式
 * @param data 
 */
const handleBarParams = (data: any) => {
    let createCountInfo = [],
        timeOutCountInfo = [],
        solveCountInfo = [],
        hangCountInfo = [],
        failCountInfo = [],
        closeCountInfo = [],
        xAxisCountInfo = [];
    for (const value of data) {
        createCountInfo.push(value.CreateCount);
        timeOutCountInfo.push(value.TimeOutCount);
        solveCountInfo.push(value.SolveCount);
        hangCountInfo.push(value.HangCount);
        failCountInfo.push(value.failCount);
        closeCountInfo.push(value.closeCount);
        xAxisCountInfo.push(value.GroupInfo);
    }
    return {
        xAxis: xAxisCountInfo,
        create: createCountInfo,
        timeout: timeOutCountInfo,
        successSolve: solveCountInfo,
        failSolve: failCountInfo,
        handle: hangCountInfo,
        close: closeCountInfo,
    }
}

/**
 * 处理折线图的数据，转化我们想要的格式
 * @param data 
 */
const handleLineParams = (data: any) => {
    let timeInfo = [],
        createCountInfo = [],
        timeOutCountInfo = [],
        solveCountInfo = [],
        hangCountInfo = []
    for (const value of data) {
        let mon = value.GroupInfo.substring(4, 6);
        let dt = value.GroupInfo.substring(6);
        timeInfo.push(mon + '-' + dt);
        createCountInfo.push(value.CreateCount);
        timeOutCountInfo.push(value.TimeOutCount);
        solveCountInfo.push(value.SolveCount);
        hangCountInfo.push(value.HangCount);
    }
    return {
        time: timeInfo,
        create: createCountInfo,
        successSolve: solveCountInfo,
        failSolve: hangCountInfo
    }
}

/**
 * 处理饼图的参数
 * @param data 请求接口返回的结果
 */
const handlePieParams = (data: any): object[] => {
    const arr = [];
    for (let value of data) {
        arr.push({ name: value.GroupInfo, value: value.CreateCount });
    }
    return arr;
}
</script>
<style lang="scss" scoped>
.container {
    margin: 1rem;
}

.bar,
.line,
.pie {
    width: calc(100vw - 3.2rem);
    height: 25rem;
    padding: 1rem 0;
    margin: auto;
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
}

.bar-header {
    padding: 1rem .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    font-size: 1.5rem;

    .leftContainer {
        display: flex;
        align-items: center;
    }

    img {
        display: inline-block;
        width: 2.4rem;
        margin-right: 0.3rem;
    }
}
</style>
