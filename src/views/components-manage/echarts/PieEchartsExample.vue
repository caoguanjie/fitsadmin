<template>
    <div class="pie-echarts-example">
        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法</div>
                <div class="describe">
                    基础饼图展示，传入data数据即可
                </div>
            </template>
            <base-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">图例用法</div>
                <div class="describe">
                    通过设置legend.show=true显示图例，无需传data，以及位置固定为左侧居中
                </div>
            </template>
            <show-legend-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">空隙用法</div>
                <div class="describe">
                    通过设置isHasGap=true表示项目之间都空隙，并且会有圆角
                </div>
            </template>
            <gap-example />
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="title">颜色用法</div>
                <div class="describe">
                    在传入data数据中，给每项数据设置color属性，如果不传则使用默认颜色
                </div>
            </template>
            <color-example />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import BaseExample from "./pie-examples/BaseExample.vue"
import ShowLegendExample from "./pie-examples/ShowLegendExample.vue"
import GapExample from "./pie-examples/GapExample.vue"
import ColorExample from "./pie-examples/ColorExample.vue"

</script>

<style lang="scss" scoped>
.pie-echarts-example {
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
