<template>
    <div class="bar-echarts-example">
        <div class="examples">
            <fits-card title="基础用法" desc="基础柱状图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data" :is-active="true">
                <base-example />
            </fits-card>
            <fits-card title="图例用法" desc="通过设置legend.show=true显示图例">
                <show-legend-example />
            </fits-card>
            <fits-card title="图例用法" desc="通过设置legend.positon来控制图例的显示位置，并且需要将legend.show设置true">
                <position-legend-example />
            </fits-card>
            <fits-card title="缩放组件用法" desc="通过设置isShowZoom来控制是否显示缩放滑块组件（注：如果内容超出容器大小，则自动显示缩放组件）">
                <show-zoom-example />
            </fits-card>
            <fits-card title="柱条圆角用法" desc="通过设置hasBarRadius来控制柱条是否显示圆角">
                <radius-example />
            </fits-card>
            <fits-card title="设置柱条颜色用法" desc="通过传入legend.data，给每项设置color即可设置柱条颜色，也可以传入渐变色">
                <color-example />
            </fits-card>
            <fits-card title="数据堆叠用法" desc="通过设置isStack来控制是否开启堆叠模式">
                <stack-example />
            </fits-card>
        </div>
        <div class="catalogue">
            <!-- 目录 -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseExample from "./bar-examples/BaseExample.vue"
import ShowLegendExample from "./bar-examples/ShowLegendExample.vue"
import PositionLegendExample from "./bar-examples/PositionLegendExample.vue"
import ShowZoomExample from "./bar-examples/ShowZoomExample.vue"
import RadiusExample from "./bar-examples/RadiusExample.vue"
import ColorExample from "./bar-examples/ColorExample.vue"
import StackExample from "./bar-examples/StackExample.vue"

</script>

<style lang="scss" scoped>
.bar-echarts-example {
    display: flex;

    .examples {
        padding: 32px;
        flex: 1;
        background: #fff;
    }

    .catalogue {
        background: #fff;
        width: 240px;
        margin-left: 16px;
    }
}
</style>
