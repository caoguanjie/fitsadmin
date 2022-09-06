<template>
    <div class="fits-echarts">
        <!-- 柱状图 -->
        <div class="bar" ref="barEcharts" v-if="config.type === 'bar'" />
        <!-- 折线图 -->
        <div class="line" ref="lineEcharts" v-else-if="config.type === 'line'" />
        <!-- 饼图 -->
        <div class="pie" ref="pieEcharts" v-else-if="config.type === 'pie'" />
        <!-- 自定义配置 -->
        <div class="custom" ref="customEcharts" v-else />
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, toRefs, watch } from 'vue';
import { FitsEchartsProps } from './type';
import useBarEcharts from "./initBar"
import useLineEcharts from "./initLine"
import usePieEcharts from "./initPie"

const props = withDefaults(defineProps<{ config: FitsEchartsProps }>(), {
    config: () => new FitsEchartsProps()
})
const { config } = toRefs(props)
// 柱状图
const { barEcharts, initBarEchart, barEchartsInstance } = useBarEcharts()
// 折线图
const { lineEcharts, initLineEchart, lineEchartsInstance } = useLineEcharts()
// 饼图
const { pieEcharts, initPieEchart, pieEchartsInstance } = usePieEcharts()

onMounted(() => {
    window.addEventListener('resize', resizeEcharts);
})

onUnmounted(() => {
    window.removeEventListener('resize', resizeEcharts);
})

/**
 * 重置echarts图表尺寸
 */
function resizeEcharts() {
    switch (config.value.type) {
        case "bar":
            barEchartsInstance.value?.resize()
            break;
        case "line":
            lineEchartsInstance.value?.resize()
            break;
        case "pie":
            pieEchartsInstance.value?.resize()
            break;
    }
}

/**
 * 加载图表
 */
watch(() => config, async () => {
    await nextTick()
    switch (config.value.type) {
        case "bar":
            initBarEchart(config.value)
            break;
        case "line":
            initLineEchart(config.value)
            break;
        case "pie":
            initPieEchart(config.value)
            break;
    }
}, { deep: true })
</script>

<style lang="scss" scoped>
.fits-echarts {
    width: 100%;
    height: 100%;

    .custom,
    .bar,
    .line,
    .pie {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
}
</style>