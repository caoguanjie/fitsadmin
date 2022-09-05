<template>
    <div class="bar-echarts-example">
        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法1</div>
                <div class="describe">
                    基础柱状图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data
                </div>
            </template>
            <BaseExample />
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
                <div class="title">缩放滑块用法</div>
                <div class="describe">
                    通过设置isShowZoom来控制是否显示缩放滑块组件
                </div>
            </template>
            <show-zoom-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">柱条圆角用法</div>
                <div class="describe">
                    通过设置hasBarRadius来控制柱条是否显示圆角
                </div>
            </template>
            <radius-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">设置柱条颜色用法</div>
                <div class="describe">
                    通过传入legend.data，给每项设置color即可设置柱条颜色，也可以传入渐变色
                </div>
            </template>
            <color-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">数据堆叠用法</div>
                <div class="describe">
                    通过设置isStack来控制是否开启堆叠模式
                </div>
            </template>
            <stack-example />
        </el-card>
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
