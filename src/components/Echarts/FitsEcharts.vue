<template>
    <div class="fits-echarts" ref="fitsEcharts" />
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, toRefs, watch } from 'vue';
import { FitsEchartsProps } from './type';
import useBarEcharts from "./initBar"
import useLineEcharts from "./initLine"
import usePieEcharts from "./initPie"
import _ from 'lodash';

const props = withDefaults(defineProps<{ config: FitsEchartsProps }>(), {
    config: () => new FitsEchartsProps({})
})
const { config } = toRefs(props)

const fitsEcharts = ref<HTMLElement>()
// 柱状图
const { initBarEchart, barEchartsInstance, setBarOptions } = useBarEcharts(fitsEcharts)
// 折线图
const { initLineEchart, lineEchartsInstance, setLineOptions } = useLineEcharts(fitsEcharts)
// 饼图
const { initPieEchart, pieEchartsInstance } = usePieEcharts(fitsEcharts)

/**
 * 防抖处理
 */
const debounceFn = _.debounce(resizeEcharts, 300)

onMounted(() => {
    window.addEventListener('resize', debounceFn);
})

onUnmounted(() => {
    window.removeEventListener('resize', debounceFn);
})

/**
 * 重置echarts图表尺寸以及重新设置options（为了重新计算缩放组件最佳的体验范围）
 */
function resizeEcharts() {
    switch (config.value.type) {
        case "bar":
            barEchartsInstance.value?.resize()
            setBarOptions(config.value)
            break;
        case "line":
            lineEchartsInstance.value?.resize()
            setLineOptions(config.value)
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
    background-color: #ffffff;
}
</style>