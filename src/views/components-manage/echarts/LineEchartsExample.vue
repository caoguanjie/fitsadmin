<template>
    <div class="line-echarts-example">
        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法</div>
                <div class="describe">
                    基础折线图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data
                </div>
            </template>
            <base-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">线条用法</div>
                <div class="describe">
                    通过设置isSmooth线条是否平滑
                </div>
            </template>
            <smooth-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">面积用法</div>
                <div class="describe">
                    通过设置isShowArea是否显示面积
                </div>
            </template>
            <area-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">图例用法</div>
                <div class="describe">
                    通过设置legend.show=true显示图例
                </div>
            </template>
            <show-legend-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">图例用法</div>
                <div class="describe">
                    通过设置legend.positon来控制图例的显示位置，并且需要将legend.show设置true
                </div>
            </template>
            <position-legend-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">设置线条颜色用法</div>
                <div class="describe">
                    通过传入legend.data，给每项设置color即可设置线条颜色，也可以传入渐变色
                </div>
            </template>
            <color-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">缩放滑块用法</div>
                <div class="describe">
                    通过设置isShowZoom来控制是否显示缩放滑块组件
                </div>
            </template>
            <show-zoom-example />
        </el-card>
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
    padding: 16px;
    background: #fff;

    .box-card {
        width: 55vw;
        margin-bottom: 30px;

        .title {
            font-size: 20px;
            font-weight: 700;
            color: #606266;
        }

        .describe {
            font-size: 14px;
            color: #303133;
            margin-top: 18px;
        }

        :deep(.el-card__header) {
            height: auto !important;
        }
    }
}
</style>
