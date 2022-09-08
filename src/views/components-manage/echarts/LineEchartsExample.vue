<template>
    <div class="line-echarts-example">
        <div class="examples">
            <fits-card title="基础用法" desc="基础折线图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data" :is-active="true">
                <base-example />
            </fits-card>
            <fits-card title="线条用法" desc="通过设置isSmooth线条是否平滑">
                <smooth-example />
            </fits-card>
            <fits-card title="面积用法" desc="通过设置isShowArea是否显示面积">
                <area-example />
            </fits-card>
            <fits-card title="图例用法" desc="通过设置legend.show=true显示图例">
                <show-legend-example />
            </fits-card>
            <fits-card title="图例用法" desc="通过设置legend.positon来控制图例的显示位置，并且需要将legend.show设置true">
                <position-legend-example />
            </fits-card>
            <fits-card title="设置线条颜色用法" desc="通过传入legend.data，给每项设置color即可设置线条颜色，也可以传入渐变色">
                <color-example />
            </fits-card>
            <fits-card title="缩放组件用法" desc="通过设置isShowZoom来控制是否显示缩放滑块组件（注：如果内容超出容器大小，则自动显示缩放组件）">
                <show-zoom-example />
            </fits-card>
        </div>
        <div class="catalogue">
            <!-- 目录 -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseExample from "./line-examples/BaseExample.vue"
import SmoothExample from "./line-examples/SmoothExample.vue"
import AreaExample from "./line-examples/AreaExample.vue"
import ShowLegendExample from "./line-examples/ShowLegendExample.vue"
import PositionLegendExample from "./line-examples/PositionLegendExample.vue"
import ColorExample from "./line-examples/ColorExample.vue"
import ShowZoomExample from "./line-examples/ShowZoomExample.vue"

</script>

<style lang="scss" scoped>
.line-echarts-example {
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
