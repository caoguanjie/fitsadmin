---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-09-06
---

# Echarts图表

在过往的项目经验中，我们会发现全部导入echarts的图表库，打包后的文件会非常大，然而图表功能只是为了完成数据的可视化展示，因此为了减少编译后的包体积更小，开发更加灵活，我们采用按需导入echarts的方式。

## 安装

```sh
npm install echarts --save
```

## 全部导入

通过[官网例子](https://echarts.apache.org/handbook/zh/basics/import/)全部导入，只使用柱状图，编译后的体积大小是`1M`左右

```ts
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
```

![图 2](/images/20220906020109.png)  

## 按需加载

新建一个`register-echarts.ts`文件，把官网的按需加载的配置文件，把饼图、柱状图、折线图都预加载在文件里面，最后编译出来的包的体积大小也是约`1M`左右。

::: details 代码详情
```ts
// src/components/Echarts/register-echarts.ts
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口
import * as echarts from 'echarts/core';
/** 引入柱状图/折线图/饼图 图表，图表后缀都为 Chart  */
import {
    BarChart,
    LineChart,
    PieChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    PieSeriesOption,
    LineSeriesOption,
} from 'echarts/charts';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    GridComponent,
    GridComponentOption,
    DataZoomComponent,
    LegendComponent,
} from 'echarts/components';

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    LineChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    DataZoomComponent
]);

export type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | PieSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
>;


export default echarts

```

:::

打包后的体积大小如下：

![图 3](/images/20220906060913.png)  


::: tip 为什么全部导入和按需导入的包体积差不多大？
1. 因为第一个例子只使用了柱状图，通过vite打包优化后，只保留了使用过柱状图相关的api，如果调用的api和图形越多，这个js会越来越大
2. 然后按需导入的文件，是导入了柱状图、折线图、饼图的相关的组件和api等综合性的需求，也就是说如果只用以上几种图形，这个js体积不会有其他变化。
:::

## 封装echart组件

我们把echart封装成公共的组件，当页面需要的时候，都能只调用一次echart的包。

```vue
// src/components/Echarts/FitsEcharts.vue
<template>
    <div ref="echart" />
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, toRefs, watch } from 'vue';
import { FitsEchartsProps } from './type';
import useBarEcharts from "./initBar"

const props = withDefaults(defineProps<{ config: FitsEchartsProps }>(), {
    config: () => new FitsEchartsProps()
})
const { config } = toRefs(props)
// 柱状图
const { barEcharts, initBarEchart, barEchartsInstance } = useBarEcharts()

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
    barEchartsInstance.value?.resize()
}


</script>

<style lang="scss" scoped>

</style>

```

## 使用FitsEcharts组件

```vue
<template>
    <div>
        <fits-echarts :config="state.echartsOptions" />
    </div>
</template>

<script lang="ts" setup>
import FitsEcharts from "@/components/Echarts/FitsEcharts.vue"
import { FitsEchartsProps } from "@/components/Echarts/type";
import { reactive } from "vue";

const state = reactive({
    echartsOptions: new FitsEchartsProps({
        legend: {
            show: true,
            data: [
                { name: "新建状态", color: "yellow" },
                { name: "处理中", color: "purple" },
                { name: "挂起", color: "#F56C6C" },
                { name: "失败解决", color: "#67C23A" },
                { name: "成功解决", color: [{ offset: 0, color: "red" }, { offset: 1, color: "blue" }] },
                { name: "已关闭", color: [{ offset: 0, color: "#fff" }, { offset: 1, color: "#000" }] },
            ]
        },
        xAxisNames: ["网络组", "运维组", "客户组", "维修组"],
        hasBarRadius: false
    }),
})

/**
 * 获取图表数据（使用setTimeout模拟请求）
 */
function getEchartsData() {
    setTimeout(() => {
        state.echartsOptions.data = [
            [11, 132, 57, 34],
            [111, 28, 65, 72],
            [24, 57, 11, 99],
            [100, 50, 44, 89],
            [124, 55, 35, 48],
            [56, 24, 92, 38],
        ]
    }, 500);
}
getEchartsData()
</script>

<style lang="scss" scoped>
</style>

```

## 减少 echarts 体积大小
在vite.config.ts的build通过设置 manualChunks方案，将echarts单独打包并通过按需引入减少主包体积

```js
 build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts']
          // 格式标准 【文件名字】：【package-name(例如fits-admin-ui)】
        }
      },
    },
  },
  ```

  ## 参考

  在app项目中，也是vue3的项目，但是使用webpack的打包方式，导致echart的体积非常大，当时我们也做了一系列的优化方案[echarts的性能优化之路：从入门到放弃](http://192.168.32.108:8012/#/hybirdapp/ionic5/docs/echarts)，本次项目本来也参考这次方案，但是在实践过程中，发现这种导入很麻烦，性价比不高，重点是不适合vite项目，vite项目在打包这个环节已经让echart的包变得非常小了，这个时候使用按需加载的使用体现更好。