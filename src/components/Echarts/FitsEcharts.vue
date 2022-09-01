<template>
    <div class="fits-echarts">
        <!-- 柱状图 -->
        <div class="bar" ref="barEcharts" />
        <!-- 折线图 -->
        <!-- <div class="line" ref="lineEcharts" v-else-if="props.type === 'line'" /> -->
        <!-- 饼图 -->
        <!-- <div class="pie" ref="pieEcharts" v-else-if="props.type === 'pie'" /> -->
        <!-- 自定义配置 -->
        <!-- <div class="custom" ref="customEcharts" v-else /> -->
    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { resolve } from 'path';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { FitsEchartsProps } from './type';

// const { props } = toRefs(defineProps<{ props: FitsEchartsProps }>())
const sliderIcon = ref("")
const barEcharts = ref()
const lineEcharts = ref()
const pieEcharts = ref()
const customEcharts = ref()
const state = reactive({
    // 柱状图默认渐变颜色
    barColors: [
        { startColor: "#ab66fd", endColor: "#f89aff" },
        { startColor: "#61abff", endColor: "#4081ff" },
        { startColor: "#fcee69", endColor: "#eed820" },
        { startColor: "#ffb64f", endColor: "#ffc384" },
        { startColor: "#00d0e5", endColor: "#00e6c1" },
        { startColor: "#e03047", endColor: "#fb6277" },
    ]
})

onMounted(async () => {
    initBarEchart()
})

/**
 * 设置柱状图柱子样式（比如弧度、背景色等）
 */
function setItemStyle(index: number) {
    return {
        //柱状图图圆角
        borderRadius: [40, 40, 0, 0],
        // 设置柱子背景色
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                { offset: 0, color: state.barColors[index % 6].startColor },
                { offset: 1, color: state.barColors[index % 6].endColor },
            ]
        )
    }
}

function initBarEchart() {
    console.log(sliderIcon.value);

    const myChart = echarts.init(barEcharts.value);
    const option = {
        legend: {
            itemHeight: 8, // 设置图例图标的高
            itemWidth: 8, // 设置图例图标的宽
            icon: "circle", // 设置图例图标的类型，这里是圆形
            textStyle: {
                fontFamily: "PingFangSC-Regular", // 设置图例文字字体
                color: "rgba(0, 0, 0, 0.45)" // 设置图例文字颜色
            },
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['家具家电1', '家具家电2', '家具家电3', '家具家电4', '家具家电5']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                name: '新建状态',
                data: [120, 150, 110, 90, 40],
                itemStyle: setItemStyle(0)
            },
            {
                type: 'bar',
                name: '处理中',
                data: [120, 150, 110, 90, 40],
                itemStyle: setItemStyle(1)
            },
            {
                type: 'bar',
                name: '挂起',
                data: [120, 150, 110, 90, 40],
                itemStyle: setItemStyle(2)
            },
            {
                type: 'bar',
                name: '失败解决',
                data: [120, 150, 110, 90, 40],
                itemStyle: setItemStyle(3)
            },
            {
                type: 'bar',
                name: '成功解决',
                data: [120, 150, 110, 90, 40],
                itemStyle: setItemStyle(4)
            },
            {
                type: 'bar',
                name: '已关闭',
                data: [120, 150, 110, 90, 40],
                itemStyle: setItemStyle(5)
            },
        ],
        dataZoom: [
            {
                type: "inside", // 内置型数据区域缩放组件
                orient: "horizontal", // 布局方式是横还是竖
                zoomOnMouseWheel: false, // 表示鼠标滚轮不能触发缩放。
                moveOnMouseWheel: false, // 表示鼠标移动不能触发平移
                moveOnMouseMove: false, // 表示鼠标移动不能触发平移
                preventDefaultMouseMove: true // 是否阻止 mousemove 事件的默认行为
            },
            {
                type: 'slider', // 滑动条
                show: true, // 是否显示滑块组件
                height: 18, // 滑块高度
                filterMode: 'empty', // 数据过滤模式
                showDataShadow: false, // 是否在滑块组件中显示数据阴影
                zoomLock: false, // 是否锁定选择区域（或叫做数据窗口）的大小,如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
                fillerColor: "#dae2f4", // 选中范围的填充颜色
                borderColor: "#dae2f4", // 边框颜色
                handleIcon: "image://" + new URL('/src/assets/echarts/sliderIcon.png', import.meta.url).href, // 手柄图标
                // handleSize: "100%",
                brushSelect: false, // 是否开启刷选功能
            },
        ],
    };

    myChart && myChart.setOption(option);
}
</script>

<style lang="scss" scoped>
.fits-echarts {

    .custom,
    .bar,
    .line,
    .pie {
        width: 100%;
        height: 25rem;
        margin: auto;
        background-color: #ffffff;
    }
}
</style>
