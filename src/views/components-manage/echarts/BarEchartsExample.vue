<template>
    <div class="bar-echarts-example" ref="barEcharts">
        柱状图例子
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// import * as echarts from 'echarts';
const barEcharts = ref()

onMounted(() => {
    initBarEchart()
})

function initBarEchart() {
    // 先不解决这个报错，后面再解决，先忽略eslint（不影响运行，是通过script方式引入的echarts）
    const myChart = (echarts as any).init(barEcharts.value);
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    }
    myChart.setOption(option);
}
</script>

<style lang="scss" scoped>
.bar-echarts-example {
    height: 300px;
    background: #fff;
}
</style>
