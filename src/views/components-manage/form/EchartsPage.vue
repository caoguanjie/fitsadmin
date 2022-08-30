<template>
    <div class="bar" ref="bar" v-show="props.type === 'bar'"></div>
    <div class="line" ref="line" v-show="props.type === 'line'"></div>
    <div class="pie" ref="pie" v-show="props.type === 'pie'"></div>

    <div class="custom" ref="custom" v-show="props.type === 'custom'"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from "vue";
import * as echarts from 'echarts'
// 报错，找不到echarts


// 传配置项直接替换 + 数据
const props = defineProps<{
    option: any,
    type: string,
}>()

watch(props.option, (newval, oldval) => {
    initCharts()
});

onMounted(() => {
    nextTick(() => {
        initCharts()
    })
})

const bar: any = ref(null);
const line: any = ref(null);
const pie: any = ref(null);
const custom: any = ref(null);

let BarIns: any;
let LineIns: any
let PieIns: any
let CustomIns: any

let barChartsOption: any;
let lineChartsOption: any;
let pieChartsOption: any;

/**
   * 
   * @param barWidth 柱子的宽度，单位px
   * @param barGap 柱子与柱子之间的间隙，单位百分比，这里百分比相对于柱子宽度的，例如 barWidth = ‘14px’ barGap = ‘10%’。那么实际的间隙就是14 * 10% = 1.4px;
   * @param barNum 一个类目柱子的数目，一个x轴的刻度放几个柱子。
   * @param dataLength  数据的长度，也就是说x轴会存在多少个类目。
   */
const getDataZoomEnd = (barWidth: number, barGap: number, barNum: number, dataLength: number) => {
    const oneBarWidth = (1 + barGap / 100) * barWidth * barNum + 10; // 一个类目的宽度，10代表类目之间会有20px的空隙
    const redix = oneBarWidth * dataLength;
    const viewWidth = BarIns.getWidth();
    if (redix < viewWidth) {
        return 100;
    } else {
        return 100 / (dataLength - 1);
    }
}

/**
 * @desc 设置图表初始值
 */
const initCharts = () => {
    let _end: any
    switch (props.type) {
        case 'bar':

            if (!BarIns) {
                BarIns = echarts.init(bar.value);
            }
            _end = getDataZoomEnd(14, 14, 6, 6);
            barChartsOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: props.option.legend.data,
                    top: "2%",
                    left: "20px",
                    itemWidth: 8 // 图例标记的图形宽度
                },
                xAxis: [
                    {
                        type: 'category',
                        splitLine: { show: false },
                        data: props.option.xAxis.data,
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: {
                            interval: 0,
                            color: '#999',// 坐标值得具体的颜色
                            fontSize: 12,
                            formatter: function (name: any) {
                                if (name && name.length > 10) {
                                    return `${name.substring(0, 5)}\n${name.substring(5, 9)}...`
                                } else if (name.length > 5 && name.length <= 10) {
                                    return `${name.substring(0, 5)}\n${name.substring(5, 10)}`
                                } else {
                                    return name
                                }
                            }
                        }
                    }
                ],
                yAxis: {
                    type: 'value',
                    axisTick: { show: false },
                    splitLine: { show: true, lineStyle: { color: "#dddddd", type: "dashed" } },
                    axisLine: { show: false },
                    axisLabel: {
                        color: '#999',// 坐标值得具体的颜色
                        fontSize: 12
                    }
                },
                grid: {
                    top: "25%",
                    bottom: "15%",
                    left: "35px",
                    right: "20px"
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: false,
                        filterMode: 'filter',
                        start: 0,
                        end: _end
                    },
                    {
                        type: 'inside',
                        start: 0,
                        end: _end
                    }
                ],
                series: [
                    {
                        name: props.option.series[0].name,
                        data: props.option.series[0].data,
                        type: 'bar',
                        barGap: '12%',
                        barWidth: '14px',
                        itemStyle: {
                            borderRadius: [4, 4, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#bcb1ff' },
                                    { offset: 1, color: '#7660ff' }
                                ]
                            )
                        },
                    },
                    {
                        name: props.option.series[1].name,
                        data: props.option.series[1].data,
                        type: 'bar',
                        barGap: '12%',
                        barWidth: '14px',
                        itemStyle: {
                            borderRadius: [4, 4, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#71b4ff' },
                                    { offset: 1, color: '#298eff' }
                                ]
                            )
                        },
                    },
                    {
                        name: props.option.series[2].name,
                        data: props.option.series[2].data,
                        type: 'bar',
                        barWidth: '14px',
                        itemStyle: {
                            borderRadius: [4, 4, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#fff178' },
                                    { offset: 1, color: '#ecd619' }
                                ]
                            )
                        },
                    },
                    {
                        name: props.option.series[3].name,
                        data: props.option.series[3].data,
                        type: 'bar',
                        barWidth: '14px',
                        itemStyle: {
                            borderRadius: [4, 4, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#ffd24c' },
                                    { offset: 1, color: '#f28c14' }
                                ]
                            )
                        },
                    },
                    {
                        name: props.option.series[4].name,
                        data: props.option.series[4].data,
                        type: 'bar',
                        barWidth: '14px',
                        itemStyle: {
                            borderRadius: [4, 4, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#c1e74b' },
                                    { offset: 1, color: '#5ad15a' }
                                ]
                            )
                        },
                    },
                    {
                        name: props.option.series[5].name,
                        data: props.option.series[5].data,
                        type: 'bar',
                        barWidth: '14px',
                        itemStyle: {
                            borderRadius: [4, 4, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#ff4e65' },
                                    { offset: 1, color: '#dd3147' }
                                ]
                            )
                        },
                    }
                ],
            };
            BarIns.setOption(barChartsOption);
            // console.log(BarIns.getOption());

            break;
        case 'line':
            if (!LineIns) {
                LineIns = echarts.init(line.value);
            }
            lineChartsOption = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    itemWidth: 8, // 图例标记的图形宽度
                    left: "15px",
                    top: "2%",
                    data: props.option.legend.data
                },
                grid: {
                    left: '10px',
                    top: '20%',
                    right: '20px',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: ['0%', '0%'],
                    splitLine: { show: false },
                    data: props.option.xAxis.data,
                    interval: 4,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999',// 坐标值得具体的颜色
                        fontSize: 12,
                        fontWeight: "600"
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { show: true, lineStyle: { color: "#dddddd", type: "dashed" } },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999',// 坐标值得具体的颜色
                        fontSize: 12,
                        fontWeight: "600"
                    }
                },
                series: [
                    {
                        name: props.option.series[0].name,
                        data: props.option.series[0].data,
                        type: 'line',
                        smooth: true,
                        symbol: "circle",
                    },
                    {
                        name: props.option.series[1].name,
                        data: props.option.series[1].data,
                        type: 'line',
                        symbol: "circle",
                        smooth: true,
                    },
                    {
                        name: props.option.series[2].name,
                        data: props.option.series[2].data,
                        type: 'line',
                        symbol: "circle", // 数据的折点
                        smooth: true,
                    }
                ],
                color: ["#7862ff", "#fe7b8c", "#5ad15a"]
            };
            LineIns.setOption(lineChartsOption);
            break;
        case 'pie':
            if (!PieIns) {
                PieIns = echarts.init(pie.value)
            }
            pieChartsOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                    itemWidth: 8,
                    orient: 'vertical',
                    right: '15px',
                    data: props.option.legend.data
                },
                series: [
                    {
                        name: props.option.series[0].name,
                        type: 'pie',
                        radius: '80%',  // 饼图占画布的百分比
                        center: ['40%', '50%'],// 圆心的xy轴的比例
                        data: props.option.series[0].data,
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 3,
                            label: {
                                show: false   // 隐藏标示文字
                            },
                            labelLine: {
                                show: false   // 隐藏标示线
                            }
                        }
                    }
                ],
                color: ["#27a1ff", "#ffcc00"]
            };
            PieIns.setOption(pieChartsOption)
            break;
        case 'custom':
            if (!CustomIns) {
                CustomIns = echarts.init(custom.value)
            }
            CustomIns.setOption(props.option)
    }
}
</script>
<style lang="scss" scoped>
.custom,
.bar,
.line,
.pie {
    width: 100vw;
    height: 25rem;
    margin: auto;
    background-color: #ffffff;
}
</style>
